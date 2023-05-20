import { FC } from "react";
import { PanelAdd } from "../../../components/PanelAdd";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { FormParticipants } from "../../../components/FormParticipants";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormTeam } from "../../../types/IForms";


export const AdminTeamNew: FC = () => {
  const { register, handleSubmit, watch, unregister, formState: { errors } } = useForm<IFormTeam>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormTeam> = data => {
    alert(JSON.stringify(data));
  };
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить команду">
      <PanelAdd />
      <div className=" wrapper">
        <FormParticipants watch={watch} register={register} errors={errors} unregister={unregister} />
      </div>

    </AdminLayout>
  );
};
