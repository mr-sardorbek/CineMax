import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/authContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </AuthProvider>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
