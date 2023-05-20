import { FC } from "react";
import { Link } from "react-router-dom";
import { IInfoBurger } from "../types/IInfo";
import { Burger } from "./Burger";
export const HeaderMain: FC<IInfoBurger> = ({ active, setActive }: IInfoBurger) => {
    return (
        <header className=" flex relative shadow-xl  shadow-[rgba(75,85,99,0.2)] justify-center z-10">
            <nav className="flex justify-between items-center w-full max-w-5xl h-16  mx-[10px]">
                <Link
                    className="max-w-min max-h-min"
                    to={"../"}
                >
                    <img
                        src="/img/logo.svg"
                        alt="Admin"
                        className="max-w-[163px] max-h-[25px] sm:max-w-[255px] sm:max-h-[39px]"
                    />
                </Link>

                <Link to={"../"} className=" hidden sm:block font-semibold text-sx whitespace-nowrap  cursor-pointer" >Архив соревнований</Link>
                <div className="sm:hidden"><Burger active={active} setActive={setActive} /></div>
            </nav>
        </header>
    );
};
