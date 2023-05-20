import { FC, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";

export const App: FC = observer(() => {
  const { user } = useContext(Context)
  useEffect(() => {
    user.setIsAuth(false)
    user.setUser({ login: "смотри это ты", id: 1 })
  })
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});
