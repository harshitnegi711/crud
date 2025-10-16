import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"

// ------------ context -----------
const FriendId = React.createContext()
const Socket = React.createContext()

// ---------------- custom hook ---------------
export const useFrienId = () => useContext(FriendId)
export const useSocket = () => useContext(Socket)

const Context = ({ children }) => {

  const uid = localStorage.getItem("uid")

  const [friendId, setFriendId] = useState("")
  const [socket, setSocket] = useState(null)

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

    // join the user's own room
    // newSocket.emit("join_room", uid);
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
        {children}
      </Socket.Provider>
    </FriendId.Provider>
  )
}
export default Context
