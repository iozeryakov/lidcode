import {
  FieldError,
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
  ValidationRule,
} from "react-hook-form";
import { IFormEvent, IFormMaterial, IFormOrgSpon, IFormTeam } from "./IForms";
import { IInfoParticipant } from "./IInfo";
import { ReactNode } from "react";

export interface IInputImg {
  name: string;
  register: UseFormRegister<any>;
  title: Path<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  imgLink?: string;
  setImgLink?: React.Dispatch<React.SetStateAction<string>>;
  setBase64: React.Dispatch<
    React.SetStateAction<{
      imgD: string;
      imgH: string;
      imgV: string;
    }>
  >;
}
export interface IInputNumber {
  name: string;
  register: UseFormRegister<any>;
  title: Path<any>;
  required?: string;
  pattern?: ValidationRule<RegExp>;
  min?: ValidationRule<number>;
  max?: ValidationRule<number>;
  error?: FieldError;
}
export interface IInputDate {
  name: string;
  register: UseFormRegister<any>;
  title: Path<any>;
  required?: string;
  error?: FieldError;
}
export interface IInputText {
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  title: Path<any>;
  type?: "text" | "password";
  required?: string;
  pattern?: ValidationRule<RegExp>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  error?: FieldError;
}
export interface IInputFile {
  name: string;
  register: UseFormRegister<any>;
  title: Path<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  fileLink?: string;
  setFileLink?: React.Dispatch<React.SetStateAction<string>>;
}
export interface IInputSponOrg {
  type: "s" | "o";
  register: UseFormRegister<IFormOrgSpon>;
  watch: UseFormWatch<IFormOrgSpon>;
  setValue: UseFormSetValue<IFormOrgSpon>;
  errors: FieldErrors<IFormOrgSpon>;
  imageDef?: string;
  imageHor?: string;
  imageVer?: string;
  setImageDef?: React.Dispatch<React.SetStateAction<string>>;
  setImageHor?: React.Dispatch<React.SetStateAction<string>>;
  setImageVer?: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  not: boolean;
  error: boolean;
  setBase64: React.Dispatch<
    React.SetStateAction<{
      imgD: string;
      imgH: string;
      imgV: string;
    }>
  >;
}
export interface IInputMaterial {
  register: UseFormRegister<IFormMaterial>;
  watch: UseFormWatch<IFormMaterial>;
  setValue: UseFormSetValue<IFormMaterial>;
  errors: FieldErrors<IFormMaterial>;
  fileLink?: string;
  setFileLink?: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  not: boolean;
  loading: boolean;
}
export interface IInputTeam {
  register: UseFormRegister<IFormTeam>;
  errors: FieldErrors<IFormTeam>;
  unregister: UseFormUnregister<any>;
  watch: UseFormWatch<IFormTeam>;
  children?: ReactNode;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  min: number;
  max: number;
  open: number;
  participants: IInfoParticipant[];
  setParticipants: React.Dispatch<React.SetStateAction<IInfoParticipant[]>>;
}
export interface IInputParticipant {
  number: number;
  info: IInfoParticipant;
  setData: (i: IInfoParticipant) => void;
  removeData: ((id: number) => void) | undefined;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<IFormTeam>;
}
export interface IInputEvent {
  register: UseFormRegister<IFormEvent>;
  watch: UseFormWatch<IFormEvent>;
  setValue: UseFormSetValue<IFormEvent>;
  errors: FieldErrors<IFormEvent>;
  active: string;
  children?: ReactNode;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setBase64: React.Dispatch<
    React.SetStateAction<{
      imgD: string;
      imgH: string;
      imgV: string;
    }>
  >;
  imageDef?: string;
  imageHor?: string;
  imageVer?: string;
  setImageDef?: React.Dispatch<React.SetStateAction<string>>;
  setImageHor?: React.Dispatch<React.SetStateAction<string>>;
  setImageVer?: React.Dispatch<React.SetStateAction<string>>;
}
