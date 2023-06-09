import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { publicRoutes } from "../routes";
import { Error } from "../pages/Error/Error";

/**
 * Компонент маршрутизации приложения.
 *
 * @component
 * 
 * @returns {JSX.Element} - Компонент маршрутизации приложения.
 */
export const AppRouter: FC = observer(() => {

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path="*" element={<Error />} />
    </Routes>
  );
});