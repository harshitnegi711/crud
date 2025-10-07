import { useParams } from "react-router-dom"
import useGetUserByIdMutation from "../mutations/useGetUserByIdMutation"
import { useEffect, useRef, useState } from "react"
import { useSendMessageMutation } from "../mutations/useSendMessageMutation"

const Messages2 = ({ messages = [], recieverId }) => {

  const bottomRef = useRef(null)
  const [messageContent, setMessageContent] = useState("")

  const { uid } = useParams()
  const getUserMutation = useGetUserByIdMutation()
  const sendMutation = useSendMessageMutation()
  const friend = getUserMutation.data

  useEffect(() => {
    if (recieverId) {
      getUserMutation.mutate(recieverId)
    }
  }, [recieverId])


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // console.log("friend ------> ", friend)
  // console.log("values ---> ", messages, recieverId, uid)

  if (!friend) return <div className="h-full w-full flex align-items-center justify-content-center" style={{ background: "black", color: "grey" }}>no data right now.
    Click on any chat start conversation.</div>

  // ------------ UI BODY ---------------- //
  return (
    <div className="message-div">
      {/* TODO : -------------- top part -------------- */}
      <div className="message-top-bar">
        <img
          src={friend?.avatar}
          alt='user'
          style={{
            height: "50px",
            width: "50px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "50%"
          }}
        />

        <span>{friend?.fullName}</span>
      </div>
      {/* TODO :------------------- messages --------------------- */}
      <div className="message-container">
        {
          messages.map((_message, idx) => {
            const currentuserId = uid
            return (
              <div key={idx} className='message-content relative' style={currentuserId === _message.sender ? { flexDirection: "row-reverse" } : {}}>
                <div className={currentuserId === _message.sender ? "right-chat" : "left-chat"}>
                  {_message.messageContent}
                </div>

                <span
                  className="message-time"
                  style={{
                    color: "grey",
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
        <div ref={bottomRef}></div>
      </div>

      {/* TODO :  ----------------------- Message bar ---------------------- */}
      <div className="message-bar">
        <input type="text" placeholder="Type a message ..." value={messageContent}
          onChange={(e) => {
            setMessageContent(e.target.value)
          }}
        />
        <button className={`send-div ${!messageContent.length && 'disable'}`}
          onClick={() => {
            if (messageContent.trim() !== "") {
              sendMutation.mutate({ messageContent: messageContent, recieverId: recieverId }, {
                onSuccess: () => {
                  setMessageContent("")
                }
              })
            }
          }}

        >
          <i className="pi pi-send" />
          <span>Send</span>
        </button>
      </div>
    </div>
  )
}

export default Messages2
