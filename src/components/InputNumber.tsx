import { FC } from "react";
import { IInputNumber } from "../types/IInputs";

/**
 * Компонент поля ввода для числовых значений.
 *
 * @component
 *
 * @param {IInputNumber} props - Параметры компонента.
 * @param {string} props.name - Название поля ввода.
 * @param {UseFormRegister<any>} props.register - Функция для регистрации поля ввода.
 * @param {ValidationRule<RegExp> | undefined} props.pattern - Регулярное выражение для проверки значения поля ввода.
 * @param {string | undefined} props.required - Флаг, указывающий на обязательность заполнения поля.
 * @param {ValidationRule<number> | undefined} props.min - Минимальное допустимое значение поля.
 * @param {ValidationRule<number> | undefined} props.max - Максимальное допустимое значение поля.
 * @param {string} props.title - Заголовок поля ввода.
 * @param {FieldError | undefined} props.error - Объект с информацией об ошибке валидации поля ввода.
 * @returns {JSX.Element} - Компонент поля ввода для числовых значений.
 */
export const InputNumber: FC<IInputNumber> = ({ name, register, pattern, required, min, max, title, error }: IInputNumber) => {
    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto">{name}</label>
            <input
                id={title}
                className="standart_text font-normal font-roboto w-28 pl-[30px] h-10 sm:h-[50px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none"
                type="number"
                {...register(title, { required, pattern, min, max })}
            />
            {error && (<label className="error_valid">{error.message}</label>)}
        </div>
    );
};
