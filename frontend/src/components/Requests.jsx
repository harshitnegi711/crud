import { useParams } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import { useGetUsers } from "../query/GetAllUsers"
import { useAllSentRequestQuery } from "../query/useAllSentRequestQuery"
import { useSendRequestMutation } from "../mutations/useSendRequest"
import useRecieveRequests from "../query/useRecieveRequests"
import useRequestActionMutation from "../mutations/useRequestActionMutation"

const Requests = ({ setViewRequests }) => {

  const { uid } = useParams()

  const allUsers = useGetUsers()
  const getRequests = useRecieveRequests()
  const reqActionMutation = useRequestActionMutation()

  const [requests, setRequests] = useState([])

  // console.log("requests --->", getRequests.data)

  // ----------------- Functions --------------- //

  const getUser = (userId) => {
    const user = allUsers.data.find(_user => _user._id === userId)
    return user
  }


  // console.log("hey", getUser("67daa1a802b100690ecd5d32"))

  // ------------------- Effects ---------------- //

  useEffect(() => {
    if (getRequests.data) {
      const validRequests = getRequests.data.filter(
        (_req) => _req.status === "pending"
      );
      setRequests(validRequests);
    }
  }, [getRequests.data]);

  // --------------- UI BODY ----------------
  return (
    <div className='relative'
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
        >Requests</span>
      </div>
      <i className='pi pi-times absolute cursor-pointer' style={{
        color: "grey", right: "15px", top: "15px",
        fontSize: "14px"
      }}
        onClick={() => { setViewRequests(false) }}
      />
      {/* ------------ content ------------- */}
      {/* <div className='py-3'> */}
      {/*   <SearchBar placeholder={"Search by name ..."} searchText={userSearch} setSearchText={setUserSearch} /> */}
      {/* </div> */}

      <div className='flex flex-column gap-2 mt-3'>
        {
          requests.length ?
            requests.map((_req, idx) => {

              const user = getUser(_req.user1)
              return (<div className='user-tile' key={idx}>
                <div className='flex align-items-center gap-3'>
                  <img
                    src={user?.avatar}
                    alt='user'
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "50%"
                    }}
                  />
                  <span>{user.fullName}</span>
                </div>
                <button style={{ background: "#6B7280" }}
                  onClick={() => {
                    reqActionMutation.mutate({ requestId: _req._id, action: "reject" })
                  }}
                ><i className='pi pi-times flex align-items-center' />Decline</button>
                <button style={{ background: "#8650FB" }}
                  onClick={() => {
                    reqActionMutation.mutate({ requestId: _req._id, action: "accept" })
                  }}
                >
                  <i className='pi pi-check flex align-items-center' />
                  Accept</button>
              </div>)
            }) :
            <div className="flex justify-content-center align-items-center w-full" style={{ color: "grey" }}>
              no requests.
            </div>

        }      </div>


    </div>
  )
}

export default Requests
