import { useMutation } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"
import { useNavigate } from "react-router-dom"

const useLogoutMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => await network(routes.logout_user, null, "POST"),
    onSuccess: (data) => {
      localStorage.clear()
      navigate("/login")
    }
  })
}




export { useLogoutMutation }
