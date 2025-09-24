import React, { useMemo, useRef, useState } from 'react'
import { useCurrentUserInfo } from '../query/useCurrentUserInfo'
import { useSendMessageMutation } from '../mutations/useSendMessageMutation'
import { useParams } from 'react-router-dom'

const Messages = ({ messages = [], recieverId }) => {
  const [messageContent, setMessageContent] = useState("")
  const currentUserInfo = useCurrentUserInfo()
  const sendMutation = useSendMessageMutation()
  const bottomRef = useRef(null)
  // console.log("message =--------> ", recieverId)
  // --------------- UI BODY --------------- //
  return (
    <div className='message-main-container'>
      <div className='message-container'>
        {
          messages.map((_message, idx) => {
            const currentuserId = currentUserInfo.data._id
            return (
              <div key={idx} className='message-content relative' style={currentuserId === _message.sender ? { flexDirection: "row-reverse" } : {}}>
                <div className={currentuserId === _message.sender ? "right-chat" : "left-chat"}>
                  {_message.messageContent}
                </div>

                <span
                  className="message-time"
                  style={{
                    bottom: "-16px",
                    ...(currentuserId === _message.sender ? { right: "16px" } : { left: "16px" })
                  }}
                >
                  {new Date(_message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
            )
          })
        }
        {/* <div ref={bottomRef}></div> */}
      </div>

      <div className='message-bar'>
        <textarea value={messageContent} onChange={(e) => { setMessageContent(e.target.value) }} />
        <div className='send-div' onClick={() => {
          if (messageContent.trim() !== "") {
            sendMutation.mutate({ messageContent: messageContent, recieverId: recieverId }, {
              onSuccess: () => {
                setMessageContent("")
                // bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
            })
          }
        }}>
          <i className='pi pi-send' /><span>Send</span>
        </div>
      </div>


    </div >
  )
}

export default Messages

