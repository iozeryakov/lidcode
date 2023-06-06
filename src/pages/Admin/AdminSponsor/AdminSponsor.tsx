import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";
export const AdminSponsor: FC = () => {


  return (
    <AdminLayout name="Спонсоры">
      <ContentAll name="sponsors" />
    </AdminLayout>
  );
};
