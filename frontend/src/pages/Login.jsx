import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../mutations/loginMutation'

const Login = () => {
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({})
  const loginMutation = useLoginMutation()
  const handleChange = (e, key) => {
    setLoginInfo((_prev) => ({ ..._prev, [key]: e.target.value }))
  }

  // ------------------ UI BODY --------------- 
  return (
    <div className='sign-up-main-page'>
      <div className='sign-up-main-container'>
        <h1>Sign in to ChatHub</h1>
        <span>Enter your details to access your account.</span>
        <div className='sign-up-details-container'>
          <div className='input-wrapper'>
            <span>Username</span>
            <input type='text' placeholder='harshitnegi'
              value={loginInfo.username || ""}
              onChange={(e) => handleChange(e, "username")} />
            <i className='pi pi-user' />
          </div>
          <div className='input-wrapper'>
            <span>Password</span>
            <input type='password' placeholder='*******'
              value={loginInfo.password || ""}
              onChange={(e) => handleChange(e, "password")}
            />
            <i className='pi pi-lock' />
          </div>
          <button className='btn active'
            onClick={() => {
              loginMutation.mutate({ username: loginInfo.username, password: loginInfo.password })
            }}
          > <i className='pi pi-sign-in' /> <span>Sign In</span></button>
        </div>

        <p>Don't have an account? <span onClick={() => navigate("/signUp")}>Sign Up</span></p>
      </div>
    </div>
  )
}

export default Login
