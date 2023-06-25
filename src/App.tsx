import { FC, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import useAxios from "./hooks/useAxios";
import { $authHost } from "./api/axiosApi";

/**
 * Главный компонент приложения.
 */
export const App: FC = observer(() => {
  const { user } = useContext(Context)
  const [response, error, loading, axiosFetch] = useAxios();
  useEffect(() => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/user_login/",
    });
  }, [])
  useEffect(() => {
    user.setLoading(loading)
  }, [loading])
  useEffect(() => {
    if (response && response.token) {
      user.newToken(response.token)
    }
    else if (response || error) {
      user.newToken("")
    }
  }, [response, error])
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});
