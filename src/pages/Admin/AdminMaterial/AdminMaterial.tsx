import { FC, useContext, useEffect, useState } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { $authHost } from "../../../api/axiosApi";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

/**
 * Компонент, отображающий страницу со списком материалов.
 *
 * @returns {JSX.Element} - Компонент, отображающий страницу со списком материалов.
 */
export const AdminMaterial: FC = observer(() => {
  const { user } = useContext(Context)
  const [data, errorData, loadingData, axiosFetchData] = useAxios();
  const [filter, setFilter] = useState([{ id: "1", name: "Все" }])
  const [activeFilter, setActiveFilter] = useState({ id: "1", name: "Все" })
  /**
   * Получает данные с сервера
   */
  const getData = () => {
    axiosFetchData({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/events/",
      requestConfig: {
        params: { Columns: "id, name" }
      }

    });
  }
  useEffect(() => {
    if (data?.token) {
      user.newToken(data.token)
      if (data && data.Items) {
        data.Items.map(i => {
          setFilter(prev => [...prev, { id: i.id, name: i.name }])
        })
      }
    } else if (data?.status) {
      user.newToken("")
    }
  }, [data])
  useEffect(() => {
    if (user.isAuth) {
      getData();
    }
  }, [user.isAuth])


  return (
    <AdminLayout name="Материалы" filter={filter} activeF={activeFilter} setActiveF={setActiveFilter}>
      <ContentAll name="materials" loadingF={data || errorData ? loadingData : true} filter={activeFilter.id} />
    </AdminLayout>
  );
});
