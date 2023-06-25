import { FC, useContext } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

/**
 * Компонент, отображающий список администраторов в панели администратора.
 *
 * @returns {JSX.Element} - Компонент, отображающий список администраторов в панели администратора.
 */
export const AdminAdmins: FC = observer(() => {
    const { user } = useContext(Context)
    return (
        <AdminLayout name={user.access !== "0" ? "Администраторы" : "Доступ закрыт"} >
            {user.access !== "0" && <ContentAll name="users" />}
        </AdminLayout >
    );
});
