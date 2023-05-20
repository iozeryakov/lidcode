import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminSponsor: FC = () => {
  const data = [
    { id: 1, name: "Спонсор №1", checked: false },
    { id: 2, name: "Спонсор №2", checked: false },
  ];
  return (
    <AdminLayout name="Спонсоры">
      <ContentAll data={data} />
    </AdminLayout>
  );
};
