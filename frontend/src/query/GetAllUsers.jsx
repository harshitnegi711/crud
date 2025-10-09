import { useQuery } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";

const useGetUsers = () => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => await network(routes.get_all_users, null, "GET"),
  });
};

export { useGetUsers };

