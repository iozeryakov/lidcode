import { FC } from "react";
import { InputText } from "./InputText";
import { InputImg } from "./InputImg";
import { IInputSponOrg } from "../types/IInputs";
import { PanelAdd } from "./PanelAdd";
import { REGEXP_LINK } from "../utils/consts";
import { Loading } from "./Loading";

/**
 * Компонент формы для ввода информации о спонсоре или организаторе.
 *
 * @component
 *
 * @param {IInputSponOrg} props - Параметры компонента.
 * @param {boolean} props.not - Флаг отсутствия информации о спонсоре или организаторе.
 * @param {UseFormRegister<IFormOrgSpon>} props.register - Функция для регистрации полей формы.
 * @param {UseFormWatch<IFormOrgSpon>} props.watch - Функция для отслеживания значений полей формы.
 * @param {FieldErrors<IFormOrgSpon>} props.errors - Объект с ошибками валидации формы.
 * @param {UseFormSetValue<IFormOrgSpon>} props.setValue - Функция для изменения значений полей формы.
 * @param {"s" | "o"} props.type - Тип формы (символ "s" для спонсора или "o" для организатора).
 * @param {string | undefined} props.imageDef - URL изображения по умолчанию.
 * @param {string | undefined} props.imageHor - URL горизонтального изображения.
 * @param {string | undefined} props.imageVer - URL вертикального изображения.
 * @param {React.Dispatch<React.SetStateAction<string>> | undefined} props.setImageDef - Функция для изменения URL изображения по умолчанию.
 * @param {React.Dispatch<React.SetStateAction<string>> | undefined} props.setImageHor - Функция для изменения URL горизонтального изображения.
 * @param {React.Dispatch<React.SetStateAction<string>> | undefined} props.setImageVer - Функция для изменения URL вертикального изображения.
 * @param {boolean} props.loading - Определяет, находится ли форма в состоянии загрузки.
 * @param {string} props.error - Сообщение об ошибке, если есть.
 * @param {React.Dispatch<React.SetStateAction<{imgD: string; imgH: string; imgV: string;}>>} props.setBase64 - Функция для установки значения base64 изображения.
 * @returns {JSX.Element} - Компонент формы для ввода информации о спонсоре или организаторе.
 */
export const FormSponOrg: FC<IInputSponOrg> = ({ not, register, watch, errors, setValue, type, imageDef, imageHor, imageVer, setImageDef, setImageHor, setImageVer, loading, error, setBase64 }: IInputSponOrg) => {

    return (
        <>
            <PanelAdd loading={loading || not} error={error} />
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
