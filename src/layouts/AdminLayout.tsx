import { FC, useContext, useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { IAdminLayout } from "../types/ILayout";
import useWindowDimensions from "../utils/size";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Login } from "../components/Login";


export const AdminLayout: FC<IAdminLayout> = observer(({
  children,
  name,
  filter,
  handleSubmit,
  onSubmit
}: IAdminLayout) => {
  const { user } = useContext(Context)
  const { width } = useWindowDimensions()
  const buttonRef = useRef(null)
  const [active, setActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const list = [{ id: 1, name: "Все" }, { id: 2, name: "Не все" }, { id: 3, name: "..............................." }]
  const isOpenMenu = (active && width < 850)

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target !== buttonRef.current) {
        setActiveFilter(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => { document.removeEventListener("click", handleClick) }
  }, [buttonRef])
  return (<>
    {user.isAuth ?
      <div className=" flex flex-col min-h-screen">
        <Header active={active} setActive={setActive} admin />
        <main className="bg-[#F3F4F6] grow block relative">
          {isOpenMenu && (
            <div className="absolute w-full h-full bg-[rgba(0,0,0,0.35)] z-10"></div>
          )}
          <div className="flex flex-col md:flex-row  relative">
            {isOpenMenu && <Menu />}
            <div className="hidden md:block">
              <Menu />
            </div>
            <div className=" max-w-7xl w-full  mt-[30px] sm:px-5 md:px-[60px] overflow-hidden ">
              <div className=" flex justify-between items-center ">
                <label className=" pl-[10px] sm:p-0 sm:text-xl text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                  {name}
                </label>
                {filter && <div className="block relative justify-end">
                  <button id="filter" ref={buttonRef} onClick={() => setActiveFilter(prev => !prev)} className={activeFilter ? "dropdown_button dropdown_button-topBlack block text-left standart_text font-normal w-min font-roboto pr-[25px] mt-[5px] " : "dropdown_button  dropdown_button-black block text-left standart_text font-normal w-min font-roboto pr-[25px] mt-[5px] "} >
                    Все
                  </button>
                  <ul className={activeFilter ? " border-[#D7DAE0] border-[2px] w-min rounded-lg  max-h-[150px] bg-white overflow-y-auto  absolute z-10 right-0" : "hidden"}  >
                    {list.map((i) => (
                      <li id={"fil_" + i.id} className="standart_text font-normal font-roboto py-1 px-2 transition-colors ease-in duration-200 hover:bg-[#F3F4F6] cursor-pointer bg-white rounded-md"
                        key={i.id}>
                        {i.name}
                      </li>))}
                  </ul>
                </div>}

              </div>

              <form onSubmit={(handleSubmit && onSubmit) && handleSubmit(onSubmit)} className="flex flex-col bg-white rounded-lg mt-[15px]  mb-10">
                {children}
              </form>
            </div>
          </div>
        </main>
      </div>
      : <Login />}
  </>);
});
