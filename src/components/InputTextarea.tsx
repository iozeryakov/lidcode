import { FC } from "react";
import { IInputText } from "../types/IInputs";
export const InputTextarea: FC<IInputText> = ({
    name,
    placeholder,
    register, required, title, pattern, maxLength, minLength, error
}: IInputText) => {
    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto">{name}</label>
            <textarea
                id={title}
                className="standart_text font-normal font-roboto pl-[30px] py-4 h-[150px] sm:min-h-[150px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none"
                placeholder={placeholder}
                {...register(title, { required, pattern, minLength, maxLength })}
            />
            {error && (<label className="error_valid">{error.message}</label>)}
        </div>
    );
};
