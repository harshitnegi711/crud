import { useMutation, useQueryClient } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"

const useRequestActionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => await network(routes.request_action, null, "POST", payload),
    onSuccess: () => {
      queryClient.invalidateQueries("get-recieved-requests")
    }
  })

}

export default useRequestActionMutation
