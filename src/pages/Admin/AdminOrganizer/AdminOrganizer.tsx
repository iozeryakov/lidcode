import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminOrganizer: FC = () => {
  const data = [
    { id: 1, name: "Организатор №1", checked: false },
    { id: 2, name: "Организатор №2", checked: false },
  ];
  return (
    <AdminLayout name="Организаторы">
      <ContentAll data={data} />
    </AdminLayout>
  );
};
