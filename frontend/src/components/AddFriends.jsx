import { useParams } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import { useGetUsers } from "../query/GetAllUsers"
import { useAllSentRequestQuery } from "../query/useAllSentRequestQuery"

const AddFriends = ({ setViewAddUser }) => {

  const { uid } = useParams()

  const allUsers = useGetUsers()
  const sentRequests = useAllSentRequestQuery()

  const [userSearch, setUserSearch] = useState("")
  const [users, setUsers] = useState([])


  // ----------------- Functions --------------- //

  const sendRequest = (revieverId, senderId) => {
    // console.log("ids", revieverId, senderId)
    sendRequestMutation.mutate({ reqRecieverId: revieverId, reqSenderId: senderId })
  }


  const checkReqSent = (userId) => {
    return sentRequests.data?.some(
      (req) => req.user2 === userId && req.status === "pending"
    );
  };


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

  // --------------- UI BODY ----------------
  return (
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
              {_user._id !== uid && (
                checkReqSent(_user._id) ?
                  <button style={{ background: "#6B7280" }}><i className='pi pi-check' />Sent</button>
                  : !_user.friendship?.includes(uid) ?
                    <button
                      onClick={() => {
                        sendRequest(_user._id, uid)
                      }}><i className='pi pi-user-plus' /> Add</button> :
                    <button style={{ background: "#10B981" }}><i className='pi pi-comment' />Message</button>
              )
              }
            </div>)
          })
        }
      </div>


    </div>
  )
}

export default AddFriends
