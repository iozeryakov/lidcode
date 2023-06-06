import { FC, useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormOrgSpon } from "../../../types/IForms";
import { FormSponOrg } from "../../../components/FormSponOrg";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { $authHost } from "../../../api/axiosApi"
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

export const AdminSponsorNew: FC = observer(() => {
  const { modal, user } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const [base64, setBase64] = useState({ imgD: "", imgH: "", imgV: "" })
  const [response, error, loading, axiosFetch] = useAxios();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormOrgSpon>({ mode: "onChange" });

  const postData = (link: string, name: string, imageDef?: string, imageHor?: string, imageVer?: string) => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "post",
      url: "api/v1/sponsors/",
      requestConfig: { "Items": [{ link: link, name: name, imageDef: imageDef, imageHor: imageHor, imageVer: imageVer }] }
    });
  }

  const onSubmit: SubmitHandler<IFormOrgSpon> = data => {
    if (base64.imgD || base64.imgH || base64.imgV) {
      postData(data.link, data.title, base64.imgD, base64.imgH, base64.imgV)
    } else {
      postData(data.link, data.title)
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
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить спонсора">
      <FormSponOrg not={false} loading={loading} error={false} type="s" register={register} watch={watch} setValue={setValue} errors={errors} setBase64={setBase64} />
    </AdminLayout>
  );
});
