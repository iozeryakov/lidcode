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
  admin?: boolean;
  isBasic?: boolean;
}
export interface IInfoPanel {
  selectAll: boolean;
  remove: () => void;
  select: (checked: boolean) => void;
}
export interface IInfoPage {
  number: number;
  active?: boolean;
  onClick: () => void;
}
export interface IInfoPages {
  page: number;
  CountList: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export interface IInfoDropdownButton {
  list: IInfoList[];
  sel: string;
  name: string;
  id: string;
  setSel: React.Dispatch<React.SetStateAction<string>> | ((id: string) => void);
}
export interface IInfoDropdownItems {
  name: string;
  id: string;
  other: IInfoList[];
  event: IInfoList[];
  setEvent: React.Dispatch<React.SetStateAction<IInfoList[]>>;
  setOther: React.Dispatch<React.SetStateAction<IInfoList[]>>;
  link: string;
  maxT?: number;
  min?: number;
  max?: number;
}
export interface IInfoLoading {
  loading: boolean;
  error: boolean;
}
export interface IInfoList {
  id: string;
  name: string;
  forSorted: number;
  count_participants?: number;
}
export interface IInfoContentAll {
  name: string;
  loadingF?: boolean;
  filter?: string;
}
export interface IInfoContent {
  id: string;
  name: string;
  checked: boolean;
}
export interface IInfoItemMenu {
  src: string;
  alt: string;
  to: string;
  active: boolean;
  id: string;
}
export interface IInfoMainButton {
  name: string;
  className?: string;
  click: () => void;
}
export interface IInfoId {
  id: string;
}
export interface IInfo {
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
export interface IInfoSponOrg {
  id: string;
  imageDef: string;
  imageHor: string;
  imageVer: string;
  link: string;
  name: string;
}
export interface IInfoCard {
  id: string;
  name: string;
  statusNow: string;
  minNumberOfParticipants: number;
  maxNumberOfParticipants: number;
  description: string;
  imageDef: string;
  imageHor: string;
  imageVer: string;
}
