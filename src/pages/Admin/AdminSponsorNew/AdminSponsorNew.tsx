import { FC } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormOrgSpon } from "../../../types/IForms";
import { FormSponOrg } from "../../../components/FormSponOrg";

export const AdminSponsorNew: FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormOrgSpon>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormOrgSpon> = data => {
    alert(JSON.stringify(data));
  };
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить спонсора">
      <FormSponOrg type="s" register={register} watch={watch} setValue={setValue} errors={errors} />
    </AdminLayout>
  );
};
