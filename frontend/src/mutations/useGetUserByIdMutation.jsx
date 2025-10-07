import { useMutation } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"

const useGetUserByIdMutation = () => {
  return useMutation({
    mutationFn: async (userId) => await network(routes.get_user_by_id, null, "POST", { userId })
  })
}

export default useGetUserByIdMutation
