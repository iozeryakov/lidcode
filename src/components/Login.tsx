import { FC, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { IFormLogin } from "../types/IForms";
import { Context } from "..";
import { MainLayout } from "../layouts/MainLayout";
import { InputText } from "./InputText";
import { observer } from "mobx-react-lite";
import useAxios from "../hooks/useAxios";
import axios from "../api/axiosApi"
import { ADMIN_EVENT_ROUTER, ADMIN_ROUTER } from "../utils/consts";
import { Loading } from "./Loading";
import { stringMd5 } from 'react-native-quick-md5';


/** Компонент авторизации.
*
* @component

* @returns {JSX.Element} - Компонент авторизации.
*/
export const Login: FC = observer(() => {
    const { user, modal } = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IFormLogin>({ mode: "onChange" });
    const [response, error, loading, axiosFetch] = useAxios();

    const postData = (login: string, password: string) => {
        axiosFetch({
            axiosInstance: axios,
            method: "post",
            url: "api/v1/user_login/",
            requestConfig: { login, password }
        });
    }
    const onSubmit: SubmitHandler<IFormLogin> = data => {
        postData(data.login, stringMd5(data.password))
    };
    useEffect(() => {
        if (response && response.token) {
            user.newToken(response.token)
        }
        else {
            if (response && response.status === 'login is incorrect') {
                modal.setIsVisible("Такого пользователя не существует!", true)
            }
            else if (response && response.status === 'password is incorrect') {
                modal.setIsVisible("Пароль не верный!", true)
            } else if (error?.length) {
                modal.setIsVisible("Ошибка авторизации!", true)
            }
        }
    }, [response, error])
    useEffect(() => {
        ((location.pathname.replaceAll("/", "") === ADMIN_ROUTER) && user.isAuth) && navigate("../" + ADMIN_EVENT_ROUTER)
    }, [user.isAuth])


    return (
        <MainLayout>
            {loading || user.isLoading ?
                <Loading loading={loading || user.isLoading} error={false} />
                :
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[480px] bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] overflow-hidden items-center sx:px-10 px-5 py-[15px] sx:py-[30px] gap-5">
                    <div className=" font-bold sx:text-2xl text-xl overflow-hidden text-ellipsis whitespace-nowrap">Авторизация</div>
                    <div className=" flex flex-col w-full">
                        <InputText name="Логин" required="Пожалуйста, укажите логин" title="login" register={register} error={errors.login} placeholder="Логин*" />
                        <InputText type="password" required="Пожалуйста, укажите пароль" title="password" register={register} error={errors.password} name="Пароль" placeholder="Пароль*" />
                    </div>
                    <input id="go" type="submit" className="button" value="Авторизоваться" />
                </form>
            }
        </MainLayout>
    );
});
