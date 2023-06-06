import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminEvent: FC = () => {


  return (
    <AdminLayout name="Соревнования">
      <ContentAll name="events" />
    </AdminLayout>
  );
};
