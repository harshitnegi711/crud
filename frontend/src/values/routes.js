const url = "http://localhost:4000"
const masterPath = "/chathub/api/v1"


const routes = {
  create_user: url + masterPath + "/user/register",
  login_user: url + masterPath + "/user/login",
  get_all_users: url + masterPath + "/user/get-all",
  logout_user: url + masterPath + "/user/logout",
  get_current_user: url + masterPath + "/user/get-current-user",
  get_chats: url + masterPath + "/chats/",
  get_messages: url + masterPath + "/message/get-all/",
  send_message: url + masterPath + "/message/send"
}


export { routes }
