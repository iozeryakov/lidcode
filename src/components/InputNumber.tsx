import { FC } from "react";
import { IInputNumber } from "../types/IInputs";


export const InputNumber: FC<IInputNumber> = ({ name, register, pattern, required, min, max, title, error }: IInputNumber) => {
    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto">{name}</label>
            <input
                className="standart_text font-normal font-roboto w-28 pl-[30px] h-10 sm:h-[50px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none"
                type="number"
                {...register(title, { required, pattern, min, max })}
            />
            {error && (<label className="standart_text font-medium font-roboto text-sm text-red-600">{error.message}</label>)}
        </div>
    );
};
