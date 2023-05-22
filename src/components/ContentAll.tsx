import { FC, useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { IInfoContentAll } from "../types/IInfo";
import { Pages } from "./Pages";
import { Panel } from "./Panel";
export const ContentAll: FC<IInfoContentAll> = ({ data }: IInfoContentAll) => {
  const [selectAll, setSelectAll] = useState(false);
  const [contentAll, setContentAll] = useState(data);

  const select = (checked: boolean) => {
    if (checked === true) {
      setContentAll((prev) => prev.map((i) => ({ ...i, checked: true })));
      setSelectAll(checked);
    } else {
      setContentAll((prev) => prev.map((i) => ({ ...i, checked: false })));
      setSelectAll(checked);
    }
  }

  const remove = () => {
    setContentAll(prev => prev.filter(i => !i.checked))
  }


  useEffect(() => {
    if (
      contentAll.filter((i) => i.checked === true).length === contentAll.length
    ) {
      contentAll.length ?
        setSelectAll(true) : setSelectAll(false);
    } else {
      setSelectAll(false);
    }
  }, [contentAll]);
  return (
    <>
      <Panel selectAll={selectAll} select={select} remove={remove} />
      {contentAll.length ? contentAll.map((i) => (
        <div key={i.id} className="flex flex-row justify-start items-center h-[50px]  w-full border-b-[3px] border-[#F3F4F6]">
          <div className="flex flex-row border-r-[3px] border-[#F3F4F6]  h-full items-center px-[10px] sx:px-5 sm:px-[30px]  md:px-5  l:px-[30px]">
            <input
              type="checkbox"
              id={"chech_" + i.id}
              checked={i.checked}
              onChange={(e) =>
                setContentAll((prev) =>
                  prev.map((item) =>
                    item.id === i.id
                      ? { ...i, checked: e.target.checked }
                      : item
                  )
                )
              }
              className=" h-4 w-4 sx:h-5 sx:w-5"
            />
          </div>
          <Link
            to={i.id.toString()}
            className=" standart_text cursor-pointer whitespace-nowrap px-[10px] sx:px-5 sm:px-[30px] md:px-5  l:px-[30px] h-full  flex items-center w-full"
          >
            {i.name}
          </Link>
        </div>

      )) :
        <div className="flex flex-row  h-[50px]  w-full border-b-[3px] border-[#F3F4F6]">
          <div className=" standart_text  whitespace-nowrap px-[10px] sx:px-5 sm:px-[30px] md:px-5  l:px-[30px] h-full justify-center  flex items-center w-full">
            Нет данных
          </div>
        </div>}

      {contentAll.length ? <Pages /> : <></>}
    </>
  );
};
