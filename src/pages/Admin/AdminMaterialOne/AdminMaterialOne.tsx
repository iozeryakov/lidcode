import { FC, useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormMaterial } from "../../../types/IForms";
import { FormMaterial } from "../../../components/FormMaterial";
import { $authHost } from "../../../api/axiosApi"
import useAxios from "../../../hooks/useAxios";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
export const AdminMaterialOne: FC = observer(() => {
  const { id } = useParams()
  const { user, modal } = useContext(Context)
  const [response, error, loading, axiosFetch] = useAxios();
  const [putResponse, putError, putLoading, putAxiosFetch] = useAxios();
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<IFormMaterial>({ mode: "onChange" });
  const [file, setFile] = useState("")

  const onSubmit: SubmitHandler<IFormMaterial> = data => {
    if ((file.length !== 0 || data.file.length !== 0) && data.link.length !== 0) {
      modal.setIsVisible("Должно быть указано или ссылка или файл!", true)
    } else {
      if (data.file.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(data.file[0])
        reader.onload = () => {
          putData(data.link, data.title, reader.result ? reader.result.toString() : "")
        }
      } else {


        putData(data.link, data.title, file.length === 0 ? "" : undefined)
      }
    }

  };

  const getData = () => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/materials/",
      requestConfig: { params: { id: id } }
    });
  }

  const putData = (link: string, name: string, file?: string) => {
    putAxiosFetch({
      axiosInstance: $authHost,
      method: "put",
      url: "api/v1/materials/",
      requestConfig: { "Items": [{ id: id, link, name, file }] }
    });
  }

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
        setFile(response.Items[0].file ? response.Items[0].file : "")
      }
    } else if (response?.status) {
      user.newToken("")
    }
    // eslint-disable-next-line 
  }, [response])

  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={loading ? "Загрузка..." : (response?.Items && response.Items[0]) ? "Материал " + (response?.Items && response.Items[0].name) : error.length ? "Ошибка" : "Материал"}>
      <FormMaterial not={!(response?.Items && response?.Items.length)} register={register} watch={watch} setValue={setValue} errors={errors} fileLink={file} loading={loading || putLoading} error={error.length !== 0} setFileLink={setFile} />
    </AdminLayout>)
});
