import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

/**
 * Компонент, отображающий страницу со списком организаторов.
 *
 * @returns {JSX.Element} - Компонент, отображающий страницу со списком организаторов.
 */
export const AdminOrganizer: FC = () => {


  return (
    <AdminLayout name="Организаторы">
      <ContentAll name="organizers" />
    </AdminLayout>
  );
};
