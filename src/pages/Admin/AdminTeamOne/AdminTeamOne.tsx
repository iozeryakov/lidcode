import { FC } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { PanelAdd } from "../../../components/PanelAdd";
import { FormParticipants } from "../../../components/FormParticipants";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormTeam } from "../../../types/IForms";

export const AdminTeamOne: FC = () => {
  const { register, handleSubmit, unregister, watch, formState: { errors } } = useForm<IFormTeam>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormTeam> = data => {
    alert(JSON.stringify(data));
  };
  const { id } = useParams()
  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={"Команда " + id}>
      <PanelAdd />
      <div className=" wrapper">
        <FormParticipants watch={watch} register={register} errors={errors} unregister={unregister} />
      </div>
    </AdminLayout>
  );
};
