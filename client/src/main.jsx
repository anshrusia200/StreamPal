import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./config/axios";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { configureAppStore } from "./redux/store";

const store = configureAppStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider>
      <ToastContainer />
      <App />
    </ChakraProvider>
  </Provider>
  // </React.StrictMode>
);
