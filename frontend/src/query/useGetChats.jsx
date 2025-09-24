import { useQuery } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";


const useGetChats = () => {
  return useQuery({
    queryKey: ["gell-chats"],
    queryFn: async () => await network(routes.get_chats, null, "GET")
  })
}


export { useGetChats }
