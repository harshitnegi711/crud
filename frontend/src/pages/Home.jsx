import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { useGetChats } from '../query/useGetChats'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentUserInfo } from '../query/useCurrentUserInfo'
import Dialog from '../components/Dialog'
import { useGetUsers } from '../query/GetAllUsers'
import { useSendRequestMutation } from '../mutations/useSendRequest'
import { useAllSentRequestQuery } from '../query/useAllSentRequestQuery'
import { Menu } from 'primereact/menu';
import { useLogoutMutation } from '../mutations/logOutMutation'
import AddFriends from '../components/AddFriends'

const Home = () => {

  const menuRef = useRef(null)

  const { uid } = useParams()

  const [searchText, setSearchText] = useState("")
  const [userSearch, setUserSearch] = useState("")
  const [selectedChat, setSelectedChat] = useState(0)
  const [senderId, setSenderId] = useState("")
  const [viewAddUser, setViewAddUser] = useState(false)

  const currentUserInfo = useCurrentUserInfo()
  const sendRequestMutation = useSendRequestMutation()
  const logoutMutation = useLogoutMutation()
  const chatsData = useGetChats()
  const navigate = useNavigate()

  const chats = chatsData?.data || []

  // console.log("reqs ----> ", sentRequests.data)
  // console.log(chatsData.data)
  // console.log("users -----> ", users)

  const items = [
    {
      label: 'Logout',
      icon: 'pi pi-refresh',
      command: () => {
        console.log("logged out")
        logoutMutation.mutate()
      }
    },
  ];




  // TODO: -------------- UI BODY -----------------
  return (
    <div className='main-container flex' style={{ gap: "1px", background: "grey" }}>
      {/* TODO: -------------- chats ----------------- */}

      <div className='chats-div'>
        {/* ----------- top part --------------- */}
        <div className='top-part'>
          <div className='flex align-items-center justify-content-between px-2 py-3'>
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Messages</div>
            <div className='flex gap-5 align-items-center'>
              <i className='pi pi-user-plus cursor-pointer' onClick={() => { setViewAddUser(true) }} />
              <i className='pi pi-comment cursor-pointer' />
              <i className='pi pi-cog cursor-pointer' onClick={(e) => { menuRef.current.toggle(e) }} />
              <Menu model={items} popup ref={menuRef} id="popup_menu_left" />
            </div>
          </div>
          <div className='py-2'>
            <SearchBar placeholder={"Search conversations ..."} searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        {/* --------------------- add user dialog ---------------------- */}

        <Dialog visible={viewAddUser} >
          <AddFriends setViewAddUser={setViewAddUser} />
        </Dialog>

        {/* --------------- chats ------------------- */}

        <div className='chat-container'>
          {chats.length === 0 && (
            <div className='px-3 py-2' style={{ fontSize: "14px", color: "lightgray" }}>
              No chats found
            </div>
          )}

          {chats.map((_chat, idx) => {
            const isSelected = selectedChat === idx
            const otherUser = _chat.participants.find(
              (p) => p._id !== currentUserInfo.data._id
            )
            {/* console.log("", otherUser, currentUserInfo.data) */ }

            return (
              <div
                key={_chat._id}
                className={` chat-tile ${isSelected ? `selected` : ``}`}
                onClick={() => {
                  setSenderId(otherUser?._id)
                  setSelectedChat(idx)
                }}
              >
                <img
                  src={otherUser?.avatar}
                  alt='user'
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "50%"
                  }}
                />

                <div className='flex flex-column w-full gap-1'>
                  <div className='flex align-items-center justify-content-between'>
                    <span style={{ fontWeight: "400" }}>{otherUser?.fullName}</span>
                    <span style={{ fontWeight: "200", fontSize: "12px" }}>
                      {new Date(_chat.lastSeen).toLocaleDateString()}
                    </span>
                  </div>
                  <span style={{ fontWeight: "200", fontSize: "14px", color: "#aaa" }}>
                    {_chat.lastMessage || "No messages yet"}
                  </span>
                </div>
              </div>
            )
          })}
        </div>



      </div>


      {/* TODO: -------------- Messages ----------------- */}
      <div className='message-div'>
        messages
      </div>


    </div>
  )
}

export default Home
