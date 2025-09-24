import { useMutation } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"
import { useNavigate } from "react-router-dom"

const useLoginMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (payload) => await network(routes.login_user, null, "POST", payload),
    onSuccess: (data) => {
      navigate("/home/" + data?.user._id)
    }
  })
}




export { useLoginMutation }
