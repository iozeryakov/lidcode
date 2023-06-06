import { FC, useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/Card";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axiosApi"
import { Pages } from "../../components/Pages";
import { useLocation } from "react-router-dom";

export const Main: FC = () => {
  const location = useLocation()
  const [data, errorData, loadingData, axiosFetchData] = useAxios();
  const [CountList, setCountList] = useState<number[]>([]);
  const [page, setPage] = useState(1)

  const getData = () => {
    axiosFetchData({
      axiosInstance: axios,
      method: "get",
      url: "api/v1/events_on_main_list/",
      requestConfig: { params: location.pathname.includes("basic") ? { onList: page } : { basic: "", onList: page } }
    });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line 
  }, [page])

  useEffect(() => {
    page === 1 ? getData() : setPage(1)
    // eslint-disable-next-line 
  }, [location])

  useEffect(() => {
    setCountList([])
  }, [page, data])

  useEffect(() => {


    if (data?.CountList) {
      for (let i = 1; i < (data.CountList / 10) + 1; i++) {
        setCountList(prev => [...prev, i])
      }
    }

  }, [data])


  return (
    <MainLayout>

      {data && data.Items.length !== 0 && !loadingData ?
        <>
          {data?.Items.map(i => (< Card key={i.id} id={i.id} name={i.name} maxNumberOfParticipants={i.maxNumberOfParticipants} minNumberOfParticipants={i.minNumberOfParticipants} description={i.description} statusNow={i.statusNow} imageDef={i.imageDef} imageHor={i.imageHor} imageVer={i.imageVer} />))}
          <div className="w-full max-w-5xl">
            <Pages page={page} CountList={CountList} setPage={setPage} />
          </div>
        </>
        :
        <div className="text-ellipsis whitespace-nowrap overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">{loadingData ? "Загрузка..." : errorData.length !== 0 ? "Ошибка загрузки" : "Нет данных"}</div>}
    </MainLayout>
  );
};
