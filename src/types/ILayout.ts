import { ReactNode } from "react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export interface IAdminLayout {
  name: string;
  children: ReactNode;
  filter?: {
    id: string;
    name: string;
  }[];
  activeF?: {
    id: string;
    name: string;
  };
  setActiveF?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    }>
  >;
  handleSubmit?: UseFormHandleSubmit<any>;
  onSubmit?: SubmitHandler<any>;
}

export interface IMainLayout {
  children: ReactNode;
}
