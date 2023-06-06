export const EVENT_ROUTER = "event";
export const RULES_ROUTER = "rules";
export const ADMIN_ROUTER = "admin";
export const MAIN_ROUTER = "/";
export const MAIN_ROUTER_BASIC = "/basic";
export const REGISTRATION_ROUTER = "registration";
export const REGISTRATIONTM_ROUTER = "registrationtm";
export const ADMIN_EVENT_ROUTER = "admin/event";
export const ADMIN_MATERIAL_ROUTER = "admin/material";
export const ADMIN_SPONSOR_ROUTER = "admin/sponsor";
export const ADMIN_ORGANIZER_ROUTER = "admin/organizer";
export const ADMIN_TEAM_ROUTER = "admin/team";
export const ADMIN_MATERIAL_NEW_ROUTER = "admin/material/new";
export const ADMIN_SPONSOR_NEW_ROUTER = "admin/sponsor/new";
export const ADMIN_ORGANIZER_NEW_ROUTER = "admin/organizer/new";
export const ADMIN_TEAM_NEW_ROUTER = "admin/team/new";
export const ADMIN_EVENT_NEW_ROUTER = "admin/event/new";
export const ADMIN_ADMINS_ROUTER = "admin/admins";
export const ADMIN_ADMINS_NEW_ROUTER = "admin/admins/new";

export const REGEXP_LINK =
  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
export const REGEXP_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEXP_PHONE =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

export const API_URL = "http://51.250.91.47:8000/";
export const API_IMG = "http://localhost:5000/";

export const StatusList = [
  { id: "1", name: "Скрытое", forSorted: 1 },
  { id: "2", name: "Опубликованное", forSorted: 2 },
];
export const StatusListTeam = [
  { id: "1", name: "Ожидает", forSorted: 1 },
  { id: "2", name: "Отклонено", forSorted: 2 },
  { id: "3", name: "Подтверждено", forSorted: 3 },
];
