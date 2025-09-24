import React from 'react'

const Interface = () => {
  const chats = [
    {
      content: "Hey! How's your day going?",
      byme: false
    },
    {
      content: "Pretty good! Just checking out this new chat app.",
      byme: true
    },
    {
      content: "It looks amazing! The interface is so clean.",
      byme: false
    },
    {
      content: "I know right? And it's super fast too!",
      byme: true
    }
  ]
  // ----------- UI BODY ------------//
  return (
    <div className='interface-container'>
      {/* --------------- topbar ------------- */}
      <div className='interface-top-bar'>
        <div className='interface-top-buttons'>
          <div className='interface-button red'></div>
          <div className='interface-button yellow'></div>
          <div className='interface-button green'></div>
        </div>
        <div>ChatHub</div>
        <div className='blank-space'></div>
      </div>
      {/* --------------- chat area -------------- */}

      <div className='interface-chat-area'>
        {
          chats.map((_chat, idx) => {
            return (
              <div key={idx} className={_chat.byme ? "my msg" : "friend msg"}>
                <div className='chat-avatar'></div>
                <div className='chat-content'>
                  <span>
                    {_chat.content}
                  </span>
                  <span className='chat-time'>10:23 AM</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Interface
