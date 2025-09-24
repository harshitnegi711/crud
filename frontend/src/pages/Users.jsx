import React from 'react'
import { useGetUsers } from '../query/GetAllUsers'

const Users = () => {

  const users = useGetUsers()
  console.log("user ---> ", users.data)

  // TODO: -------------------- UI BODY -------------------
  return (
    <div>Users</div>
  )
}

export default Users
