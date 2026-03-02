import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; // 👈 Add this
import App from "./App.tsx";
import "./index.css"; // 👈 Keep your CSS import here

// The "!" tells TypeScript that 'root' definitely exists in your HTML
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);