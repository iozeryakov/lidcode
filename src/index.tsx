import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import UserStore from "./store/UserStore";
import ModalStore from "./store/ModalStore";

/**
 * Контекст, используемый для предоставления хранилищ компонентам.
 *
 * @type {React.Context<ContextValue>}
 * @property {ModalStore} modal - Экземпляр хранилища модальных окон.
 * @property {UserStore} user - Экземпляр хранилища пользователей.
 */
export const Context = createContext({
  modal: new ModalStore(),
  user: new UserStore(),
});
// Создание корневого элемента для отрисовки приложения
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// Отрисовка компонента App
root.render(
  //*<React.StrictMode>
  <Context.Provider
    value={{ modal: new ModalStore(), user: new UserStore() }}>
    <App />
  </Context.Provider>
  //* </React.StrictMode>
);