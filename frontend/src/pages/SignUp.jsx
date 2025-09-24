import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateUserMutation } from '../mutations/createUserMutation'
import Upload from '../components/Upload'

const SignUp = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})
  const createUserMutation = useCreateUserMutation()
  const [avatarUrl, setAvatarUrl] = useState(null)

  const handleChange = (e, key) => {
    setUserInfo((_prev) => ({ ..._prev, [key]: e.target.value }))
  }

  console.log("user info -----> ", userInfo)

  // ------------------ UI BODY --------------- 
  return (
    <div className='sign-up-main-page'>
      <div className='sign-up-main-container'>
        <h1>Create an Account</h1>
        <span>Join ChatHub and start connecting.</span>
        <div className='sign-up-details-container'>
          <Upload state={userInfo.avatar}
            set={(file) => {
              setUserInfo(_prev => ({ ..._prev, avatar: file }))
              setAvatarUrl(URL.createObjectURL(file))
            }}
            enable
          >
            <div className='user-avatar' >
              {avatarUrl ? (
                <img src={avatarUrl} />
              ) : (
                <div >
                  <i className='pi pi-user' />
                </div>
              )}
            </div>
          </Upload>
          <div className='input-wrapper'>
            <span>Username</span>
            <input type='text' placeholder='harshitnegi'
              value={userInfo.username || ""}
              onChange={(e) => handleChange(e, "username")} />
            <i className='pi pi-user' />
          </div>
          <div className='input-wrapper'>
            <span>Full Name</span>
            <input type='text' placeholder='Harshit Negi'
              value={userInfo.fullName || ""}
              onChange={(e) => handleChange(e, "fullName")}
            />
            <i className='pi pi-user' />
          </div>
          <div className='input-wrapper'>
            <span>Email</span>
            <input type='text' placeholder='harshit02@gmail.com'
              value={userInfo.email || ""}
              onChange={(e) => handleChange(e, "email")}
            />
            <i className='pi pi-envelope' />
          </div>
          <div className='input-wrapper'>
            <span>Password</span>
            <input type='password' placeholder='*******'
              value={userInfo.password || ""}
              onChange={(e) => handleChange(e, "password")}
            />
            <i className='pi pi-lock' />
          </div>
          <div className='input-wrapper'>
            <span>Confirm Password</span>
            <input type='password' placeholder='*******'
              value={userInfo.confirmPassword || ""}
              onChange={(e) => handleChange(e, "confirmPassword")}
            />
            <i className='pi pi-lock' />
          </div>

          <button className='btn active'
            onClick={() => {
              createUserMutation.mutate(userInfo)
              console.log("clicked")
            }}
          > <i className='pi pi-user' /> <span>Create Account</span></button>
        </div>

        <p>Already have an account? <span onClick={() => navigate("/login")}>Sign in</span></p>
      </div>
    </div>
  )
}

export default SignUp
