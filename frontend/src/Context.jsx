import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"

// ------------ context -----------
const FriendId = React.createContext()
const Socket = React.createContext()
const OnlineUsers = React.createContext()

// ---------------- custom hook ---------------
export const useFrienId = () => useContext(FriendId)
export const useSocket = () => useContext(Socket)
export const useOnlineUsers = () => useContext(OnlineUsers)

const Context = ({ children }) => {

  const uid = localStorage.getItem("uid")

  const [friendId, setFriendId] = useState("")
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  // ------------- Initialize socket.io connection --------------
  useEffect(() => {
    if (!uid) return;

    // connect to backend socket server
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket"],
    });


    newSocket.on("connect", () => {
      console.log(" Socket connected:", newSocket.id);
      newSocket.emit("join_room", uid);
    });

    newSocket.on("connect_error", (err) => console.log(" Socket error:", err));

    // ----------- listining for online users ---------------- //

    newSocket.on("online_users", (_users) => {
      console.log("online users ----> ", _users)
      setOnlineUsers(_users)
    })

    // join the user's own room

    console.log("Connected to socket : ----> ", newSocket.id);

    // save socket to state
    setSocket(newSocket);

    // cleanup on unmount
    return () => {
      newSocket.disconnect();
      console.log(" X --- Disconnected from socket --- X ");
    };
  }, [uid]);


  // -------------------------------

  return (
    <FriendId.Provider value={{ friendId, setFriendId }} >
      <Socket.Provider value={{ socket }}>
        <OnlineUsers.Provider value={{ onlineUsers }}>
          {children}
        </OnlineUsers.Provider>
      </Socket.Provider>
    </FriendId.Provider>
  )
}
export default Context
