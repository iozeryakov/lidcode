import { FC, useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormMaterial } from "../../../types/IForms";
import { FormMaterial } from "../../../components/FormMaterial";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { $authHost } from "../../../api/axiosApi"
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { InputText } from "../../../components/InputText";
import { PanelAdd } from "../../../components/PanelAdd";
import { DropdownButton } from "../../../components/DropdownButton";
import { Loading } from "../../../components/Loading";
import { stringMd5 } from 'react-native-quick-md5';

/**
 * Компонент, отображающий страницу для добавления нового администратора.
 *
 * @returns {JSX.Element} - Компонент, отображающий страницу для добавления нового администратора.
 */
export const AdminAdminsNew: FC = observer(() => {
    const { modal, user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const [response, error, loading, axiosFetch] = useAxios();
    const [active, setActive] = useState("0")
    const StatusList = [{ id: "0", name: "Без доступа к админ-рам", forSorted: 0 }, { id: "1", name: "Добавление новых админ-ров", forSorted: 1 }, { id: "2", name: "Всё", forSorted: 2 }]
    const { register, handleSubmit, formState: { errors } } = useForm<{ login: string, password: string }>({ mode: "onChange" });

    /**
   * Отправляет данные формы на сервер
   * @param login Логин
   * @param password Пороль
   * @param access Права доступа
   */
    const postData = (login: string, password: string, access: string) => {
        axiosFetch({
            axiosInstance: $authHost,
            method: "post",
            url: "api/v1/users/",
            requestConfig: { "Items": [{ login, password, access }] }
        });
    }

    /**
     * Обработчик отправки формы 
     * @param data Данные формы 
     */
    const onSubmit: SubmitHandler<{ login: string, password: string }> = data => {
        postData(data.login, stringMd5(data.password), active)

    };

    useEffect(() => {

        if (response?.token && !loading && error.length === 0) {
            user.newToken(response.token)
            if (!(response.status && response.status === "this login already exists")) {
                modal.setIsVisible("Успешно сохранено", false)
                navigate("../" + location.pathname.split("/").slice(0, 3).join("/"))
            } else {
                modal.setIsVisible("Логин уже используется!", true)
            }
        } else if (response?.status && !loading && error.length === 0) {
            user.newToken("")
        } else { error.length && modal.setIsVisible("Ошибка сохранения", true) }

        // eslint-disable-next-line 
    }, [response, loading, error])

    return (
        <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={user.access !== "0" ? "Добавить администратора" : "Доступ закрыт"}>
            {user.access !== "0" &&
                <> <PanelAdd loading={loading} error={false} />
                    {loading ?
                        <Loading loading={loading} error={false} />
                        :


                        <div className="wrapper">
                            {user.access === "2" && <DropdownButton id="access" name="Разрешения" list={StatusList} sel={StatusList.filter((i) => i.id === active).length ? StatusList.filter((i) => i.id === active)[0].name : ""} setSel={setActive} />}
                            <InputText name="Логин" required="Пожалуйста, укажите логин" title="login" register={register} error={errors.login} placeholder="Логин*" />
                            <InputText required="Пожалуйста, укажите пароль" title="password" register={register} error={errors.password} name="Пароль" placeholder="Пароль*" />
                        </div>
                    }
                </>}



        </AdminLayout>
    );
});
