import { useQuery } from "@tanstack/react-query"
import network from "../utils/network"
import { routes } from "../values/routes"

const useRecieveRequests = () => {
  return useQuery({
    queryKey: ["get-recieved-requests"],
    queryFn: async () => await network(routes.get_revieved_request, null, "GET")
  })
}

export default useRecieveRequests
