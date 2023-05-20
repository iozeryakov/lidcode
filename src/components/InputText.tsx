import { FC } from "react";
import { IInputText } from "../types/IInputs";
export const InputText: FC<IInputText> = ({
  name, placeholder,
  type = "text",
  register, required,
  title, error,
  pattern, minLength,
  maxLength
}: IInputText) => {
  return (
    <div className="flex flex-col  w-full pb-[5px]">
      <label className="standart_text font-normal font-roboto">{name}</label>
      <input
        className="standart_text font-normal font-roboto pl-[30px] h-10 sm:h-[50px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none"
        type={type}
        placeholder={placeholder}
        {...register(title, { required, pattern, minLength, maxLength })}
      />
      {error && (<label className="standart_text font-medium font-roboto text-sm text-red-600">{error.message}</label>)}

    </div>
  );
};
