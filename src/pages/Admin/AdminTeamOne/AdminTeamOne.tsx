import { FC, useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { PanelAdd } from "../../../components/PanelAdd";
import { FormParticipants } from "../../../components/FormParticipants";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormParticipant, IFormTeam } from "../../../types/IForms";
import { Context } from "../../..";
import useAxios from "../../../hooks/useAxios";
import { observer } from "mobx-react-lite";
import { $authHost } from "../../../api/axiosApi"
import { DropdownButton } from "../../../components/DropdownButton";
import { ADMIN_EVENT_ROUTER, StatusListTeam } from "../../../utils/consts";
import { Loading } from "../../../components/Loading";
import { IInfoParticipant } from "../../../types/IInfo";
import { addData } from "../../../utils/addData";

/**
 * Компонент, отображающий страницу для изменения команд.
 * 
 * @returns {JSX.Element} - Компонент, отображающий страницу для изменения команд.
 */
export const AdminTeamOne: FC = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, unregister, watch, formState: { errors }, setValue } = useForm<any>({ mode: "onChange" });
  const [check, setCheck] = useState(false)
  const { id } = useParams()
  const { user, modal } = useContext(Context)
  const [response, error, loading, axiosFetch] = useAxios();
  const [active, setActive] = useState("1")
  const [event, setEvent] = useState<{ name: string, minNumberOfParticipants: string, maxNumberOfParticipants: string, id: string }>()
  const [putResponse, putError, putLoading, putAxiosFetch] = useAxios();
  const [participants, setParticipants] = useState<IInfoParticipant[]>([]);

  /**
   * Отправляет данные формы на сервер
   * @param event_id Идентификатор команады
   * @param name Название команды
   * @param status Статус команды
   * @param TeamList Список участников команды   
   */
  const putData = (
    event_id: string,
    name: string,
    status: string,
    TeamList: IFormParticipant[]) => {
    putAxiosFetch({
      axiosInstance: $authHost,
      method: "put",
      url: "api/v1/teams/",
      requestConfig: { "TeamData": { id: id, event_id: event_id, name: name, status: status }, "TeamListParticipantsData": TeamList }
    });
  }

  /**
   * Получает данные с сервера
   */
  const getData = () => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/teams/",
      requestConfig: { params: { id: id } }
    });
  }

  /**
   * Обработчик отправки формы 
   * @param data Данные формы 
   */
  const onSubmit: SubmitHandler<IFormTeam> = data => {
    if (check && data.participant.filter(i => i.main).length < Number(event?.minNumberOfParticipants)) {
      modal.setIsVisible("Mинимум " + event?.minNumberOfParticipants + " участник/а в основном составе!", true)
    } else if (data.participant.length > Number(event?.maxNumberOfParticipants) + 2) {
      modal.setIsVisible("Максимум " + (Number(event?.maxNumberOfParticipants) + 2) + " участника!", true)
    } else {
      if (check) {
        if ((data.participant.filter((i) => (i.coach || i.contact)).length === 2) && (data.participant.filter(i => (i.coach && i.contact) || i.main === i.reserve).length === 0) && data.participant.filter((i) => i.reserve && !i.coach && !i.contact).length === 0) {
          putData(response?.TeamData[0].event_id, data.name, active, data.participant)
        } else if (data.participant.filter((i) => (i.coach || i.contact)).length !== 2) {
          modal.setIsVisible("Не выбраны контактое лицо и тренер!", true)
        } else if (data.participant.filter((i) => i.reserve && !i.coach && !i.contact).length) {
          modal.setIsVisible("Ошибка резервного участника!", true)
        } else { modal.setIsVisible("Ошибка формы перезагрузите страницу!", true) }
      } else {
        if (data.participant.length === 1)
          putData(response?.TeamData[0].event_id, data.name, active, [{ ...data.participant[0], coach: true, contact: true, main: true, reserve: false }]);
        else { modal.setIsVisible("Ошибка формы перезагрузите страницу!", true) }
      }
    }
  };

  useEffect(() => {
    if (user.isAuth) getData();
    // eslint-disable-next-line 
  }, [user.isAuth])

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
    if (response?.token) {
      user.newToken(response.token)
      if (response?.TeamData.length) {
        setValue("name", response.TeamData[0].name)
        setActive(response.TeamData[0].status)
        if (response.EventData.length) {
          setEvent({ name: response.EventData[0].name, minNumberOfParticipants: response.EventData[0].minNumberOfParticipants, maxNumberOfParticipants: response.EventData[0].maxNumberOfParticipants, id: response.TeamData[0].event_id })
          response.EventData[0].minNumberOfParticipants > 1 && setCheck(true)
        }
        if (response.ParticipantData.length > 1) {
          setCheck(true)
          response.ParticipantData.sort((a, b) => b.main - a.main).map((i, index) => {
            addData(i.main ? "main" : "reserve", setParticipants)
            setValue("participant[" + index + "].name", i.name)
            setValue("participant[" + index + "].emailAdress", i.emailAdress)
            setValue("participant[" + index + "].phoneNumbers", i.phoneNumbers)
            setValue("participant[" + index + "].organization", i.organization)
            setValue("participant[" + index + "].universityFaculty", i.universityFaculty)
            setValue("participant[" + index + "].universityCourse", i.universityCourse)
            setValue("participant[" + index + "].coach", i.coach)
            setValue("participant[" + index + "].contact", i.contact)
            setValue("participant[" + index + "].reserve", i.reserve)
            setValue("participant[" + index + "].main", i.main)
          })
        } else {
          addData("main", setParticipants)
          setValue("participant[0].name", response.ParticipantData[0].name)
          setValue("participant[0].emailAdress", response.ParticipantData[0].emailAdress)
          setValue("participant[0].phoneNumbers", response.ParticipantData[0].phoneNumbers)
          setValue("participant[0].organization", response.ParticipantData[0].organization)
          setValue("participant[0].universityFaculty", response.ParticipantData[0].universityFaculty)
          setValue("participant[0].universityCourse", response.ParticipantData[0].universityCourse)
        }
      }
    } else if (response?.status) {
      user.newToken("")
    }
    // eslint-disable-next-line 
  }, [response])


  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name={loading ? "Загрузка..." : (response?.TeamData && response.TeamData[0]) ? "Команда " + (response.TeamData && response.TeamData[0].name) : error.length ? "Ошибка" : "Команда"}>
      <PanelAdd loading={loading || putLoading} error={error.length !== 0 || !(response?.TeamData && response.TeamData.length)} />
      {loading || error.length !== 0 || !(response?.TeamData && response.TeamData.length) || putLoading ?
        <Loading loading={loading || putLoading} error={error.length !== 0} />
        :
        <div className=" wrapper">
          {event ?
            <div className="flex flex-row  w-full pb-[5px] gap-2">
              <label className="standart_text font-normal font-roboto">Прикреплен к соревнованию:</label>
              <Link to={'../' + ADMIN_EVENT_ROUTER + "/" + event.id} className="standart_text font-normal font-roboto text-blue-600 ">{event.name}</Link>
            </div>
            :
            <div className="flex flex-col  w-full pb-[5px]">
              <label className="standart_text font-normal font-roboto">Не прикреплен к соревнованию</label>
            </div>}


          <FormParticipants participants={participants} setParticipants={setParticipants} check={check} setCheck={setCheck} watch={watch} register={register} errors={errors} unregister={unregister} min={event ? Number(event.minNumberOfParticipants) : 1} max={event ? Number(event.maxNumberOfParticipants) : 1000} open={response ? response.ParticipantData.length : 1}>
            <DropdownButton id="status" name="Статус" list={StatusListTeam} sel={StatusListTeam.filter((i) => i.id === active).length ? StatusListTeam.filter((i) => i.id === active)[0].name : ""} setSel={setActive} />
          </FormParticipants>
        </div>}


    </AdminLayout >
  );
});
