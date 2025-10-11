import { useParams } from "react-router-dom";
import useGetUserByIdMutation from "../mutations/useGetUserByIdMutation";
import { useEffect, useRef, useState } from "react";
import { useSendMessageMutation } from "../mutations/useSendMessageMutation";

const Messages2 = ({ messages = [], recieverId }) => {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [isUserNearBottom, setIsUserNearBottom] = useState(true);
  const [messageContent, setMessageContent] = useState("");

  const { uid } = useParams();

  const getUserMutation = useGetUserByIdMutation();
  const sendMutation = useSendMessageMutation();
  const friend = getUserMutation.data;

  // ----- Fetch friend info when receiverId changes ------
  useEffect(() => {
    if (recieverId) {
      getUserMutation.mutate(recieverId);
    }
  }, [recieverId]);

  // ------- Auto scroll to bottom when messages update ---------
  useEffect(() => {
    if (messages.length > 0 && isUserNearBottom) {
      const timer = setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, recieverId, isUserNearBottom]);

  // ------- Track if user is near bottom or scrolled up -------
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setIsUserNearBottom(nearBottom);
  };

  // ---------- If no friend selected -------------
  if (!friend)
    return (
      <div
        className="h-full w-full flex align-items-center justify-content-center"
        style={{ background: "black", color: "grey" }}
      >
        no data right now. Click on any chat to start a conversation.
      </div>
    );

  // ----------------- UI BODY -------------------
  return (
    <div className="message-div">
      {/* ---------- TOP BAR ---------- */}
      <div className="message-top-bar">
        <img
          src={friend?.avatar}
          alt="user"
          style={{
            height: "50px",
            width: "50px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "50%",
          }}
        />
        <span>{friend?.fullName}</span>
      </div>

      {/* ---------- MESSAGES ---------- */}
      <div
        ref={containerRef}
        className="message-container"
        onScroll={handleScroll}
      >
        {messages.map((_message, idx) => {
          const currentuserId = uid;
          const isSender = currentuserId === _message.sender;

          return (
            <div
              key={idx}
              className="message-content relative"
              style={isSender ? { flexDirection: "row-reverse" } : {}}
            >
              <div className={isSender ? "right-chat" : "left-chat"}>
                {_message.messageContent}
              </div>

              <span
                className="message-time"
                style={{
                  color: "grey",
                  bottom: "-16px",
                  ...(isSender ? { right: "16px" } : { left: "16px" }),
                }}
              >
                {new Date(_message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>


      {/* ---------- MESSAGE BAR ---------- */}
      <div className="message-bar">
        <input
          type="text"
          placeholder="Type a message ..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button
          className={`send-div ${!messageContent.length && "disable"}`}
          onClick={() => {
            if (messageContent.trim() !== "") {
              sendMutation.mutate(
                { messageContent: messageContent, recieverId: recieverId },
                {
                  onSuccess: () => {
                    setMessageContent("");
                    setTimeout(() => {
                      bottomRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 100);
                  },
                }
              );
            }
          }}
        >
          <i className="pi pi-send" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default Messages2;
