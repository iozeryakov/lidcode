import { FC } from "react";
import { IInfoLoading } from "../types/IInfo";
export const Loading: FC<IInfoLoading> = ({ loading, error }: IInfoLoading) => {
    return (
        <div className="flex flex-row  h-[50px]  w-full border-b-[3px] border-[#F3F4F6]">
            <div className=" standart_text  whitespace-nowrap px-[10px] sx:px-5 sm:px-[30px] md:px-5  l:px-[30px] h-full justify-center  flex items-center w-full">
                {loading ? "Загрузка..." : error ? "Ошибка загрузки" : "Нет данных"}
            </div>
        </div>
    );
};
