import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

// ************** access token and refresh token ***************

const generateAccessandRefreshToken = async (_userId) => {
  try {
    const user = await User.findById(_userId)

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "error while generating the access and refresh token.")
  }
}

// ****************** Registering the new user *****************************

const registerUser = asyncHandler(async (req, res) => {

  const { username, fullName, email, password } = req.body

  console.log("files data  --------> ", req.files, "req.body -----------> ", req.body)
  // ----- validation -----

  if ([username, fullName, email, password].some(field => field.trim() === "")) {
    throw new ApiError(400, "All fields are required !")
  }

  // -------- checking existing user ---------

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(400, "User already exist !")
  }
  // -------------- checking for images -----------

  const avtarLocalPath = req.files?.avatar[0].path

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avatar file is required .")
  }
  // ----------- uploading images to cloudnary ------------

  const avatar = await uploadOnCloudinary(avtarLocalPath)

  if (!avatar) {
    throw new ApiError(400, "Avatar is required.")
  }

  // --------- creating user in database ------------

  const user = await User.create({
    fullName,
    username,
    email,
    password,
    avatar: avatar.url,
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw ApiError(500, "user not registered !!! ")
  }
  res.status(201).json(ApiResponse(201, createdUser, "user Successfully registered"))
})


// ****************** logIn username and password *****************************

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if ([username, password].some(field => field.trim() === "")) {
    throw new ApiError(400, "all fields are required !!")
  }

  const validUser = await User.findOne({ username })

  if (!validUser) {
    return res.status(401).json(ApiResponse(401, validUser, "user not exits !!"))
  }

  const isPasswordCorrect = await validUser.isPasswordCorrect(password)


  if (!isPasswordCorrect) {
    return res.status(401).json(ApiResponse(401, null, "incorrect password !!"))
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(validUser._id)

  // console.log("access token --------> ", accessToken, "refresh token -----------> ", refreshToken)

  const loggedInUser = await User.findById(validUser._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  }


  res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(ApiResponse(200, {
      user: loggedInUser,
      accessToken, refreshToken
    }, "user successfully logged in ."))
})


// ********************** logging out ***********************


const logout = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )

  const options = { httpOnly: true, secure: true }

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(ApiResponse(200, {}, "user logged out successfully"))
})



// ***************** refreshing the access token ********************


const refreshAccessToken = asyncHandler(async (req, res) => {

  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request !!")
  }
  const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

  const user = await User.findById(decodedRefreshToken._id)

  if (!user) {
    throw new ApiError(401, "Invalid refresh token !!")
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired !!")
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)

  const options = { httpOnly: true, secure: true }

  res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(ApiResponse(200, { accessToken, refreshToken }, "accessToken refreshed successfully ."))

})


// ******************** Changing Password ******************


const changePassword = asyncHandler(async (req, res) => {

  const { oldPassword, newPassword } = req.body

  const user = await User.findById(req.user?._id)

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Old Password !!")
  }

  user.password = newPassword

  await user.save({ validateBeforeSave: false })

  res.status(200).json(ApiResponse(200, {}, "Password Changed Successfully."))

})


// ***************** Getting current user ***************

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(ApiResponse(200, req.user, "Current user fetched successfully."))        // req.user is add by the middleware we are using for authincating.
})

// ***************** Get user by id *************** //

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.body
  console.log("getting id ----> ", userId)
  if (!userId) {
    throw new ApiError(401, "user id missing.")
  }
  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(401, "user not found.")
  }
  return res.status(200).json(ApiResponse(200, user, "User fetched successfully."))
})


// **************** Getting all users *******************

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find().select("-password ")
  return res.status(200).json(ApiResponse(200, allUsers, "All users fetched successfully"))
})


// *************** Editing the User details *****************

const editCurrentUser = asyncHandler(async (req, res) => {

  const { fullName, email } = req.body

  if (!fullName || !email) {
    throw new ApiError(401, "fullname and email are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { fullName, email }
    },
    {
      new: true
    }
  ).select("-password")

  res.status(200).json(ApiResponse(200, user, "details updated successfully."))

})


// ********************* Update Avatar image ********************


const updateAvatar = asyncHandler(async (req, res) => {

  const localAvatarPath = req.file.path

  if (!localAvatarPath) {
    throw ApiError(401, "avatr file is missing .")
  }

  const newAvatar = await uploadOnCloudinary(localAvatarPath)

  if (!newAvatar) {
    throw ApiError(400, "Error while uploading to cloudinary !!")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { avatar: newAvatar.url }
    },
    { new: true }
  ).select("-password -refreshToken")

  res.status(200).json(ApiResponse(200, user, "Avatar updated Successfully."))


})



export {
  registerUser,
  login,
  logout,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  editCurrentUser,
  updateAvatar,
  getAllUsers,
  getUserById
}
