
import { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "../../components/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormRegistr } from "../../types/IForms";
import { REGISTRATIONTM_ROUTER } from "../../utils/consts";

export const Registration: FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormRegistr>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormRegistr> = data => {
    navigate("../" + REGISTRATIONTM_ROUTER + "/" + id)
  };
  const { id } = useParams()

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[480px] bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] items-center sx:px-10 px-5 py-[15px] sx:py-[30px] gap-[10px] overflow-hidden">
        <div className=" font-bold sx:text-2xl text-xl overflow-hidden text-ellipsis whitespace-nowrap">Регистрация</div>
        <div className=" flex flex-col w-full pb-5">
          <InputText register={register} title="fullName" error={errors.fullName} type="text" name="ФИО" placeholder="ФИО*" />
          <InputText register={register} title="email" error={errors.email} type="text" name="Email" placeholder="Email*" />
          <InputText register={register} title="phone" error={errors.phone} type="text" name="Телефон" placeholder="Телефон*" />
          <InputText register={register} title="organization" error={errors.organization} type="text" name="Организация" placeholder="Организация*" />
          <InputText register={register} title="faculty" error={errors.faculty} type="text" name="Факультет" placeholder="Факультет" />
          <InputText register={register} title="course" error={errors.course} type="text" name="Курс" placeholder="Курс" />
        </div>
        <input type="submit" className="button" value="Отправить заявку на участие" />
      </form>
    </MainLayout>
  );
};
