import { FC } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormOrgSpon } from "../../../types/IForms";
import { FormSponOrg } from "../../../components/FormSponOrg";

export const AdminOrganizerOne: FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormOrgSpon>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormOrgSpon> = data => {
    alert(JSON.stringify(data));
  };
  const { id } = useParams()
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={"Организатор " + id}>
      <FormSponOrg type="o" register={register} watch={watch} setValue={setValue} errors={errors} />
    </AdminLayout>
  );
};
