import { FC, useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormOrgSpon } from "../../../types/IForms";
import { FormSponOrg } from "../../../components/FormSponOrg";
import useAxios from "../../../hooks/useAxios";
import { Context } from "../../..";
import { $authHost } from "../../../api/axiosApi"
import { observer } from "mobx-react-lite";

/**
 * Компонент, отображающий страницу для изменения организатора.
 * 
 * @returns {JSX.Element} - Компонент, отображающий страницу для изменения организатора.
 */
export const AdminOrganizerOne: FC = observer(() => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [base64, setBase64] = useState({ imgD: "", imgH: "", imgV: "" })
  const [imageDef, setImageDef] = useState("");
  const [imageHor, setImageHor] = useState("");
  const [imageVer, setImageVer] = useState("");
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormOrgSpon>({ mode: "onChange" });
  const { user, modal } = useContext(Context)
  const [response, error, loading, axiosFetch] = useAxios();
  const [putResponse, putError, putLoading, putAxiosFetch] = useAxios();

  /**
   * Отправляет данные формы на сервер
   * @param name Название 
   * @param link Ссылка на оганизатора
   * @param imageDef Изображение по умолчанию
   * @param imageHor Изображение горизонтальное
   * @param imageVer Изображение вертикальное
   */
  const putData = (link: string, name: string, imageDef?: string, imageHor?: string, imageVer?: string) => {
    putAxiosFetch({
      axiosInstance: $authHost,
      method: "put",
      url: "api/v1/organizers/",
      requestConfig: { "Items": [{ id: id, link: link, name: name, imageDef: imageDef, imageHor: imageHor, imageVer: imageVer }] }
    });
  }

  /**
   * Получает данные с сервера
   */
  const getData = () => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/organizers/",
      requestConfig: { params: { id: id } }
    });
  }

  /**
   * Обработчик отправки формы 
   * @param data Данные формы 
   */
  const onSubmit: SubmitHandler<IFormOrgSpon> = data => {

    putData(data.link, data.title, base64.imgD ? base64.imgD : imageDef ? undefined : imageDef, base64.imgH ? base64.imgH : imageHor ? undefined : imageHor, base64.imgV ? base64.imgV : imageVer ? undefined : imageVer)

  };

  useEffect(() => {
    if (putResponse?.token && !putLoading && putError.length === 0) {
      user.newToken(putResponse.token)
      modal.setIsVisible("Успешно сохранено", false)
      navigate("../" + location.pathname.split("/").slice(0, 3).join("/"))
    } else if (putResponse?.status && !putLoading && putError.length === 0) {
      user.newToken("")
    } else { putError.length && modal.setIsVisible("Ошибка сохранения", true) }



    // eslint-disable-next-line 
  }, [putResponse, putLoading, putError])

  useEffect(() => {
    if (user.isAuth) getData();
    // eslint-disable-next-line 
  }, [user.isAuth])

  useEffect(() => {

    if (response?.token) {
      user.newToken(response.token)
      if (response?.Items[0]) {
        setValue("title", response.Items[0].name)
        setValue("link", response.Items[0].link)
        setImageDef(response.Items[0].imageDef ? response.Items[0].imageDef : "")
        setImageHor(response.Items[0].imageHor ? response.Items[0].imageHor : "")
        setImageVer(response.Items[0].imageVer ? response.Items[0].imageVer : "")
      }
    } else if (response?.status) {
      user.newToken("")
    }
    // eslint-disable-next-line 
  }, [response])



  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={loading ? "Загрузка..." : (response?.Items && response.Items[0]) ? "Организатор " + (response.Items && response.Items[0].name) : error.length ? "Ошибка" : "Организатор"}>
      <FormSponOrg not={!(response?.Items && response.Items.length)} setBase64={setBase64} loading={loading || putLoading} error={error.length !== 0} type="o" register={register} watch={watch} setValue={setValue} errors={errors} imageDef={imageDef} imageHor={imageHor} imageVer={imageVer} setImageDef={setImageDef} setImageHor={setImageHor} setImageVer={setImageVer} />
    </AdminLayout>
  );
});
