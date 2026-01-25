import {createBrowserRouter} from "react-router";
import {RootPage} from "../pages/RootPage.tsx";
import {LoginPage} from "../login/pages/LoginPage.tsx";


export const router = createBrowserRouter([
  {
    path: "/", Component: RootPage,
    children: [
      {
        path: "login",
        Component: LoginPage
      }
    ],
  }
]);
