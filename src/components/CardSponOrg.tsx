import { FC } from "react";
import { Link } from "react-router-dom";
import { IInfoSponOrg } from "../types/IInfo";

/**
 * Компонент карточки спонсора или организатора.
 *
 * @component
 * 
 * @param {IInfoSponOrg} props - Свойства компонента карточки спонсора или организатора.
 * @param {string} props.id - Идентификатор спонсора или организатора.
 * @param {string} props.name - Название спонсора или организатора.
 * @param {string} props.imageDef - Ссылка на изображение спонсора или организатора.
 * @param {string} props.imageHor - Ссылка на горизонтальная изображение соревнования.
 * @param {string} props.imageVer - Ссылка на вертикальная изображение соревнования.
 * @param {string} props.link - Ссылка на сайт спонсора или организатора.
 * @returns {JSX.Element} - Компонент карточки спонсора или организатора.
 */
export const CardSponOrg: FC<IInfoSponOrg> = ({ id, name, imageDef, imageHor, imageVer, link }: IInfoSponOrg) => {

    return (
        <div className="flex items-center gap-5">
            <img
                src={imageDef ? imageDef : "/img/1.png"}
                alt="event"
                className=" rounded-lg h-[60px] object-cover p-[5px] "
            />
            {link ?
                <Link to={link} id={id} className=" cursor-pointer font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg overflow-hidden text-ellipsis whitespace-nowrap">{name}</Link>
                :
                <div id={id} className=" font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg overflow-hidden text-ellipsis whitespace-nowrap">{name}</div>}
        </div>
    );
};
