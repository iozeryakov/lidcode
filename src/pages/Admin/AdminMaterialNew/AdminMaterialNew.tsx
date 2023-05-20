import { FC } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormMaterial } from "../../../types/IForms";
import { FormMaterial } from "../../../components/FormMaterial";

export const AdminMaterialNew: FC = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<IFormMaterial>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormMaterial> = data => {
    alert(JSON.stringify(data));
  };
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить материалы">
      <FormMaterial register={register} watch={watch} setValue={setValue} errors={errors} />
    </AdminLayout>
  );
};
