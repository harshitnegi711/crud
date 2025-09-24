import { useQuery } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";


const useCurrentUserInfo = () => {
  return useQuery({
    queryKey: ["get-current-user"],
    queryFn: async () => await network(routes.get_current_user, null, "GET")
  })
}




export { useCurrentUserInfo }
