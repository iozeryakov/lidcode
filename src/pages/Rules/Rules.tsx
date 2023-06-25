import { FC, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { EVENT_ROUTER } from "../../utils/consts";
import axios from "../../api/axiosApi"
import useAxios from "../../hooks/useAxios";


/**
 * Компонент, отображающий страницу правил соревнований.
 */
export const Rules: FC = () => {
    const { id } = useParams()
    const [data, errorData, loadingData, axiosFetchData] = useAxios();

    /**
     * Получает данные с сервера
     */
    const getData = () => {
        axiosFetchData({
            axiosInstance: axios,
            method: "get",
            url: "api/v1/event_info_regulations/",
            requestConfig: { params: { id: id } }
        });
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line 
    }, [])



    return (
        <MainLayout>
            {data && data.EventData.length !== 0 && !loadingData ?
                <div className="flex flex-col w-full max-w-5xl bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] p-[10px] sm:py-5 sm:px-[30px]">
                    <div className="flex  justify-between w-full items-center gap-5">
                        <div className=" font-bold md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap text-base sx:text-lg sm:text-xl">{data.EventData[0].name}</div>

                        <Link id="back" to={"../" + EVENT_ROUTER + "/" + id} className="button w-min min-w-min">Назад</Link>

                    </div>
                    <div className="flex flex-col w-full  border rounded-lg border-[rgb(242,244,246)] mt-5 sm:p-5 p-[10px]">
                        <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg">Правила</div>
                        <ReactMarkdown className="mt-5 font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg " children={data.EventData[0].regulations.length ? data.EventData[0].regulations : "Правила не указаны"} />
                    </div>
                </div>
                :
                <div className="text-ellipsis whitespace-nowrap overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">{loadingData ? "Загрузка..." : errorData.length !== 0 ? "Ошибка загрузки" : "Нет данных"}</div>}

        </MainLayout>
    );
};
