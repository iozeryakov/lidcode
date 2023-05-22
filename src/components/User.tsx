import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "..";
export const User: FC = observer(() => {
  const { user } = useContext(Context)
  return (
    <div className="justify-between items-center flex h-10 sm:h-[50px] px-[15px] sx:px-[30px] md:px-0 border-[rgba(75,85,99,0.2)]  border-b-2 border-t-2 md:border-0 overflow-hidden">
      <div className="flex flex-row items-center md:pr-[30px] overflow-hidden">
        <div className="block w-[30px] h-[30px] md:hidden min-w-[30px]">
          <img className="w-[30px] h-[30px]" src="/img/user.svg" alt="Logout" />
        </div>

        <label className="pl-[15px] sx:pl-[30px] md:p-0 text-lg sm:text-xl font-semibold max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {user.user?.login}
        </label>
      </div>

      <div className="block w-[32px] h-[32px] min-w-[32px]" onClick={() => user.setIsAuth(false)}>
        <img
          className=" transition-all ease-in duration-300 w-[30px] h-[30px] cursor-pointer hover:w-[32px] hover:h-[32px] p-[1px] hover:p-0 "
          src="/img/logout.svg"
          alt="Logout"
        />
      </div>
    </div>
  );
});
