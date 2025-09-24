import React, { useEffect, useState } from 'react'
import { useCurrentUserInfo } from '../query/useCurrentUserInfo'
import { useLogoutMutation } from '../mutations/logOutMutation'
import { useGetChats } from '../query/useGetChats'
import { useGetMessages } from '../query/GetAllMessages'
import Messages from '../components/Messages'
import { useNavigate, useParams } from 'react-router-dom'

const Chats = () => {
  const chatsData = useGetChats()
  const logoutMutation = useLogoutMutation()
  const navigate = useNavigate()
  const { uid } = useParams()
  const [userInfo, setUserInfo] = useState({})
  const [senderId, setSenderId] = useState("")
  const [recieverId, setRecieverId] = useState("")
  const currentUserInfo = useCurrentUserInfo()
  const messages = useGetMessages(senderId)

  // ------------------ States ------------------------ //

  console.log("user chats data -------L> ", chatsData.data)

  useEffect(() => {
    if (currentUserInfo.data) {
      setUserInfo(currentUserInfo.data)
    }
  }, [currentUserInfo])

  // if (currentUserInfo.isLoading) return <h1>Loading ...</h1>

  // -------------- UI BODY ---------------
  return (
    <div className='main-container overflow-y-hidden' >
      {/* TODO: : top bar having username and log out option */}
      {/* ----------------- Top Bar -----------------  */}
      <div className='nav-bar'>
        <span>Hi, {userInfo.fullName}</span>
        <div className='logo-div'>
          <i className='pi pi-comment' />
          <span>ChatHub</span>
        </div>
        <button className='btn primary' onClick={() => { navigate("/user/" + uid) }}>users</button>
        <i className=' pi pi-sign-out' onClick={() => { logoutMutation.mutate() }} /> </div>

      {/* TODO: : ------------------- container containing two parts chats and messages.--------------- */}

      <div className='flex w-full' style={{ height: "100%" }}>
        <div className='chats-div'>
          {chatsData.data?.map((_chat, idx) => {

            return (
              <div key={idx} className='chat-div' onClick={() => {
                if (_chat.sender._id === userInfo._id) {
                  setSenderId(_chat.receiver?._id)
                } else {
                  setSenderId(_chat.sender._id)
                }

              }}>
                <img src={_chat.sender.email === userInfo.email ? _chat.receiver?.avatar : _chat.sender.avatar} alt='user img' style={{ height: "50px", width: "50px", objectFit: "cover", objectPosition: "center", borderRadius: "50%" }} />
                <div className='flex flex-column w-full gap-1'>
                  <div className='flex align-items-center justify-content-between'>
                    <span style={{ fontWeight: "400" }}>{_chat.sender.email === userInfo.email ? _chat.receiver?.fullName : _chat.sender.fullName}</span>
                    <span style={{ fontWeight: "200", fontSize: "12px" }}>{new Date(_chat.lastSeen).toDateString()}</span>
                  </div>
                  <span style={{ fontWeight: "200" }}>{_chat.lastMessage}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* TODO : ----------------- Messages div -------------- */}

        <div className='messages-div'>
          <div className='message-top-bar'>
            <span>name</span>
            <span>name</span>
          </div>
          <Messages messages={messages.data} recieverId={senderId} />
        </div>

      </div>


    </div>
  )
}

export default Chats
