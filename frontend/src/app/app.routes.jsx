import { createBrowserRouter } from "react-router-dom";
import Landing from "../features/lead/pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);
