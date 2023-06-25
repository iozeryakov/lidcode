import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";


/**
 * Компонент, отображающий страницу со списком соревнований.
 *
 * @returns {JSX.Element} - Компонент, отображающий страницу со списком соревнований.
 */
export const AdminEvent: FC = () => {


  return (
    <AdminLayout name="Соревнования">
      <ContentAll name="events" />
    </AdminLayout>
  );
};
