export interface IFormLogin {
  login: string;
  password: string;
}
export interface IFormRegistr {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  faculty: string;
  course: string;
}
export interface IFormOrgSpon {
  title: string;
  link: string;
  imgD: FileList;
  imgV: FileList;
  imgH: FileList;
}
export interface IFormMaterial {
  title: string;
  link: string;
  file: FileList;
}
export interface IFormEvent {
  title: string;
  description: string;
  rules: string;
  maxParticipant: number;
  maxTeam: number;
  minParticipant: number;
  file?: FileList;
  imgD: File;
  imgV: File;
  imgH: File;
  dateOpen: Date;
  dateClose: Date;
  dateStart: Date;
  dateEnd: Date;
  dateMaterial: Date;
}
export interface IFormTeam {
  name: string;
  participant: IFormParticipant[];
}
export interface IFormParticipant {
  coach: boolean;
  contact: boolean;
  emailAdress: string;
  main: boolean;
  name: string;
  organization: string;
  phoneNumbers: string;
  reserve: boolean;
  universityCourse: string;
  universityFaculty: string;
}
