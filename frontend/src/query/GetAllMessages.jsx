
import { useQuery } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";

const useGetMessages = (senderId) => {
  return useQuery({
    queryKey: ["gell-messages", senderId],
    queryFn: async () => await network(routes.get_messages + senderId, null, "GET"),
    enabled: !!senderId,
  });
};

export { useGetMessages };

