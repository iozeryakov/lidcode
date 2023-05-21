export interface IInfoParticipant {
    id: number;
    reserve: boolean;
    contact: boolean;
    coach: boolean;
    main: boolean;
    visibleContact: boolean;
    visibleCoach: boolean;
}
 export interface IInfoBurger {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
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
    setSel: React.Dispatch<React.SetStateAction<number>> | ((id: number) => void)
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
}
export interface IInfoMainButton {
  name: string
  className?: string
  click: () => void
}