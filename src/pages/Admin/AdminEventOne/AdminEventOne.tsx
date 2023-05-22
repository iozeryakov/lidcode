import { FC, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { PanelAdd } from "../../../components/PanelAdd";
import { useParams } from "react-router-dom";
import { InputFile } from "../../../components/InputFile";
import { DropdownItems } from "../../../components/DropdownItems";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormEvent } from "../../../types/IForms";
import { FormEvent } from "../../../components/FormEvent";

export const AdminEventOne: FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormEvent>({ mode: "onChange", defaultValues: { maxTeam: 1, minTeam: 1, maxParticipant: 1 } });
  const onSubmit: SubmitHandler<IFormEvent> = data => {
    alert(JSON.stringify(data));
  };
  const [active, setActive] = useState(1)
  const { id } = useParams()

  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={"Cоревнование " + id}>
      <PanelAdd />
      <div className="wrapper">
        <FormEvent register={register} watch={watch} setValue={setValue} errors={errors} active={active} setActive={setActive}>
          <InputFile register={register} title="file" watch={watch} setValue={setValue} name="Результаты" />
        </FormEvent>
        <DropdownItems id="setTeam" name="Выбранные команды" />
        <DropdownItems id="selMat" name="Выбранные материалы" />
        <DropdownItems id="selSpon" name="Выбранные спонсоры" />
        <DropdownItems id="selOrg" name="Выбранные организаторы" />
      </div>
    </AdminLayout>);
};
