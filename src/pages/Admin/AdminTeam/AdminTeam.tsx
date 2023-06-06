import { FC, useContext, useEffect, useState } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { Context } from "../../..";
import useAxios from "../../../hooks/useAxios";
import { $authHost } from "../../../api/axiosApi";
import { observer } from "mobx-react-lite";


export const AdminTeam: FC = observer(() => {
  const { user } = useContext(Context)
  const [data, errorData, loadingData, axiosFetchData] = useAxios();
  const [filter, setFilter] = useState([{ id: "1", name: "Все" }])
  const [activeFilter, setActiveFilter] = useState({ id: "1", name: "Все" })
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
    <AdminLayout name="Команды" filter={filter} activeF={activeFilter} setActiveF={setActiveFilter} >
      <ContentAll name="teams" loadingF={data || errorData ? loadingData : true} filter={activeFilter.id} />
    </AdminLayout>
  );
});
