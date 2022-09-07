import { Navigate, useRoutes } from "react-router-dom";
import { useContext } from "react";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Search from "./pages/Search";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import { AuthContext } from "./context/AuthContext";

// ----------------------------------------------------------------------

export default function Router() {
  //CODIGO DE LOGIN
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "app",
          element: (
            <RequireAuth>
              <DashboardApp />
            </RequireAuth>
          ),
        },
        {
          path: "user",
          element: (
            <RequireAuth>
              <User />
            </RequireAuth>
          ),
        },
        {
          path: "newuser",
          element: (
            <RequireAuth>
              <NewUser />
            </RequireAuth>
          ),
        },
        {
          path: "edituser/:id",
          element: (
            <RequireAuth>
              <EditUser />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "search",
      element: <Search />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/search" /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
