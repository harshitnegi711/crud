import { useMutation } from "@tanstack/react-query";
import network from "../utils/network";
import { routes } from "../values/routes";
import { useNavigate } from "react-router-dom";

const useCreateUserMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (payload) => {
      const formData = new FormData()
      formData.append("avatar", payload.avatar)
      formData.append("fullName", payload.fullName)
      formData.append("username", payload.username)
      formData.append("email", payload.email)
      formData.append("password", payload.password)
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }
      return await network(routes.create_user, null, "POST", formData)
    },
    onSuccess: (data) => {
      console.log("success ------------> ", data);
      navigate("/login")
    },
    onError: (err) => {
      console.log(err)
    }
  });
};

export { useCreateUserMutation };

