import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

/**
 * Компонент, отображающий страницу со списком спосоров.
 *
 * @returns {JSX.Element} - Компонент, отображающий страницу со списком спосоров.
 */
export const AdminSponsor: FC = () => {

  return (
    <AdminLayout name="Спонсоры">
      <ContentAll name="sponsors" />
    </AdminLayout>
  );
};
