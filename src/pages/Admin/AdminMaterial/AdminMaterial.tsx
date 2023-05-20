import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminMaterial: FC = () => {
  const data = [
    { id: 1, name: "Материал №1", checked: false },
    { id: 2, name: "Материал №2", checked: false },
  ];
  return (
    <AdminLayout name="Материалы" filter>
      <ContentAll data={data} />
    </AdminLayout>
  );
};
