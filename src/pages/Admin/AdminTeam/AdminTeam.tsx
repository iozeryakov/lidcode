import { FC } from "react";
import { ContentAll } from "../../../components/ContentAll";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const AdminTeam: FC = () => {
  const data = [
    { id: 1, name: "Команда №1", checked: false },
    { id: 2, name: "Команда №2", checked: false },
  ];
  return (
    <AdminLayout name="Команды" filter>
      <ContentAll data={data} />
    </AdminLayout>
  );
};
