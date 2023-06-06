import { FC } from "react";
import { InputText } from "./InputText";
import { InputImg } from "./InputImg";
import { IInputSponOrg } from "../types/IInputs";
import { PanelAdd } from "./PanelAdd";
import { REGEXP_LINK } from "../utils/consts";
import { Loading } from "./Loading";


export const FormSponOrg: FC<IInputSponOrg> = ({ not, register, watch, errors, setValue, type, imageDef, imageHor, imageVer, setImageDef, setImageHor, setImageVer, loading, error, setBase64 }: IInputSponOrg) => {

    return (
        <>
            <PanelAdd loading={loading||not} error={error} />
            {loading || error || not ?
                <Loading loading={loading} error={error} /> :
                <div className="wrapper">
                    <InputText register={register} title="title" required="Пожалуйста, укажите название" maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.title} name="Название" placeholder={type === "s" ? "Название спонсора*" : "Название организатора*"} />
                    <InputText register={register} title="link" maxLength={{ value: 150, message: "Превышенно количество букв" }} pattern={{ value: REGEXP_LINK, message: "Вы уверены, что это ссылка?" }} error={errors.link} name="Ссылка" placeholder={type === "s" ? "Ссылка на сайт спонсора" : "Ссылка на сайт организатора"} />
                    <InputImg register={register} title="imgD" watch={watch} setValue={setValue} imgLink={imageDef} setBase64={setBase64} setImgLink={setImageDef} name="Логотип по умолчанию" />
                    <InputImg register={register} title="imgV" watch={watch} setValue={setValue} imgLink={imageVer} setBase64={setBase64} setImgLink={setImageVer} name="Вертикальный логотип" />
                    <InputImg register={register} title="imgH" watch={watch} setValue={setValue} imgLink={imageHor} setBase64={setBase64} setImgLink={setImageHor} name="Горизонтальный логотип" />
                </div>}
        </>
    );
};
