import { useMutation, useQueryClient } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useSendMessageMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (payload) => await network(routes.send_message, null, "POST", payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries('gell-messages')
      toast.success("message sent")
    }
  })
}




export { useSendMessageMutation }
