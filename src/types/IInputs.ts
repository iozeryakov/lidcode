import { FieldError, FieldErrors, Path, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormWatch, ValidationRule } from "react-hook-form";
import { IFormEvent, IFormMaterial, IFormOrgSpon, IFormTeam } from "./IForms";
import { IInfoParticipant } from "./IInfo";
import { ReactNode } from "react";

export interface IInputImg {
    name: string;
    register: UseFormRegister<any>
    title: Path<any>
    watch:UseFormWatch<any>
    setValue: UseFormSetValue<any>
}
export interface IInputNumber {
    name: string
    register: UseFormRegister<any>
    title: Path<any>
    required?: string;
    pattern?: ValidationRule<RegExp>
    min?: ValidationRule<number>
    max?: ValidationRule<number>
    error?: FieldError
}
export interface IInputDate {
    name: string;
    register: UseFormRegister<any>
    title: Path<any>
    required?: string
    error?:FieldError 
 
}
export interface IInputText {
    name: string;
    placeholder: string;
    register: UseFormRegister<any> 
    title: Path<any>
    type?:"text"|"password"
    required?: string;
    pattern?:ValidationRule<RegExp>
    minLength?:ValidationRule<number>
    maxLength?:ValidationRule<number>
    error?:FieldError 
}  
export interface IInputFile {
    name: string;
    register: UseFormRegister<any>
    title: Path<any>
    watch:UseFormWatch<any>
    setValue: UseFormSetValue<any>
}
export interface IInputSponOrg{
    type:"s"|"o"
    register:UseFormRegister<IFormOrgSpon>
    watch: UseFormWatch<IFormOrgSpon>
    setValue: UseFormSetValue<IFormOrgSpon>
    errors:FieldErrors<IFormOrgSpon>
}
export interface IInputMaterial{
    register:UseFormRegister<IFormMaterial>
    watch: UseFormWatch<IFormMaterial>
    setValue: UseFormSetValue<IFormMaterial>
    errors:FieldErrors<IFormMaterial>
}
export interface IInputTeam{
    register: UseFormRegister<IFormTeam>
    errors: FieldErrors<IFormTeam>
    unregister: UseFormUnregister<IFormTeam>
    watch: UseFormWatch<IFormTeam>
}
export interface IInputParticipant {
    number: number;
    info: IInfoParticipant;
    setData: (i: IInfoParticipant) => void;
    removeData: ((id: number) => void) | undefined;
    register:UseFormRegister<any>
    watch: UseFormWatch<any>
    errors: FieldErrors<IFormTeam>
}
export interface IInputEvent{
    register:UseFormRegister<IFormEvent>
    watch: UseFormWatch<IFormEvent>
    setValue: UseFormSetValue<IFormEvent>
    errors:FieldErrors<IFormEvent>
    active: number
    children?: ReactNode
    setActive: React.Dispatch<React.SetStateAction<number>>

}
  
  