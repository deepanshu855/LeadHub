import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import LeadProvider from "./features/lead/LeadProvider";
import AuthProvider from "./features/auth/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LeadProvider>
  </StrictMode>,
);
