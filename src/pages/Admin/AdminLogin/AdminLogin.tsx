import { FC, useContext, useEffect } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { InputText } from "../../../components/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormLogin } from "../../../types/IForms";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTER, ADMIN_EVENT_ROUTER } from "../../../utils/consts";


export const AdminLogin: FC = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormLogin>({ mode: "onChange" });

  useEffect(() => {
    ((location.pathname.replaceAll("/", "") === ADMIN_ROUTER) && user.isAuth) && navigate("../" + ADMIN_EVENT_ROUTER)
  }, [user.isAuth])

  const onSubmit: SubmitHandler<IFormLogin> = data => {
    user.setIsAuth(true)
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[480px] bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] items-center sx:px-10 px-5 py-[15px] sx:py-[30px] gap-5">
        <div className=" font-bold sx:text-2xl text-xl">Авторизация</div>
        <div className=" flex flex-col w-full">
          <InputText name="Логин" title="login" register={register} error={errors.login} placeholder="Логин*" />
          <InputText type="password" title="password" register={register} error={errors.password} name="Пароль" placeholder="Пароль*" />
        </div>
        <input type="submit" className="button" value="Авторизоваться" />
      </form>
    </MainLayout>
  );
});
