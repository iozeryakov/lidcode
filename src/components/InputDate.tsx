import { FC } from "react";
import { IInputDate } from "../types/IInputs";

export const InputDate: FC<IInputDate> = ({ name, register, title, required, error }: IInputDate) => {

    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto">{name}</label>
            <input
                className="standart_text font-normal w-min font-roboto px-[30px] h-10 sm:h-[50px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none"
                type="datetime-local"
                {...register(title, { required })}
            />
            {error && (<label className="error_valid">{error.message}</label>)}
        </div>
    );
};
