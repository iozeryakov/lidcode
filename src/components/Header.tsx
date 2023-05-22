import { FC } from "react";
import { Link } from "react-router-dom";
import { IInfoHeader } from "../types/IInfo";
import { Burger } from "./Burger";
import { User } from "./User";
import { ADMIN_EVENT_ROUTER } from "../utils/consts";
export const Header: FC<IInfoHeader> = ({ active, setActive, admin }: IInfoHeader) => {
  return (
    <header className=" flex relative shadow-xl  shadow-[rgba(75,85,99,0.2)] justify-center z-10">
      <nav className={admin ? "flex justify-between items-center w-full h-16 px-[15px] sx:px-[30px]" : "flex justify-between items-center w-full max-w-5xl h-16  mx-[10px]"}>
        <Link
          id="logo"
          className="max-w-min max-h-min"
          to={admin ? "../" + ADMIN_EVENT_ROUTER : "../"}
        >
          {admin ? <img
            src="/img/logoadm.svg"
            alt="Admin"
            className="max-w-[196px] max-h-[30px] sm:max-w-[255px] sm:max-h-[39px]"
          /> : <img
            src="/img/logo.svg"
            alt="Admin"
            className="max-w-[163px] max-h-[25px] sm:max-w-[255px] sm:max-h-[39px]"
          />}

        </Link>
        {admin ?
          <>
            <div className="md:hidden">
              <Burger active={active} setActive={setActive} />
            </div>

            <div className="hidden md:block">
              <User />
            </div>
          </>
          :
          <>
            <Link id="arxiv" to={"../"} className=" hidden sm:block font-semibold text-sx whitespace-nowrap  cursor-pointer" >Архив соревнований</Link>
            <div className="sm:hidden"><Burger active={active} setActive={setActive} /></div>
          </>}

      </nav>
    </header>
  );
};
