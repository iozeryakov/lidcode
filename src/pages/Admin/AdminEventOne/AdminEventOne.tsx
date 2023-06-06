import { FC, useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { PanelAdd } from "../../../components/PanelAdd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { InputFile } from "../../../components/InputFile";
import { DropdownItems } from "../../../components/DropdownItems";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormEvent } from "../../../types/IForms";
import { FormEvent } from "../../../components/FormEvent";
import { $authHost } from "../../../api/axiosApi"
import { Context } from "../../..";
import useAxios from "../../../hooks/useAxios";
import { observer } from "mobx-react-lite";
import { IInfoId, IInfoList } from "../../../types/IInfo";
import { Loading } from "../../../components/Loading";
import { ADMIN_MATERIAL_ROUTER, ADMIN_ORGANIZER_ROUTER, ADMIN_SPONSOR_ROUTER, ADMIN_TEAM_ROUTER } from "../../../utils/consts";

export const AdminEventOne: FC = observer(() => {
  const { user, modal } = useContext(Context)
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [imageDef, setImageDef] = useState("");
  const [imageHor, setImageHor] = useState("");
  const [imageVer, setImageVer] = useState("");
  const [material, setMaterial] = useState<IInfoList[]>([])
  const [materialOther, setMaterialOther] = useState<IInfoList[]>([])
  const [sponsor, setSponsor] = useState<IInfoList[]>([])
  const [sponsorOther, setSponsorOther] = useState<IInfoList[]>([])
  const [organizer, setOrganizer] = useState<IInfoList[]>([])
  const [organizerOther, setOrganizerOther] = useState<IInfoList[]>([])
  const [team, setTeam] = useState<IInfoList[]>([])
  const [teamOther, setTeamOther] = useState<IInfoList[]>([])
  const [file, setFile] = useState("")
  const [active, setActive] = useState("1")
  const [base64, setBase64] = useState({ imgD: "", imgH: "", imgV: "" })
  const [response, error, loading, axiosFetch] = useAxios();
  const [putResponse, putError, putLoading, putAxiosFetch] = useAxios();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormEvent>({ mode: "onChange", defaultValues: { maxTeam: 1, minParticipant: 1, maxParticipant: 1 } });

  const onSubmit: SubmitHandler<IFormEvent> = data => {
    if (data.minParticipant <= data.maxParticipant) {
      if (team.length > data.maxTeam) {
        modal.setIsVisible("Количество выбранных команд больше чем разрешено!", true)
      } else if (team.filter((i) => i.count_participants ? i.count_participants < data.minParticipant : true).length !== 0) {
        modal.setIsVisible("Количество участников в одной из команд меньше чем разрешено!", true)
      } else if (team.filter((i) => i.count_participants ? i.count_participants > data.maxParticipant : true).length !== 0) {
        modal.setIsVisible("Количество участников в одной из команд больше чем разрешено!", true)
      } else {
        if (data.dateOpen <= data.dateClose && data.dateClose <= data.dateStart && data.dateStart <= data.dateEnd) {
          if (data.file?.length) {
            const reader = new FileReader();
            reader.readAsDataURL(data.file[0])
            reader.onload = () => {
              putData(data.title, active, data.maxParticipant, data.maxTeam, data.minParticipant, data.description, data.rules, data.dateClose.toString(), data.dateEnd.toString(), data.dateOpen.toString(), data.dateStart.toString(), data.dateMaterial.toString(), organizer.map(i => ({ id: i.id })), sponsor.map(i => ({ id: i.id })), team.map(i => ({ id: i.id })), material.map(i => ({ id: i.id })), base64.imgD ? base64.imgD : imageDef ? undefined : imageDef, base64.imgH ? base64.imgH : imageHor ? undefined : imageHor, base64.imgV ? base64.imgV : imageVer ? undefined : imageVer, reader.result?.toString())
            }
          } else {
            putData(data.title, active, data.maxParticipant, data.maxTeam, data.minParticipant, data.description, data.rules, data.dateClose.toString(), data.dateEnd.toString(), data.dateOpen.toString(), data.dateStart.toString(), data.dateMaterial.toString(), organizer.map(i => ({ id: i.id })), sponsor.map(i => ({ id: i.id })), team.map(i => ({ id: i.id })), material.map(i => ({ id: i.id })), base64.imgD ? base64.imgD : imageDef ? undefined : imageDef, base64.imgH ? base64.imgH : imageHor ? undefined : imageHor, base64.imgV ? base64.imgV : imageVer ? undefined : imageVer, file.length === 0 ? "" : undefined)
          }
        }
        else {
          modal.setIsVisible("Даты должны бать расположены в порядке возрастания!", true)
        }
      }
    } else {
      modal.setIsVisible("Минимальное количесво участников не может быть больше максимального!", true)
    }
  };

  const getData = () => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/events/",
      requestConfig: { params: { id: id } }
    });
  }

  const putData = (name: string, status: string, maxNumberOfParticipants: number,
    maxNumberOfTeam: number, minNumberOfParticipants: number, description: string,
    regulations: string, dateCloseRegister: string, dateEnd: string,
    dateRegister: string, dateStart: string, timePublicationAdditionalMaterial: string,
    OrganizersList: IInfoId[], SponsorsList: IInfoId[], TeamsList: IInfoId[], MaterialsList: IInfoId[],
    imageDef?: string, imageHor?: string, imageVer?: string, results?: string,) => {
   

    putAxiosFetch({
      axiosInstance: $authHost,
      method: "put",
      url: "api/v1/events/",
      requestConfig: {
        "EventData": {
          id: id, name: name, status: status, maxNumberOfParticipants: maxNumberOfParticipants, maxNumberOfTeam: maxNumberOfTeam, minNumberOfParticipants: minNumberOfParticipants,
          imageDef: imageDef, imageHor: imageHor, imageVer: imageVer, description: description, regulations: regulations, results: results, dateCloseRegister: dateCloseRegister,
          dateEnd: dateEnd, dateRegister: dateRegister, dateStart: dateStart, timePublicationAdditionalMaterial: timePublicationAdditionalMaterial
        },
        "OrganizersList": OrganizersList,
        "SponsorsList": SponsorsList,
        "TeamsList": TeamsList,
        "MaterialsList": MaterialsList
      }
    });
  }

  useEffect(() => {
    if (putResponse?.token && !putLoading && putError.length === 0) {
      user.newToken(putResponse.token)
      modal.setIsVisible("Успешно сохранено", false)
      navigate("../" + location.pathname.split("/").slice(0, 3).join("/"))
    } else if (putResponse?.status && !putLoading && putError.length === 0) {
      user.newToken("")
    } else { putError.length && modal.setIsVisible("Ошибка сохранения", true) }
    // eslint-disable-next-line 
  }, [putResponse, putLoading, putError])

  useEffect(() => {
    if (user.isAuth) getData();
    // eslint-disable-next-line 
  }, [user.isAuth])

  useEffect(() => {

    if (response?.token) {
      user.newToken(response.token)
      if (response?.EventData[0]) {
        setValue("title", response.EventData[0].name)
        setActive(response.EventData[0].status)
        setValue("maxTeam", response.EventData[0].maxNumberOfTeam)
        setValue("minParticipant", response.EventData[0].minNumberOfParticipants)
        setValue("maxParticipant", response.EventData[0].maxNumberOfParticipants)
        setValue("description", response.EventData[0].description)
        setValue("rules", response.EventData[0].regulations)
        setImageDef(response.EventData[0].imageDef ? response.EventData[0].imageDef : "")
        setImageHor(response.EventData[0].imageHor ? response.EventData[0].imageHor : "")
        setImageVer(response.EventData[0].imageVer ? response.EventData[0].imageVer : "")
        setValue("dateOpen", response.EventData[0].dateRegister)
        setValue("dateClose", response.EventData[0].dateCloseRegister)
        setValue("dateStart", response.EventData[0].dateStart)
        setValue("dateEnd", response.EventData[0].dateEnd)
        setValue("dateMaterial", response.EventData[0].timePublicationAdditionalMaterial)
        setFile(response.EventData[0].results ? response.EventData[0].results : "")
      }
      if (response?.MaterialOtherData.length) {
        setMaterialOther(response.MaterialOtherData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setMaterialOther([]) }
      if (response?.MaterialEventData.length) {
        setMaterial(response.MaterialEventData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setMaterial([]) }
      if (response?.TeamOtherData.length) {
        setTeamOther(response.TeamOtherData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setTeamOther([]) }
      if (response?.TeamEventData.length) {
        setTeam(response.TeamEventData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setTeam([]) }
      if (response?.OrganizerOtherData.length) {
        setOrganizerOther(response.OrganizerOtherData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setOrganizerOther([]) }
      if (response?.OrganizerEventData.length) {
        setOrganizer(response.OrganizerEventData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setOrganizer([]) }
      if (response?.TeamOtherData.length) {
        setTeamOther(response.TeamOtherData.map(i => ({ id: i.id, name: i.name, count_participants: i.count_participants, forSorted: i.forSorted })));
      } else { setTeamOther([]) }
      if (response?.TeamEventData.length) {
        setTeam(response.TeamEventData.map(i => ({ id: i.id, name: i.name, count_participants: i.count_participants, forSorted: i.forSorted })));
      } else { setTeam([]) }
      if (response?.SponsorOtherData.length) {
        setSponsorOther(response.SponsorOtherData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setSponsorOther([]) }
      if (response?.SponsorEventData.length) {
        setSponsor(response.SponsorEventData.map(i => ({ id: i.id, name: i.name, forSorted: i.forSorted })));
      } else { setSponsor([]) }
    } else if (response?.status) {
      user.newToken("")
    }
    // eslint-disable-next-line 
  }, [response])



  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={loading ? "Загрузка..." : (response?.EventData && response?.EventData[0]) ? "Cоревнование " + (response?.EventData && response?.EventData[0].name) : error.length ? "Ошибка" : "Cоревнование"}>
      <PanelAdd loading={loading || !(response?.EventData && response.EventData.length)} error={error.length !== 0} />
      {loading || putLoading || error.length !== 0 || !(response?.EventData && response.EventData.length) ?
        <Loading loading={loading || putLoading} error={error.length !== 0} />
        :
        <div className="wrapper">
          <FormEvent setBase64={setBase64} register={register} watch={watch} setValue={setValue} errors={errors} active={active} setActive={setActive} imageDef={imageDef} imageHor={imageHor} imageVer={imageVer} setImageDef={setImageDef} setImageHor={setImageHor} setImageVer={setImageVer}>
            <InputFile register={register} fileLink={file} setFileLink={setFile} title="file" watch={watch} setValue={setValue} name="Результаты" />
          </FormEvent>
          <DropdownItems link={ADMIN_TEAM_ROUTER} id="setTeam" event={team} other={teamOther} setOther={setTeamOther} setEvent={setTeam} name="Выбранные команды" min={watch("minParticipant")} max={watch("maxParticipant")} maxT={watch("maxTeam")} />
          <DropdownItems link={ADMIN_MATERIAL_ROUTER} id="selMat" event={material} other={materialOther} setOther={setMaterialOther} setEvent={setMaterial} name="Выбранные материалы" />
          <DropdownItems link={ADMIN_SPONSOR_ROUTER} id="selSpon" event={sponsor} other={sponsorOther} setOther={setSponsorOther} setEvent={setSponsor} name="Выбранные спонсоры" />
          <DropdownItems link={ADMIN_ORGANIZER_ROUTER} id="selOrg" event={organizer} other={organizerOther} setOther={setOrganizerOther} setEvent={setOrganizer} name="Выбранные организаторы" />
        </div>
      }
    </AdminLayout>);
});
