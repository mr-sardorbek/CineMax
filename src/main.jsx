import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Provider } from "react-redux";
import { store } from "./store/store";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Provider store={store}>
        <App />
        </Provider>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
