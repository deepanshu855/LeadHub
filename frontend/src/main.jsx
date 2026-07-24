import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import LeadProvider from "./features/lead/LeadProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <App />
    </LeadProvider>
  </StrictMode>,
);
