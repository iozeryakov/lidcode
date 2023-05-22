export interface IInfoParticipant {
    id: number;
    reserve: boolean;
    contact: boolean;
    coach: boolean;
    main: boolean;
    visibleContact: boolean;
    visibleCoach: boolean;
}
 export interface IInfoHeader {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    admin?:boolean
}
export interface IInfoPanel {
    selectAll: boolean;
    remove:()=>void
    select: (checked: boolean) => void;
}
export interface IInfoPage {
    number: string;
    active?: boolean;
}
export interface IInfoDropdownButton {
    list: IInfoList[]
    sel: string
    name: string
    id:string
    setSel: React.Dispatch<React.SetStateAction<number>> | ((id: number) => void)
}
export interface IInfoDropdownItems {
  name: string
  id: string
}
interface IInfoList{
    id:number,
    name:string
}
export interface IInfoContentAll {

  data: IInfoContent[];
}
interface IInfoContent {
  id: number;
  name: string;
  checked: boolean;
}
export interface IInfoItemMenu {
  src: string;
  alt: string;
  to: string;
  active: boolean;
  id:string
}
export interface IInfoMainButton {
  name: string
  className?: string
  click: () => void
}