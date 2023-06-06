import { FC, useContext, useEffect } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormMaterial } from "../../../types/IForms";
import { FormMaterial } from "../../../components/FormMaterial";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { $authHost } from "../../../api/axiosApi"
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

export const AdminMaterialNew: FC = observer(() => {
  const { modal, user } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const [response, error, loading, axiosFetch] = useAxios();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<IFormMaterial>({ mode: "onChange" });

  const postData = (link: string, name: string, file?: string) => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "post",
      url: "api/v1/materials/",
      requestConfig: { "Items": [{ link, name, file }] }
    });
  }

  const onSubmit: SubmitHandler<IFormMaterial> = data => {
    if (data.file.length !== 0 && data.link.length !== 0) {
      modal.setIsVisible("Должно быть указано или ссылка или файл!", true)
    } else {
      if (data.file.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(data.file[0])
        reader.onload = () => {
          postData(data.link, data.title, reader.result?.toString())
        }
      } else { postData(data.link, data.title) }

    }
  };

  useEffect(() => {
    if (response?.token && !loading && error.length === 0) {
      user.newToken(response.token)
      modal.setIsVisible("Успешно сохранено", false)
      navigate("../" + location.pathname.split("/").slice(0, 3).join("/"))
    } else if (response?.status && !loading && error.length === 0) {
      user.newToken("")
    } else { error.length && modal.setIsVisible("Ошибка сохранения", true) }

    // eslint-disable-next-line 
  }, [response, loading, error])
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить материалы">
      <FormMaterial not={false} register={register} watch={watch} setValue={setValue} errors={errors} loading={loading} error={false} />
    </AdminLayout>
  );
});
