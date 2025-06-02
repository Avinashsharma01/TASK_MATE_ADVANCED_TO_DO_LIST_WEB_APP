import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import reminder test utilities
// We'll use direct imports for development/testing
import "./services/reminderTest.js";
import "./services/testHelper.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
