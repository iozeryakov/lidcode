import { FC, useState, } from "react";
import { PanelAdd } from "../../../components/PanelAdd";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormEvent } from "../../../types/IForms";
import { FormEvent } from "../../../components/FormEvent";

export const AdminEventNew: FC = () => {

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormEvent>({ mode: "onChange", defaultValues: { maxTeam: 1, minTeam: 1, maxParticipant: 1 } });
  const onSubmit: SubmitHandler<IFormEvent> = data => {
    alert(JSON.stringify(data));
  };
  const [active, setActive] = useState(1)

  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить соревнование">
      <PanelAdd />
      <div className="wrapper">
        <FormEvent register={register} watch={watch} setValue={setValue} errors={errors} active={active} setActive={setActive} />
      </div>
    </AdminLayout>);
};
