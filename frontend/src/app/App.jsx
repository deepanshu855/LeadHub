import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import "./App.css"

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
