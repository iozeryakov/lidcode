import { FC, useState } from "react";
import { IMainLayout } from "../types/ILayout";
import useWindowDimensions from "../utils/size";
import { HeaderMain } from "../components/HeaderMain";
export const MainLayout: FC<IMainLayout> = ({
    children,

}: IMainLayout) => {
    const { width } = useWindowDimensions()
    const [active, setActive] = useState(false)

    return (
        <div className=" flex flex-col min-h-screen">
            <HeaderMain active={active} setActive={setActive} />

            <main className="bg-[rgb(243,244,246)] grow block relative">
                {(active && width < 640
                ) && <button className="w-full bg-white p-3 absolute z-30 border shadow-xl font-semibold text-sx whitespace-nowrap  cursor-pointer shadow-[rgba(75,85,99,0.2)]" onClick={() => setActive(false)}>Архив соревнований</button>}

                <div className="flex flex-col relative items-center my-[30px] gap-5 mx-[5px] sm:mx-[10px] xl:mx-0">

                    {children}
                </div>
            </main >
        </div >
    );
};
