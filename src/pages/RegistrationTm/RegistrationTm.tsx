
import { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { FormParticipants } from "../../components/FormParticipants";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormTeam } from "../../types/IForms";

export const RegistrationTm: FC = () => {
  const { register, handleSubmit, unregister, watch, formState: { errors } } = useForm<IFormTeam>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormTeam> = data => {
    alert(JSON.stringify(data));
  };
  const { id } = useParams()

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[480px] bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] items-center sx:px-10 px-5 py-[15px] sx:py-[30px] gap-5">
        <div className=" font-bold sx:text-2xl text-xl">Регистрация</div>
        <FormParticipants watch={watch} register={register} errors={errors} unregister={unregister} />
        <input type="submit" className="button" value="Отправить заявку на участие" />
      </form>
    </MainLayout>
  );
};
