import { useMutation, useQueryClient } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useSendRequestMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (payload) => await network(routes.send_request, null, "POST", payload),
    onSuccess: (data) => {
      toast.success("request sent")
    }
  })
}



export { useSendRequestMutation }
