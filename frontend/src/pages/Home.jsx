import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { useGetChats } from '../query/useGetChats'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentUserInfo } from '../query/useCurrentUserInfo'
import Dialog from '../components/Dialog'
import { useGetUsers } from '../query/GetAllUsers'

const Home = () => {
  const [searchText, setSearchText] = useState("")
  const [userSearch, setUserSearch] = useState("")
  const [users, setUsers] = useState([])
  const [selectedChat, setSelectedChat] = useState(0)
  const [viewAddUser, setViewAddUser] = useState(false)
  const currentUserInfo = useCurrentUserInfo()
  const allUsers = useGetUsers()
  const chatsData = useGetChats()
  const navigate = useNavigate()
  const { uid } = useParams()
  const chats = chatsData?.data || []

  // console.log(chatsData.data)
  console.log("users -----> ", users)

  // ------------------- Effects ---------------- //

  useEffect(() => {
    if (allUsers.data) {
      setUsers(allUsers.data)
    }
  }, [allUsers.data])

  useEffect(() => {
    if (userSearch === "") {
      setUsers(allUsers.data)
    } else {
      setUsers(allUsers.data.filter(_user => _user.fullName.toLocaleLowerCase().includes(userSearch.trim().toLocaleLowerCase())))
    }
  }, [userSearch])


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
              <i className='pi pi-cog cursor-pointer' />
            </div>
          </div>
          <div className='py-2'>
            <SearchBar placeholder={"Search conversations ..."} searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        {/* --------------------- add user dialog ---------------------- */}

        <Dialog visible={viewAddUser} >
          <div className='relative in-animation'
            style={{
              background: "#1111",
              border: "1px solid #262626",
              borderRadius: "12px",
              padding: "24px",
              width: "500px",
              height: "600px",
              color: "#fff",
              overflowY: "auto",
              boxShadow: "0 0 10px rgba(0,0,0,0.6)",
            }}
          >
            <div className='flex align-items-center gap-3'>
              <i className='pi pi-user-plus cursor-pointer' style={{
                color: "#7b56f2",
                fontSize: "18px",
              }} />
              <span style={{
                fontSize: "18px",
                fontWeight: "600"
              }}
              >Add New User</span>
            </div>
            <i className='pi pi-times absolute cursor-pointer' style={{
              color: "grey", right: "15px", top: "15px",
              fontSize: "14px"
            }}
              onClick={() => { setViewAddUser(false) }}
            />
            {/* ------------ content ------------- */}
            <div className='py-3'>
              <SearchBar placeholder={"Search by name ..."} searchText={userSearch} setSearchText={setUserSearch} />
            </div>

            <div className='flex flex-column gap-2'>
              {
                users && users.map((_user, idx) => {
                  return (<div className='user-tile' key={idx}>
                    <div className='flex align-items-center gap-3'>
                      <img
                        src={_user?.avatar}
                        alt='user'
                        style={{
                          height: "50px",
                          width: "50px",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "50%"
                        }}
                      />
                      <span>{_user.fullName}</span>
                    </div>
                    {
                      !_user.friendship?.includes(uid) ?
                        <button><i className='pi pi-user-plus' /> Add</button> :
                        <button style={{ background: "#10B981" }}><i className='pi pi-comment' />Message</button>
                    }
                  </div>)
                })
              }
            </div>


          </div>
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
            console.log("", otherUser, currentUserInfo.data)

            return (
              <div
                key={_chat._id}
                className={` chat-tile ${isSelected ? `selected` : ``}`}
                onClick={() => {
                  setSenderId(otherUser?._id)
                  selectedChat(idx)
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
