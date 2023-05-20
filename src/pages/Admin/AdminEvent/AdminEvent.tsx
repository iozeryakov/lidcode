import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminEvent: FC = () => {
  const data = [
    { id: 1, name: "Соревнование №1", checked: false },
    { id: 2, name: "Соревнование №2", checked: false },
  ];
  return (
    <AdminLayout name="Соревнования">
      <ContentAll data={data} />
    </AdminLayout>
  );
};
