import { FC } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormOrgSpon } from "../../../types/IForms";
import { FormSponOrg } from "../../../components/FormSponOrg";

export const AdminOrganizerNew: FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormOrgSpon>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormOrgSpon> = data => {
    alert(JSON.stringify(data));
  };
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить организатора">
      <FormSponOrg type="o" register={register} watch={watch} setValue={setValue} errors={errors} />
    </AdminLayout>
  );
};
