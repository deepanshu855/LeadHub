import { createBrowserRouter } from "react-router-dom";
import Landing from "../features/lead/pages/Landing";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Protected from "../features/auth/component/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/register",
    element: <Register />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
]);
