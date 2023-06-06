
import { FC, useContext, useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormParticipants } from "../../components/FormParticipants";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormParticipant, IFormTeam } from "../../types/IForms";
import { IInfoParticipant } from "../../types/IInfo";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axiosApi"
import { EVENT_ROUTER, REGISTRATION_ROUTER } from "../../utils/consts";
import { Context } from "../..";
import { addData } from "../../utils/addData";

export const RegistrationTm: FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, unregister, watch, formState: { errors } } = useForm<IFormTeam>({ mode: "onChange" });
  const [check, setCheck] = useState(false)
  const { id } = useParams()
  const { modal } = useContext(Context)
  const [participants, setParticipants] = useState<IInfoParticipant[]>([]);
  const [dataR, errorData, loadingData, axiosFetchData] = useAxios();
  const [putResponse, putError, putLoading, putAxiosFetch] = useAxios()

  const onSubmit: SubmitHandler<IFormTeam> = data => {
    if (check && data.participant.filter(i => i.main).length < Number(dataR?.EventData[0].minNumberOfParticipants)) {
      modal.setIsVisible("Mинимум " + dataR?.EventData[0].minNumberOfParticipants + " участник/а в основном составе!", true)
    } else if (data.participant.length > Number(dataR?.EventData[0].maxNumberOfParticipants) + 2) {
      modal.setIsVisible("Максимум " + (Number(dataR?.EventData[0].maxNumberOfParticipants) + 2) + " участника!", true)
    } else {
      if (check) {
        if ((data.participant.filter((i) => (i.coach || i.contact)).length === 2) && (data.participant.filter(i => (i.coach && i.contact) || i.main === i.reserve).length === 0) && data.participant.filter((i) => i.reserve && !i.coach && !i.contact).length === 0) {
          putData(data.name, data.participant)
        } else if (data.participant.filter((i) => (i.coach || i.contact)).length !== 2) {
          modal.setIsVisible("Не выбраны контактое лицо и тренер!", true)
        } else if (data.participant.filter((i) => i.reserve && !i.coach && !i.contact).length) {
          modal.setIsVisible("Ошибка резервного участника!", true)
        } else { modal.setIsVisible("Ошибка формы перезагрузите страницу!", true) }
      } else {
        if (data.participant.length === 1)
          putData(data.name, [{ ...data.participant[0], coach: true, contact: true, main: true, reserve: false }]);
        else { modal.setIsVisible("Ошибка формы перезагрузите страницу!", true) }

      }
    }

  };

  const putData = (
    name: string,
    TeamList: IFormParticipant[]) => {
    putAxiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "api/v1/team_registration/",
      requestConfig: { "TeamData": { event_id: id, name: name, status: "1" }, "TeamListParticipantsData": TeamList }
    });
  }

  const getData = () => {
    axiosFetchData({
      axiosInstance: axios,
      method: "get",
      url: "api/v1/event_check_registration/",
      requestConfig: { params: { id: id } }
    });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line 
  }, [])
  useEffect(() => {
    if (dataR?.EventData && dataR.EventData[0].minNumberOfParticipants > 1) {
      setCheck(true)
      addData("main", setParticipants)
    }
  }, [dataR])
  useEffect(() => {
    if (putResponse?.TeamListParticipantsData?.length) {


      modal.setIsVisible("Заявка отправлена", false)
      navigate("../" + EVENT_ROUTER + "/" + id)
    } else if (putResponse?.EventData?.length) {
      modal.setIsVisible("Заявка не отправлена, максимальное количество команд!", true)

    } else {
      putError.length && modal.setIsVisible("Ошибка отправки!", true)
    }
    // eslint-disable-next-line 
  }, [putResponse, putError])


  return (
    <MainLayout>
      {dataR && dataR.EventData.length !== 0 && !loadingData && !putLoading ?
        !(dataR.EventData[0].minNumberOfParticipants === 1 && dataR.EventData[0].maxNumberOfParticipants === 1) ?
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[480px] bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] items-center sx:px-10 px-5 py-[15px] sx:py-[30px] gap-5">
            <div className=" font-bold sx:text-2xl text-xl">Регистрация</div>
            <FormParticipants participants={participants} setParticipants={setParticipants} check={check} setCheck={setCheck} watch={watch} register={register} errors={errors} unregister={unregister} min={dataR.EventData[0].minNumberOfParticipants} max={dataR.EventData[0].maxNumberOfParticipants} open={1} />
            <input id="button" type="submit" className="button" value="Отправить заявку на участие" />
          </form>
          : <>
            <div className="text-ellipsis text-center mx-5  overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">У соревнования одиночное участие, нажмите ниже для перехода на нужную форму.</div>
            <Link to={"../" + REGISTRATION_ROUTER + "/" + id} className="text-blue-600 text-ellipsis text-center mx-5  overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">Перейти!</Link>
          </>
        : <div className="text-ellipsis whitespace-nowrap overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">{loadingData || putLoading ? "Загрузка..." : errorData.length !== 0 ? "Ошибка загрузки" : "Нет данных"}</div>}

    </MainLayout>
  );
};
