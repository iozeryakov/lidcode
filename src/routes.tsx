import { AdminEvent } from "./pages/Admin/AdminEvent/AdminEvent";
import { AdminEventNew } from "./pages/Admin/AdminEventNew/AdminEventNew";
import { AdminEventOne } from "./pages/Admin/AdminEventOne/AdminEventOne";
import { AdminLogin } from "./pages/Admin/AdminLogin/AdminLogin";
import { AdminMaterial } from "./pages/Admin/AdminMaterial/AdminMaterial";
import { AdminMaterialNew } from "./pages/Admin/AdminMaterialNew/AdminMaterialNew";
import { AdminMaterialOne } from "./pages/Admin/AdminMaterialOne/AdminMaterialOne";
import { AdminOrganizer } from "./pages/Admin/AdminOrganizer/AdminOrganizer";
import { AdminOrganizerNew } from "./pages/Admin/AdminOrganizerNew/AdminOrganizerNew";
import { AdminOrganizerOne } from "./pages/Admin/AdminOrganizerOne/AdminOrganizerOne";
import { AdminSponsor } from "./pages/Admin/AdminSponsor/AdminSponsor";
import { AdminSponsorNew } from "./pages/Admin/AdminSponsorNew/AdminSponsorNew";
import { AdminSponsorOne } from "./pages/Admin/AdminSponsorOne/AdminSponsorOne";
import { AdminTeam } from "./pages/Admin/AdminTeam/AdminTeam";
import { AdminTeamNew } from "./pages/Admin/AdminTeamNew/AdminTeamNew";
import { AdminTeamOne } from "./pages/Admin/AdminTeamOne/AdminTeamOne";
import { Event } from "./pages/Event/Event";
import { Main } from "./pages/Main/Main";
import { Registration } from "./pages/Registration/Registration";
import { RegistrationTm } from "./pages/RegistrationTm/RegistrationTm";
import { Rules } from "./pages/Rules/Rules";
import {
  MAIN_ROUTER,
  EVENT_ROUTER,
  ADMIN_ROUTER,
  REGISTRATION_ROUTER,
  REGISTRATIONTM_ROUTER,
  ADMIN_EVENT_ROUTER,
  ADMIN_MATERIAL_ROUTER,
  ADMIN_SPONSOR_ROUTER,
  ADMIN_ORGANIZER_ROUTER,
  ADMIN_TEAM_ROUTER,
  ADMIN_SPONSOR_NEW_ROUTER,
  ADMIN_ORGANIZER_NEW_ROUTER,
  ADMIN_TEAM_NEW_ROUTER,
  ADMIN_EVENT_NEW_ROUTER,
  ADMIN_MATERIAL_NEW_ROUTER,
  RULES_ROUTER,
} from "./utils/consts";

export const publicRoutes = [
  {
    path: MAIN_ROUTER,
    Component: <Main />,
  },
  {
    path: EVENT_ROUTER + "/:id",
    Component: <Event />,
  },
  {
    path: RULES_ROUTER + "/:id",
    Component: <Rules />,
  },
  {
    path: ADMIN_ROUTER,
    Component: <AdminLogin />,
  },
  {
    path: REGISTRATION_ROUTER + "/:id",
    Component: <Registration />,
  },
  {
    path: REGISTRATIONTM_ROUTER + "/:id",
    Component: <RegistrationTm />,
  },
  {
    path: ADMIN_EVENT_ROUTER,
    Component: <AdminEvent />,
  },
  {
    path: ADMIN_EVENT_ROUTER + "/:id",
    Component: <AdminEventOne />,
  },
  {
    path: ADMIN_MATERIAL_ROUTER,
    Component: <AdminMaterial />,
  },
  {
    path: ADMIN_MATERIAL_ROUTER + "/:id",
    Component: <AdminMaterialOne />,
  },
  {
    path: ADMIN_SPONSOR_ROUTER,
    Component: <AdminSponsor />,
  },
  {
    path: ADMIN_SPONSOR_ROUTER + "/:id",
    Component: <AdminSponsorOne />,
  },
  {
    path: ADMIN_ORGANIZER_ROUTER,
    Component: <AdminOrganizer />,
  },
  {
    path: ADMIN_ORGANIZER_ROUTER + "/:id",
    Component: <AdminOrganizerOne />,
  },
  {
    path: ADMIN_TEAM_ROUTER,
    Component: <AdminTeam />,
  },
  {
    path: ADMIN_TEAM_ROUTER + "/:id",
    Component: <AdminTeamOne />,
  },

  {
    path: ADMIN_SPONSOR_NEW_ROUTER,
    Component: <AdminSponsorNew />,
  },
  {
    path: ADMIN_ORGANIZER_NEW_ROUTER,
    Component: <AdminOrganizerNew />,
  },
  {
    path: ADMIN_TEAM_NEW_ROUTER,
    Component: <AdminTeamNew />,
  },
  {
    path: ADMIN_EVENT_NEW_ROUTER,
    Component: <AdminEventNew />,
  },
  {
    path: ADMIN_MATERIAL_NEW_ROUTER,
    Component: <AdminMaterialNew />,
  },
];
