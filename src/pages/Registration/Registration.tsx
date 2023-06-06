
import { FC, useContext, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputText } from "../../components/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormParticipant, IFormRegistr } from "../../types/IForms";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axiosApi"
import { EVENT_ROUTER, REGEXP_EMAIL, REGEXP_PHONE, REGISTRATIONTM_ROUTER } from "../../utils/consts";
import { Context } from "../..";

export const Registration: FC = () => {
  const navigate = useNavigate()
  const { modal } = useContext(Context)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormRegistr>({ mode: "onChange" });
  const { id } = useParams()
  const [data, errorData, loadingData, axiosFetchData] = useAxios();
  const [putResponse, putError, putLoading, putAxiosFetch] = useAxios();

  const onSubmit: SubmitHandler<IFormRegistr> = data => {

    putData(data.fullName, [{ emailAdress: data.email, name: data.fullName, organization: data.organization, phoneNumbers: data.phone, universityCourse: data.course, universityFaculty: data.faculty, coach: true, contact: true, main: true, reserve: false }])
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
    if (putResponse?.TeamListParticipantsData?.length) {
      modal.setIsVisible("Заявка отправлена", false)
      //*navigate("../" + EVENT_ROUTER + "/" + id)
    } else if (putResponse?.EventData?.length) {
      modal.setIsVisible("Заявка не отправлена, максимальное количество команд!", true)
    } else {
      putError.length && modal.setIsVisible("Ошибка отправки!", true)
    }
    // eslint-disable-next-line 
  }, [putResponse, putError])


  return (
    <MainLayout>
      {data && data.EventData.length !== 0 && !loadingData && !putLoading ?
        data.EventData[0].minNumberOfParticipants === 1 && data.EventData[0].maxNumberOfParticipants === 1 ?
          < form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[480px] bg-white rounded-lg shadow-[0px_0px_8px_rgb(215,218,224)] items-center sx:px-10 px-5 py-[15px] sx:py-[30px] gap-[10px] overflow-hidden">
            <div className=" font-bold sx:text-2xl text-xl overflow-hidden text-ellipsis whitespace-nowrap">Регистрация</div>
            <div className=" flex flex-col w-full pb-5">
              <InputText register={register} required="Пожалуйста, укажите ФИО" maxLength={{ value: 100, message: "Превышенно количество букв" }} title="fullName" error={errors.fullName} type="text" name="ФИО" placeholder="ФИО*" />
              <InputText required="Пожалуйста, укажите email" register={register} pattern={{ value: REGEXP_EMAIL, message: "Вы уверены, что это email?" }} maxLength={{ value: 100, message: "Превышенно количество букв" }} title="email" error={errors.email} type="text" name="Email" placeholder="Email*" />
              <InputText register={register} required="Пожалуйста, укажите телефон" pattern={{ value: REGEXP_PHONE, message: "Вы уверены, что это телефон?" }} maxLength={{ value: 60, message: "Превышенно количество букв" }} title="phone" error={errors.phone} type="text" name="Телефон" placeholder="Телефон*" />
              <InputText register={register} required="Пожалуйста, укажите организацию" maxLength={{ value: 100, message: "Превышенно количество букв" }} title="organization" error={errors.organization} type="text" name="Организация" placeholder="Организация*" />
              <InputText register={register} maxLength={{ value: 100, message: "Превышенно количество букв" }} title="faculty" error={errors.faculty} type="text" name="Факультет" placeholder="Факультет" />
              <InputText register={register} maxLength={{ value: 100, message: "Превышенно количество букв" }} title="course" error={errors.course} type="text" name="Курс" placeholder="Курс" />
            </div>
            <input id="button" type="submit" className="button" value="Отправить заявку на участие" />
          </form>
          : <>
            <div className="text-ellipsis text-center mx-5  overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">У соревнования командное участие, нажмите ниже для перехода на нужную форму.</div>
            <Link to={"../" + REGISTRATIONTM_ROUTER + "/" + id} className="text-blue-600 text-ellipsis text-center mx-5  overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">Перейти!</Link>
          </>
        : <div className="text-ellipsis whitespace-nowrap overflow-hidden  text-sm sm:text-base md:text-lg lg:text-xl font-bold">{loadingData || putLoading ? "Загрузка..." : errorData.length !== 0 ? "Ошибка загрузки" : "Нет данных"}</div>}

    </MainLayout >
  );
};
