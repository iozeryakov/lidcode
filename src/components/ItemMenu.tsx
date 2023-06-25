import { FC } from "react";
import { Link } from "react-router-dom";
import { IInfoItemMenu } from "../types/IInfo";

/**
 * Компонент для элемента меню.
 *
 * @component
 * 
 * @param {IInfoItemMenu} props - Свойства компонента.
 * @param {string} props.src - Путь к изображению.
 * @param {string} props.alt - Альтернативный текст для изображения.
 * @param {boolean} [props.active=false] - Флаг активности элемента меню.
 * @param {string} props.to - Путь для перехода при клике на элемент меню.
 * @param {string} props.id - Идентификатор элемента меню.
 * @returns {JSX.Element}  - Компонент для элемента меню.
 */
export const ItemMenu: FC<IInfoItemMenu> = ({
  src,
  alt,
  active = false,
  to, id
}: IInfoItemMenu) => {
  return (
    <li>
      <Link
        id={id}
        className={
          active
            ? "flex flex-row items-center justify-start cursor-pointer h-10 sm:h-[50px]  bg-[#F3F4F6] md:bg-white md:rounded-lg"
            : "flex flex-row items-center justify-start cursor-pointer h-10 sm:h-[50px]  hover:bg-[rgba(243,244,246,0.6)] md:hover:bg-[rgba(255,255,255,0.6)] transition-colors ease-in duration-200 md:rounded-lg"
        }
        to={to}
      >
        <div className="px-[15px] sx:px-[30px]">
          <img className="w-[30px] h-[30px]" src={src} alt={alt} />
        </div>
        <p className="text-lg font-semibold">{alt}</p>
      </Link>
    </li>
  );
};
