
import { useQuery } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";

const useGetMessages = (friendId) => {
  return useQuery({
    queryKey: ["gell-messages", friendId],
    queryFn: async () => await network(routes.get_messages + friendId, null, "GET"),
    enabled: !!friendId,
  });
};

export { useGetMessages };

