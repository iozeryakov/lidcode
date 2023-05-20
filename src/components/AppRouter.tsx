import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { publicRoutes } from "../routes";
export const AppRouter: FC = observer(() => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  );
});