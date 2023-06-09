import { FC, useState } from "react";
import { IMainLayout } from "../types/ILayout";
import useWindowDimensions from "../utils/size";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { Link, useLocation } from "react-router-dom";

/**
 * Компонент, представляющий макет основного контента приложения.
 * 
 * @component
 * 
 * @param {IMainLayout} props - Свойства компонента MainLayout.
 * @returns {JSX.Element} Элемент JSX, представляющий макет основного контента приложения.
 */
export const MainLayout: FC<IMainLayout> = ({
    children,
}: IMainLayout) => {
    const { width } = useWindowDimensions()
    const [active, setActive] = useState(false)
    const location = useLocation()
    const isBasic = location.pathname.includes("basic")


    return (
        <div className=" flex flex-col min-h-screen">
            <Header isBasic={isBasic} active={active} setActive={setActive} />
            <main className="bg-[rgb(243,244,246)] grow block relative" >
                <Modal />
                {(active && width < 640
                ) && <Link id="arxiv" to={isBasic ? "../" : "../basic"} className=" text-center w-full bg-white p-3 absolute z-30 border shadow-xl font-semibold text-sx whitespace-nowrap  cursor-pointer shadow-[rgba(75,85,99,0.2)]" onClick={() => setActive(false)} >{isBasic ? "Соревнования" : "Архив соревнований"}</Link>}

                <div className="flex flex-col relative items-center my-[30px] gap-5 mx-[5px] sm:mx-[10px] xl:mx-0">

                    {children}
                </div>
            </main >
        </div >
    );
};
