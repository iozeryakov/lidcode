import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminOrganizer: FC = () => {


  return (
    <AdminLayout name="Организаторы">
      <ContentAll name="organizers" />
    </AdminLayout>
  );
};
