import React, { useContext, useState } from "react"

// ------------ context -----------
const FriendId = React.createContext()

// ---------------- custom hook ---------------
export const useFrienId = () => useContext(FriendId)

const Context = ({ children }) => {

  const [friendId, setFriendId] = useState("")

  return (
    <FriendId.Provider value={{ friendId, setFriendId }} >
      {children}
    </FriendId.Provider>
  )
}
export default Context
