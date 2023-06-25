import { FC, useEffect, useRef } from "react";
import { IInfoHeader } from "../types/IInfo";

/**
 * Компонент бургера для управления активным состоянием меню.
 *
 * @component
 * 
 * @param {IInfoHeader} props - Свойства компонента.
 * @param {boolean} props.active - Флаг активного состояния.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setActive - Функция для изменения активного состояния.
 * @returns {JSX.Element} - Компонент бургера для управления активным состоянием меню.
 */
export const Burger: FC<IInfoHeader> = ({ active, setActive }: IInfoHeader) => {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /**
     * Обработчик клика вне компонента бургера.
     *
     * @param {MouseEvent} e - Объект события клика.
     */
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current &&
        e.target !== buttonRef.current &&
        e.target !== buttonRef.current.children[0]) {
        setActive(false)
      }
    }

    document.addEventListener("click", handleClick)

    /**
     * Очистка слушателя событий при размонтировании компонента.
     */
    return () => { document.removeEventListener("click", handleClick) }
  }, [buttonRef])

  return (
    <div
      ref={buttonRef}
      onClick={() => {
        setActive(prev => !prev)
      }}
      className={
        active
          ? "sm:hidden burger before:translate-y-[10px] before:rotate-45 after:translate-y-[-10px] after:-rotate-45"
          : "sm:hidden burger"
      }
    >
      <span className={active ? "burgerMidl scale-0" : "burgerMidl"}></span>
    </div>
  );
};
