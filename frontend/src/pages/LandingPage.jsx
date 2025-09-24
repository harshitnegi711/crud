import React from 'react'
import Interface from '../components/Interface'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const navigate = useNavigate()

  const features = [
    {
      name: "Instant Messaging",
      description: "Send and recieve message instantly with real-time delivery and read recepts.",
      icon: "pi pi-comments"
    },
    {
      name: "Group Chats",
      description: "Create groups for team projects, family gatherings, or friend circles.",
      icon: "pi pi-users"
    },
    {
      name: "End-to-End Encryption",
      description: "Your conversations remain private with our secure encryption technology.",
      icon: "pi pi-lock"
    },
    {
      name: "Cross-Platform",
      description: "Access your chats from any device - desktop, mobile, or web browser.",
      icon: "pi pi-globe"
    }
  ]

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // --------------- UI BODY ----------------
  return (
    <div className='main-container'>
      {/* ------------- Nav Bar --------------- */}
      <div className='nav-bar'>
        <div className='logo-div'>
          <i className='pi pi-comment' />
          <span>ChatHub</span>
        </div>
        <div className='nav-to-div'>
          <span onClick={() => { scrollToSection("features") }}>Features</span>
          <span onClick={() => { scrollToSection("how-it-works") }}>How It Works</span>
          <span >Testimonials</span>
        </div>
        <div className='btns-div'>
          <button className='btn primary' onClick={() => { navigate("/login") }}>Log In</button>
          <button className='btn active' onClick={() => { navigate("/signUp") }}>Sign Up Free</button >
        </div>
      </div>
      {/* -------------- Intro ----------- */}
      <div className='intro-div'>
        <div className='info-div '>
          <h1>Connect in real-time with <span >ChatHub</span></h1>
          <p>Experience seamless communication with friends,family,and colleagues. Send messages,stay connected-all in one place.</p>
          <div className='btns-div'>
            <button className='btn active'>Get Started For Free</button>
            <button className='btn primary'>See How It Works</button>
          </div>
          <div className='icon-with-name-div-container'>
            <div className='icon-with-name-div'>
              <i className='pi pi-users' />
              <span>10K<sup>+</sup> Users</span>
            </div>
            <div className='icon-with-name-div'>
              <i className='pi pi-comment' />
              <span>1M<sup>+</sup> Messages</span>
            </div>
            <div className='icon-with-name-div'>
              <i className='pi pi-bolt' />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
        <div className='sample-div '>
          <Interface />
        </div>
      </div>

      {/* ------------------- Features ----------------- */}
      <div className='features-div' id='features'>
        <div className='title'>
          <span>Powerful Features for Seamless</span>
          <span className='mb-3'>Communication</span>
          <p>ChatHub comes packed with everything you need to stay connected with the people that </p>
          <p className='mt-1'>matter most.</p>
        </div>
        <div className='features-grid-container'>
          {features.map((_feature, idx) => {
            return (
              <div key={idx} className='feature-div'>
                <i className={_feature.icon}></i>
                <h3>{_feature.name}</h3>
                <p>{_feature.description}</p>
              </div>

            )
          })}
        </div>
      </div>

      {/* ------------------ How ChatHub Works -------------- */}

      <div className='working-div' id='how-it-works'>
        <div className='title'>
          <span>How ChatHub Works</span>
          <p className='mt-3'>Getting started is quick and easy - you'll be chatting in no time.</p>
        </div>
        <div className='workflow-div'>
          <div className='flow-wrapper'>
            <div style={{ background: "#8b5cf6" }}>
              <i className='pi pi-user-plus' />
            </div>
            <span>Create an Account</span>
            <p>Sign up in seconds with jsut your email</p>
          </div>
          <span>{"-------->"}</span>
          <div className='flow-wrapper'>
            <div style={{ background: "#0ea5e9" }}>
              <i className='pi pi-comment' />
            </div>
            <span>Create an Account</span>
            <p>Add friends and start sending messages instantly.</p>
          </div>
          <span>{"-------->"}</span>
          <div className='flow-wrapper'>
            <div style={{ background: "#6366f1" }} >
              <i className='pi pi-bolt' />
            </div>
            <span>Create an Account</span>
            <p>Enjoy seamless communication across all your devices.</p>
          </div>
        </div>
      </div>

      {/* -------------------- Signin Login ---------------- */}

      <div className='getting-started-free-div' >
        <div className='title'>
          <span>Ready to transform you communication?</span>
          <p className='mt-3'>Join thousands of users already enjoying faster, more reliable messaging with ChatHub</p>
        </div>

        <div className='getting-statred-login-btns'>
          <button className='btn primary'>Getting Started For Free</button>
          <button className='btn primary' onClick={() => { navigate('login') }}>Login to Account</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
