import { FC } from "react";
import { useLocation } from "react-router-dom";
import {
  ADMIN_EVENT_ROUTER,
  ADMIN_MATERIAL_ROUTER,
  ADMIN_ORGANIZER_ROUTER,
  ADMIN_SPONSOR_ROUTER,
  ADMIN_TEAM_ROUTER,
} from "../utils/consts";
import { ItemMenu } from "./ItemMenu";
import { User } from "./User";

export const Menu: FC = () => {
  const { pathname } = useLocation();
  return (
    <ul className="block min-w-[250px] w-full bg-white md:bg-[#F3F4F6] md:max-w-[250px] md:mt-[30px] z-10 absolute md:static">
      <div className="md:hidden">
        <User />
      </div>
      <ItemMenu
        id="event"
        src="/img/event.svg"
        alt="Соревнования"
        to={"../" + ADMIN_EVENT_ROUTER}
        active={pathname.includes("event") ? true : false}
      />
      <ItemMenu
        id="team"
        src="/img/team.svg"
        alt="Команды"
        to={"../" + ADMIN_TEAM_ROUTER}
        active={pathname.includes("team") ? true : false}
      />

      <ItemMenu
        id="material"
        src="/img/material.svg"
        alt="Материалы"
        to={"../" + ADMIN_MATERIAL_ROUTER}
        active={pathname.includes("material") ? true : false}
      />
      <ItemMenu
        id="organizators"
        src="/img/organizators.svg"
        alt="Организаторы"
        to={"../" + ADMIN_ORGANIZER_ROUTER}
        active={pathname.includes("organizer") ? true : false}
      />
      <ItemMenu
        id="sponsors"
        src="/img/sponsors.svg"
        alt="Спонсоры"
        to={"../" + ADMIN_SPONSOR_ROUTER}
        active={pathname.includes("sponsor") ? true : false}
      />
    </ul>
  );
};
