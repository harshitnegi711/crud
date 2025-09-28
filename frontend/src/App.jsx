import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css";                // core css
import "primeflex/primeflex.css";                                // PrimeFlex
import "primeicons/primeicons.css";                              // icons
import "./index.css";                                            // your custom css

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import Messages from "./components/Messages";
import Test from "./pages/Test";
import Users from "./pages/Users";
import Home from "./pages/Home";

const App = () => {

  window.document.body.className = `dark-theme`;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signUp",
      element: <SignUp />
    },
    {
      path: "/home/" + ":uid",
      element: <Home />,
    },
    {
      path: "/user/" + ":uid",
      element: <Users />,
    },
    {
      path: "/test",
      element: <Test />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
