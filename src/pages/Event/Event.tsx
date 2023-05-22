import { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { REGISTRATION_ROUTER, RULES_ROUTER } from "../../utils/consts";
import { CardSponOrg } from "../../components/CardSponOrg";

export const Event: FC = () => {
  const { id } = useParams()
  return (
    <MainLayout>
      <div className="flex flex-col py-5 px-[10px] sm:px-[30px] w-full max-w-5xl bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] gap-[10px] ">
        <div className=" font-bold md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap text-base sx:text-lg sm:text-xl">Соревнование№1</div>
        <div className="flex  max-h-[200px] h-[200px] md:max-h-[250px] md:h-[250px] lg:max-h-[300px] lg:h-[300px] w-full max-w-5xl  felx border border-[rgb(243,244,246)] rounded-lg  overflow-hidden">
          <div className="hidden sx:flex  justify-center max-w-[100px] sx:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] lg:h-[300px] w-full h-[200px] md:h-[250px]">
            <img
              src="/img/1.png"
              alt="event"
              className=" rounded-lg h-[200px] md:h-[250px] lg:h-[300px] object-cover "
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center gap-[5px] overflow-hidden">
            <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-center">Одиночное участие</div>
            <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-center">Регистрация закроется 15.04.2023 в 15:30</div>
            <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-center">(осталось 12 дней)</div>

            <Link to={"../" + REGISTRATION_ROUTER + "/" + id} className="button w-4/5">Регистрация на участие</Link>

          </div>
        </div>
        <div>
          <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Описание</div>
          <ReactMarkdown className="mx-[5px]  font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg " children="Некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, некие правила, " />
        </div>
        <div className="flex items-center gap-5">
          <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg overflow-hidden text-ellipsis whitespace-nowrap">Правила</div>

          <Link to={'../' + RULES_ROUTER + "/" + id} className="button w-min">Открыть</Link>
        </div>
        <div className="overflow-hidden">
          <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Расписание</div>
          <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg  break-words">Регистрация с 25.03.2023 - 15:30 по 15.04.2023 - 15:30.</div>
          <div className="mx-[5px] font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg break-words">Проведение соревнований с  16.04.2023 - 12:00 по 16.04.2023 - 16:30.</div>
        </div>
        <div className="overflow-hidden">
          <div className=" font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Материалы</div>
          <Link to="#" className="p-0 font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg text-[rgb(9,34,253)]">
            <div className="mx-[5px] overflow-hidden text-ellipsis whitespace-nowrap">
              Материал№1
            </div>
          </Link>

        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full ">
          <div className="w-full sm:w-1/2 flex flex-col gap-[10px] mb-[10px]">
            <div className="  font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap ">Организаторы</div>
            <CardSponOrg />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-[10px]">
            <div className="  font-semibold md:text-xl text-sm sx:text-base sm:text-lg mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">Спонсоры</div>
            <CardSponOrg />
          </div>

        </div>
      </div>
    </MainLayout>)

};
