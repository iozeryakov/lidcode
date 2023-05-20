import { FC } from "react";
import { Link } from "react-router-dom";
import { IInfoBurger } from "../types/IInfo";
import { Burger } from "./Burger";
import { User } from "./User";
import { ADMIN_EVENT_ROUTER } from "../utils/consts";
export const Header: FC<IInfoBurger> = ({ active, setActive }: IInfoBurger) => {
  return (
    <header className=" block relative shadow-xl  shadow-[rgba(75,85,99,0.2)] z-10">
      <nav className="flex justify-between items-center w-full h-16 px-[15px] sx:px-[30px]">
        <Link
          className="max-w-min max-h-min"
          to={"../" + ADMIN_EVENT_ROUTER}
        >
          <img
            src="/img/logoadm.svg"
            alt="Admin"
            className="max-w-[196px] max-h-[30px] sm:max-w-[255px] sm:max-h-[39px]"
          />
        </Link>
        <div className="md:hidden">
          <Burger active={active} setActive={setActive} />
        </div>

        <div className="hidden md:block">
          <User />
        </div>
      </nav>
    </header>
  );
};
