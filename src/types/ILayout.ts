import { ReactNode } from "react";
import {  SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export interface IAdminLayout {
  name: string;
  children: ReactNode;
  filter?:boolean
  handleSubmit?:UseFormHandleSubmit<any>
  onSubmit?:SubmitHandler<any>
}
export interface IMainLayout {
  children: ReactNode;
}