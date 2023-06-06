import { FC, useContext, useEffect, useState } from "react";
import { PanelAdd } from "../../../components/PanelAdd";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { FormParticipants } from "../../../components/FormParticipants";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormParticipant, IFormTeam } from "../../../types/IForms";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { $authHost } from "../../../api/axiosApi"
import { Loading } from "../../../components/Loading";
import { IInfoParticipant } from "../../../types/IInfo";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

export const AdminTeamNew: FC = observer(() => {
  const { modal, user } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const [check, setCheck] = useState(false)
  const [response, error, loading, axiosFetch] = useAxios();
  const { register, handleSubmit, watch, unregister, formState: { errors } } = useForm<any>({ mode: "onChange" });
  const [participants, setParticipants] = useState<IInfoParticipant[]>([]);

  const postData = (name: string, status: string, participants: IFormParticipant[]) => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "post",
      url: "api/v1/teams/",
      requestConfig: { "TeamData": { name, status }, "TeamListParticipantsData": participants }
    });
  }

  const onSubmit: SubmitHandler<IFormTeam> = data => {
    if (check) {

      if ((data.participant.filter((i) => (i.coach || i.contact)).length === 2) && (data.participant.filter(i => (i.coach && i.contact) || i.main === i.reserve).length === 0) && data.participant.filter((i) => i.reserve && !i.coach && !i.contact).length === 0) {
        postData(data.name, "1", data.participant)

      } else if (data.participant.filter((i) => (i.coach || i.contact)).length !== 2) {
        modal.setIsVisible("Не выбраны контактое лицо и тренер!", true)
      } else if (data.participant.filter((i) => i.reserve && !i.coach && !i.contact).length) {
        modal.setIsVisible("Ошибка резервного участника!", true)
      } else { modal.setIsVisible("Ошибка формы перезагрузите страницу!", true) }
    } else {
      if (data.participant.length === 1) {
        postData(data.name, "1", [{ ...data.participant[0], coach: true, contact: true, main: true, reserve: false }]);
      }
      else { modal.setIsVisible("Ошибка формы перезагрузите страницу!", true) }
    }

  };

  useEffect(() => {
    if (response?.token && !loading && error.length === 0) {
      user.newToken(response.token)
      modal.setIsVisible("Успешно сохранено", false)
      navigate("../" + location.pathname.split("/").slice(0, 3).join("/"))
    } else if (response?.status && !loading && error.length === 0) {
      user.newToken("")
    } else { error.length && modal.setIsVisible("Ошибка сохранения", true) }
    // eslint-disable-next-line 
  }, [response, loading, error])



  return (
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить команду">
      <PanelAdd loading={loading} error={false} />
      {loading ?
        <Loading loading={loading} error={false} /> :
        <div className=" wrapper">
          <FormParticipants participants={participants} setParticipants={setParticipants} watch={watch} register={register} errors={errors} unregister={unregister} check={check} setCheck={setCheck} min={1} max={1000} open={1} />
        </div>
      }
    </AdminLayout>
  );
});
