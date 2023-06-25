import { FC } from "react";
import { IInputText } from "../types/IInputs";

/**
 * Компонент для ввода многострочного текста.
 *
 * @component
 * 
 * @param {IInputText} props - Свойства компонента.
 * @param {string} props.name - Название поля ввода.
 * @param {string} props.placeholder - Плейсхолдер для поля ввода.
 * @param {UseFormRegister<any>} props.register - Функция регистрации поля ввода в форме.
 * @param {string | undefined} props.required - Обязательное поле ввода.
 * @param {string} props.title - Заголовок поля ввода.
 * @param {ValidationRule<RegExp> | undefined} props.pattern - Регулярное выражение для проверки значения поля ввода.
 * @param {ValidationRule<number> | undefined} props.maxLength - Максимальная длина значения поля ввода.
 * @param {ValidationRule<number> | undefined} props.minLength - Минимальная длина значения поля ввода.
 * @param {FieldError | undefined} props.error - Объект ошибки поля ввода.
 * @returns {JSX.Element} - Компонент ввода многострочного текста.
 */
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
