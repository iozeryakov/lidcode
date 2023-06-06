import { AxiosInstance } from "axios";

export interface IAxios {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "delete" | "put";
  url: string;
  requestConfig?: any;
}
export interface IData {
  Items: any[];
  TeamData: any[];
  ParticipantData: any[];
  EventData: any[];
  MaterialOtherData: any[];
  MaterialEventData: any[];
  OrganizerEventData: any[];
  OrganizerOtherData: any[];
  SponsorEventData: any[];
  SponsorOtherData: any[];
  TeamOtherData: any[];
  TeamEventData: any[];
  CountList: number;
  MaterialData: any[];
  OrganizerData: any[];
  SponsorData: any[];
  TeamListParticipantsData: any[];
  status: string;
  token: string;
}
