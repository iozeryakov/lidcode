import { FC, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { REGISTRATIONTM_ROUTER, REGISTRATION_ROUTER, RULES_ROUTER } from "../../utils/consts";
import { CardSponOrg } from "../../components/CardSponOrg";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axiosApi"

export const Event: FC = () => {
  const { id } = useParams()
  const [data, errorData, loadingData, axiosFetchData] = useAxios();

  const getData = () => {
    axiosFetchData({
      axiosInstance: axios,
      method: "get",
      url: "api/v1/event_info_all/",
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

        <div className="flex flex-col py-5 px-[10px] sm:px-[30px] w-full max-w-5xl bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] gap-[10px] ">
          <div className=" font-bold md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap text-base sx:text-lg sm:text-xl">{data.EventData[0].name}</div>
          <div className="flex  max-h-[200px] h-[200px] md:max-h-[250px] md:h-[250px] lg:max-h-[300px] lg:h-[300px] w-full max-w-5xl  felx border border-[rgb(243,244,246)] rounded-lg  overflow-hidden">
            <div className="hidden sx:flex  justify-center max-w-[100px] sx:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] lg:h-[300px] w-full h-[200px] md:h-[250px]">
              <img
                src={"/img/1.png"}
                alt="event"
                className=" rounded-lg h-[200px] md:h-[250px] lg:h-[300px] object-cover "
              />
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-[5px] overflow-hidden">
              <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-center">  {data.EventData[0].minNumberOfParticipants === 1 && data.EventData[0].maxNumberOfParticipants === 1 ? "Одиночное участие" : "Командноеное участие"}</div>
              <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-center">{data.EventData[0].statusNow === "Ожидание регистрации" ? "Регистрация откроется " + data.EventData[0].dateRegister.split("T")[0].split('-').reverse().join("-") + " в " + data.EventData[0].dateRegister.split("T")[1] :
                data.EventData[0].statusNow === "Регистрация открыта" ? "Регистрация закроется " + data.EventData[0].dateCloseRegister.split("T")[0].split('-').reverse().join("-") + " в " + data.EventData[0].dateCloseRegister.split("T")[1] :
                  data.EventData[0].statusNow === "Регистрация закрыта" ? "Старт соревнований " + data.EventData[0].dateStart.split("T")[0].split('-').reverse().join("-") + " в " + data.EventData[0].dateStart.split("T")[1] :
                    data.EventData[0].statusNow === "Соревнование открыто" ? "Соревнование закроется " + data.EventData[0].dateEnd.split("T")[0].split('-').reverse().join("-") + " в " + data.EventData[0].dateEnd.split("T")[1] : "Соревнование завершено"}</div>
              {data.EventData[0].statusNow === "Регистрация открыта" && <Link id="reg" to={"../" + (data.EventData[0].minNumberOfParticipants === 1 && data.EventData[0].maxNumberOfParticipants === 1 ? REGISTRATION_ROUTER : REGISTRATIONTM_ROUTER) + "/" + id} className="button w-4/5">Регистрация на участие</Link>}
            </div>
          </div>
          <div>
            <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Описание</div>
            <ReactMarkdown className="mx-[5px]  font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg " children={data.EventData[0].description} />
          </div>
          <div className="flex items-center gap-5">
            <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg overflow-hidden text-ellipsis whitespace-nowrap">Правила</div>

            <Link id="open" to={'../' + RULES_ROUTER + "/" + id} className="button w-min">Открыть</Link>
          </div>
          <div className="overflow-hidden">
            <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Расписание</div>
            <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg  break-words">{"Регистрация с " + data.EventData[0].dateRegister.split("T")[0].split('-').reverse().join("-") + " - " + data.EventData[0].dateRegister.split("T")[1] + " по " + data.EventData[0].dateCloseRegister.split("T")[0].split('-').reverse().join("-") + " - " + data.EventData[0].dateCloseRegister.split("T")[1] + "."}</div>
            <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg break-words">{"Проведение соревнований с  " + data.EventData[0].dateStart.split("T")[0].split('-').reverse().join("-") + " - " + data.EventData[0].dateStart.split("T")[1] + " по " + data.EventData[0].dateEnd.split("T")[0].split('-').reverse().join("-") + " - " + data.EventData[0].dateEnd.split("T")[1] + "."}</div>
          </div>
          {data.EventData[0].results && data.EventData[0].results.length !== 0 &&
            <div className="overflow-hidden">
              <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Результаты</div>
              <Link to={data.EventData[0].results} className="ml-2 cursor-pointer text-blue-600 standart_text font-normal font-roboto">Скачать файл</Link>
            </div>
          }

          {data.MaterialData.length !== 0 &&
            <div className="overflow-hidden">
              <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Материалы</div>
              {data.MaterialData.map(i => (
                (i.link || i.file) ?
                  <Link key={i.id} id={"mat_" + i.id} to={i.file ? i.file : i.link} className="p-0 font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-[rgb(9,34,253)]">
                    <div className="mx-[5px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {i.name}
                    </div>
                  </Link> :
                  <div key={i.id} id={"mat_" + i.id} className="p-0 font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg mx-[5px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {i.name}
                  </div>
              ))}
            </div>}


          <div className="flex flex-col sm:flex-row justify-between w-full ">
            {data.OrganizerData.length !== 0 &&
              <div className="w-full sm:w-1/2 flex flex-col gap-[10px] mb-[10px]">
                <div className="  font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap ">Организаторы</div>
                {data.OrganizerData.map((i) => (
                  <CardSponOrg key={i.id} link={i.link} name={i.name} imageDef={i.imageDef} imageHor={i.imageHor} imageVer={i.imageVer} id={"org_" + i.id} />
                ))}
              </div>}
            {data.SponsorData.length !== 0 &&
              <div className="w-full sm:w-1/2 flex flex-col gap-[10px]">
                <div className="  font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Спонсоры</div>

                {data.SponsorData.map((i) => (
                  <CardSponOrg key={i.id} link={i.link} name={i.name} imageDef={i.imageDef} imageHor={i.imageHor} imageVer={i.imageVer} id={"spon_" + i.id} />
                ))}
              </div>}

          </div>
        </div>
        :
        <div className="text-ellipsis whitespace-nowrap overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">{loadingData ? "Загрузка..." : errorData.length !== 0 ? "Ошибка загрузки" : "Нет данных"}</div>}

    </MainLayout >)

};
