import { useQuery } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";

export const useAllSentRequestQuery = () => {
  return useQuery({
    queryKey: ["get-all-sent-request"],
    queryFn: async () => await network(routes.get_sent_request, null, "GET")
  });
};



