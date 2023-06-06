import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import UserStore from "./store/UserStore";
import ModalStore from "./store/ModalStore";

export const Context = createContext({
  modal: new ModalStore(),
  user: new UserStore(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //*<React.StrictMode>
  <Context.Provider
    value={{ modal: new ModalStore(), user: new UserStore() }}>
    <App />
  </Context.Provider>
  //* </React.StrictMode>
);