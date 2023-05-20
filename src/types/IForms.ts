export interface IFormLogin {
    login: string
    password: string
}
export interface IFormRegistr{
    fullName:string
    email:string
    phone:string
    organization:string
    faculty:string
    course:string
}
export interface IFormOrgSpon{
    title:string
    link:string
    imgD:File
    imgV:File
    imgH:File
}
export interface IFormMaterial{
    title:string
    link:string
    file:File
}
export interface IFormEvent{
    title:string
    description:string
    rules:string
    maxTeam:number
    minTeam:number
    maxParticipant:number
    file?:File
    imgD:File
    imgV:File
    imgH:File
    dateOpen:Date
    dateClose:Date
    dateStart:Date
    dateEnd:Date
    dateMaterial:Date
}
export interface IFormTeam{
    name: string
    participant: IFormParticipant[]
}
export interface IFormParticipant{
    contact: boolean
    coach: boolean
    fullName: string
    email: string
    phone: string
    organization: string
    faculty: string
    course: string
    reserve: boolean
    main: boolean
}