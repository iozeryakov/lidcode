import { FC } from "react";
import { InputText } from "./InputText";
import { DropdownButton } from "./DropdownButton";
import { InputNumber } from "./InputNumber";
import { InputImg } from "./InputImg";
import { InputTextarea } from "./InputTextarea";
import { InputDate } from "./InputDate";
import { IInputEvent } from "../types/IInputs";
import { StatusList } from "../utils/consts";


/**
 * Компонент формы для ввода данных о соревновании.
 *
 * @component
 * 
 * @param {IInputEvent} props - Свойства компонента.
 * @param {UseFormRegister<IFormEvent>} props.register - Функция для регистрации полей формы.
 * @param {UseFormWatch<IFormEvent>} props.watch - Функция для отслеживания значений полей формы.
 * @param {UseFormSetValue<IFormEvent>} props.setValue - Функция для установки значения полей формы.
 * @param {FieldErrors<IFormEvent>} props.errors - Объект с ошибками валидации формы.
 * @param {string} props.active - Активное значение статуса соревнования.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setActive - Функция для изменения активного значения статуса соревнования.
 * @param {React.ReactNode} props.children - Дочерние элементы компонента.
 * @param {React.Dispatch<React.SetStateAction<{imgD: string; imgH: string; imgV: string;}>>} props.setBase64 - Функция для установки значения base64 изображения.
 * @param {string | undefined} props.imageDef - URL изображения по умолчанию.
 * @param {string | undefined} props.imageHor - URL горизонтального изображения.
 * @param {string | undefined} props.imageVer - URL вертикального изображения.
 * @param {React.Dispatch<React.SetStateAction<string>> | undefined} props.setImageDef - Функция для изменения URL изображения по умолчанию.
 * @param {React.Dispatch<React.SetStateAction<string>> | undefined} props.setImageVer - Функция для изменения URL вертикального изображения.
 * @param {React.Dispatch<React.SetStateAction<string>> | undefined} props.setImageHor - Функция для изменения URL горизонтального изображения.
 * @returns {JSX.Element} - Компонент формы для ввода данных о соревновании.
 */
export const FormEvent: FC<IInputEvent> = ({ register, watch, setValue, errors, active, setActive, children, setBase64, imageDef, imageHor, imageVer, setImageDef, setImageHor, setImageVer }: IInputEvent) => {


    return (
        <>
            <InputText register={register} title="title" required="Пожалуйста, укажите название" maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.title} name="Название" placeholder="Название соревнования*" />
            <DropdownButton id="status" name="Статус" list={StatusList} sel={StatusList.filter((i) => i.id === active).length ? StatusList.filter((i) => i.id === active)[0].name : ""} setSel={setActive} />
            <InputNumber register={register} title="maxTeam" required="Пожалуйста, укажите количество" min={{ value: 1, message: "Маленькое число" }} max={{ value: 1000, message: "Большое число" }} error={errors.maxTeam} name="Максимальное количество команд" />
            <InputNumber register={register} title="minParticipant" required="Пожалуйста, укажите количество" min={{ value: 1, message: "Маленькое число" }} max={{ value: 1000, message: "Большое число" }} error={errors.minParticipant} name="Минимальное количество участников в команде" />
            <InputNumber register={register} title="maxParticipant" required="Пожалуйста, укажите количество" min={{ value: 1, message: "Маленькое число" }} max={{ value: 1000, message: "Большое число" }} error={errors.maxParticipant} name="Максимальное количество участников в команде" />
            <InputImg setBase64={setBase64} imgLink={imageDef} setImgLink={setImageDef} register={register} title="imgD" watch={watch} setValue={setValue} name="Логотип по умолчанию" />
            <InputImg setBase64={setBase64} imgLink={imageVer} setImgLink={setImageVer} register={register} title="imgV" watch={watch} setValue={setValue} name="Вертикальный логотип" />
            <InputImg setBase64={setBase64} imgLink={imageHor} setImgLink={setImageHor} register={register} title="imgH" watch={watch} setValue={setValue} name="Горизонтальный логотип" />
            <InputTextarea register={register} title="description" maxLength={{ value: 1000, message: "Превышенно количество букв" }} error={errors.description} name="Описание" placeholder="Описание соревнования" />
            <InputTextarea register={register} title="rules" maxLength={{ value: 1000, message: "Превышенно количество букв" }} error={errors.rules} name="Правила" placeholder="Правила соревнования" />
            {children}
            <InputDate register={register} required="Пожалуйста, укажите дату и время" title="dateOpen" error={errors.dateOpen} name="Дата и время открытия регистрации" />
            <InputDate register={register} required="Пожалуйста, укажите дату и время" title="dateClose" error={errors.dateClose} name="Дата и время закрытия регистрации" />
            <InputDate register={register} required="Пожалуйста, укажите дату и время" title="dateStart" error={errors.dateStart} name="Дата и время начала соревнования" />
            <InputDate register={register} required="Пожалуйста, укажите дату и время" title="dateEnd" error={errors.dateEnd} name="Дата и время окончания соревнования" />
            <InputDate register={register} required="Пожалуйста, укажите дату и время" title="dateMaterial" error={errors.dateMaterial} name="Дата и время публикации материалов" />
        </>
    );
};
