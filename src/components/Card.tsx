import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { EVENT_ROUTER } from "../utils/consts";
import { IInfoCard } from "../types/IInfo";

/**
 * Компонент карточки соревнования.
 *
 * @component
 * 
 * @param {IInfoCard} props - Свойства компонента карточки.
 * @param {string} props.id - Идентификатор соревнования.
 * @param {string} props.name - Название соревнования.
 * @param {string} props.statusNow - Текущий статус соревнования.
 * @param {number} props.minNumberOfParticipants - Минимальное количество участников.
 * @param {number} props.maxNumberOfParticipants - Максимальное количество участников.
 * @param {string} props.description - Описание соревнования.
 * @param {string} props.imageDef - Ссылка на изображение соревнования.
 * @param {string} props.imageHor - Ссылка на горизонтальная изображение соревнования.
 * @param {string} props.imageVer - Ссылка на вертикальная изображение соревнования.
 * @returns {JSX.Element} - Компонент карточки соревнования.
 */
export const Card: FC<IInfoCard> = ({ id, name, statusNow, minNumberOfParticipants, maxNumberOfParticipants, description, imageDef, imageHor, imageVer }: IInfoCard) => {

    return (
        <div className="flex max-h-[200px] h-[200px] md:max-h-[250px] md:h-[250px] lg:max-h-[300px] lg:h-[300px] w-full max-w-5xl bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] overflow-hidden ">
            <Link to={"../" + EVENT_ROUTER + "/" + id} id={"img_" + id} className="flex justify-center max-w-[100px] sx:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] lg:h-[300px] w-full h-[200px] md:h-[250px] overflow-hidden">
                <img
                    src={imageDef ? imageDef : "/img/1.png"}
                    alt="event"
                    className=" rounded-lg h-[200px] md:h-[250px] lg:h-[300px] object-cover p-[5px] "
                />
            </Link>
            <div className=" flex flex-col w-full justify-between overflow-hidden ">
                <div className="mt-[5px] mx-[5px] sm:mt-[10px] sm:mx-[10px]  overflow-hidden">
                    <Link
                        id={"link_" + id}
                        className=" text-sm sm:text-base md:text-lg lg:text-xl font-bold    "
                        to={"../" + EVENT_ROUTER + "/" + id}
                    >
                        <div className="text-ellipsis whitespace-nowrap overflow-hidden">
                            {name}
                        </div>
                    </Link>
                    <p className=" mx-[5px] font-semibold font-roboto text-[rgba(75,85,99,0.4)] text-xs md:text-sm lg:text-base  overflow-hidden text-ellipsis whitespace-nowrap ">
                        {minNumberOfParticipants === 1 && maxNumberOfParticipants === 1 ? "Одиночное участие" : "Командное участие"}
                    </p>
                    <p className=" mx-[5px] font-semibold font-roboto text-[rgba(75,85,99,0.4)] text-xs md:text-sm  lg:text-base overflow-hidden text-ellipsis whitespace-nowrap ">
                        {statusNow}
                    </p>
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap ">
                        Описание:
                    </h2>
                    <ReactMarkdown className=" mx-[5px] font-roboto font-normal text-xs sm:text-sm lg:text-base break-words max-h-[70px] sm:max-h-[60px] md:max-h-[90px] lg:max-h-[130px] relative overflow-hidden  truncate-text"
                        children={description ? description : "**Нет описания**"} />
                </div>
                <div className="mx-[10px] sx:mx-5 mb-5 z-20 flex items-center justify-center ">
                    <Link id={"button_" + id} to={"../" + EVENT_ROUTER + "/" + id} className="button whitespace-nowrap">Посмотреть подробнее</Link>
                </div>

            </div>

        </div>
    );
};
