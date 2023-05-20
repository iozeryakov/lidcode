import { FC } from "react";
import { InputText } from "./InputText";
import { InputFile } from "./InputFile";
import { IInputMaterial } from "../types/IInputs";
import { PanelAdd } from "./PanelAdd";
import { REGEXP_LINK } from "../utils/consts";



export const FormMaterial: FC<IInputMaterial> = ({ register, watch, setValue, errors }: IInputMaterial) => {
    return (
        <>
            <PanelAdd />
            <div className="wrapper">
                <InputText register={register} title="title" maxLength={{ value: 100, message: "Превышенно количество букв" }} required="Пожалуйста, укажите название" error={errors.title} name="Название" placeholder="Название материала*" />
                <InputText register={register} title="link" maxLength={{ value: 150, message: "Превышенно количество букв" }} pattern={{ value: REGEXP_LINK, message: "Вы уверены, что это ссылка?" }} error={errors.link} name="Ссылка" placeholder="Ссылка на сайт материала" />
                <InputFile register={register} title="file" watch={watch} setValue={setValue} name="Фаил" />
            </div>
        </>
    );
};
