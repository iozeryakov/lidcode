import { FC } from "react";
import { InputText } from "./InputText";
import { DropdownButton } from "./DropdownButton";
import { InputNumber } from "./InputNumber";
import { InputImg } from "./InputImg";
import { InputTextarea } from "./InputTextarea";
import { InputDate } from "./InputDate";
import { IInputEvent } from "../types/IInputs";
import { StatusList } from "../utils/consts";



export const FormEvent: FC<IInputEvent> = ({ register, watch, setValue, errors, active, setActive, children }: IInputEvent) => {

    return (
        <>
            <InputText register={register} title="title" required="Пожалуйста, укажите название" maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.title} name="Название" placeholder="Название соревнования*" />
            <DropdownButton name="Статус" list={StatusList} sel={StatusList.filter((i) => i.id === active).length ? StatusList.filter((i) => i.id === active)[0].name : ""} setSel={setActive} />
            <InputNumber register={register} title="maxTeam" required="Пожалуйста, укажите количество" min={{ value: 1, message: "Маленькое число" }} max={{ value: 1000, message: "Большое число" }} error={errors.maxTeam} name="Максимальное количество команд" />
            <InputNumber register={register} title="minTeam" required="Пожалуйста, укажите количество" min={{ value: 1, message: "Маленькое число" }} max={{ value: 1000, message: "Большое число" }} error={errors.minTeam} name="Минимальное количество участников в команде" />
            <InputNumber register={register} title="maxParticipant" required="Пожалуйста, укажите количество" min={{ value: 1, message: "Маленькое число" }} max={{ value: 1000, message: "Большое число" }} error={errors.maxParticipant} name="Максимальное количество участников в команде" />
            <InputImg register={register} title="imgD" watch={watch} setValue={setValue} name="Логотип по умолчанию" />
            <InputImg register={register} title="imgV" watch={watch} setValue={setValue} name="Вертикальный логотип" />
            <InputImg register={register} title="imgH" watch={watch} setValue={setValue} name="Горизонтальный логотип" />
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
