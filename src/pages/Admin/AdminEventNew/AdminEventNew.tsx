import { FC, useContext, useEffect, useState, } from "react";
import { PanelAdd } from "../../../components/PanelAdd";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormEvent } from "../../../types/IForms";
import { FormEvent } from "../../../components/FormEvent";
import { $authHost } from "../../../api/axiosApi"
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { Loading } from "../../../components/Loading";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

/**
 * Компонент, отображающий страницу для добавления нового соревнования.
 *
 * @returns {JSX.Element} - Компонент, отображающий страницу для добавления нового соревнования.
 */
export const AdminEventNew: FC = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const { modal, user } = useContext(Context)
  const [active, setActive] = useState("1")
  const [base64, setBase64] = useState({ imgD: "", imgH: "", imgV: "" })
  const [response, error, loading, axiosFetch] = useAxios();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormEvent>({ mode: "onChange", defaultValues: { maxTeam: 1, minParticipant: 1, maxParticipant: 1 } });

  /**
   * Отправляет данные формы на сервер
   * @param name Название 
   * @param status Статус соревнования
   * @param maxNumberOfParticipants Максимальное кол-во команд
   * @param maxNumberOfTeam Максимальное ко-во участников в команде
   * @param minNumberOfParticipants Минимальное кол-во участников в команде
   * @param description Описание
   * @param regulations Правила
   * @param dateCloseRegister Дата и время  закрытия регистрации
   * @param dateEnd Дата и время окончания соревнования
   * @param dateRegister Дата и время начала регистрации
   * @param dateStart Дата и время старта соревнований
   * @param timePublicationAdditionalMaterial Дата и время публикации материалов
   * @param imageDef Изображение по умолчанию
   * @param imageHor Изображение горизонтальное
   * @param imageVer Изображение вертикальное
   */
  const postData = (status: string, name: string, maxNumberOfTeam: number, minNumberOfParticipants: number, maxNumberOfParticipants: number, description: string, regulations: string, dateRegister: string, dateCloseRegister: string, dateStart: string, dateEnd: string, timePublicationAdditionalMaterial: string, imageDef?: string, imageHor?: string, imageVer?: string) => {
    axiosFetch({
      axiosInstance: $authHost,
      method: "post",
      url: "api/v1/events/",
      requestConfig: { "EventData": { status: status, name: name, maxNumberOfTeam: maxNumberOfTeam, minNumberOfParticipants: minNumberOfParticipants, maxNumberOfParticipants: maxNumberOfParticipants, description: description, regulations: regulations, imageDef: imageDef, imageHor: imageHor, imageVer: imageVer, dateRegister: dateRegister, dateCloseRegister: dateCloseRegister, dateStart: dateStart, dateEnd: dateEnd, timePublicationAdditionalMaterial: timePublicationAdditionalMaterial } }
    });
  }

  /**
   * Обработчик отправки формы 
   * @param data Данные формы 
   */
  const onSubmit: SubmitHandler<IFormEvent> = data => {
    if (data.minParticipant <= data.maxParticipant) {
      if (data.dateOpen <= data.dateClose && data.dateClose <= data.dateStart && data.dateStart <= data.dateEnd) {
        postData(active, data.title, data.maxTeam, data.minParticipant, data.maxParticipant, data.description, data.rules, data.dateOpen.toString(), data.dateClose.toString(), data.dateStart.toString(), data.dateEnd.toString(), data.dateMaterial.toString(), base64.imgD, base64.imgH, base64.imgV)
      }
      else {
        modal.setIsVisible("Даты должны бать расположены в порядке возрастания!", true)
      }
    } else {
      modal.setIsVisible("Минимальное количесво участников не может быть больше максимального!", true)
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
    <AdminLayout handleSubmit={handleSubmit} onSubmit={onSubmit} name="Добавить соревнование">
      <PanelAdd loading={loading} error={false} />
      {loading ?
        <Loading loading={loading} error={error.length !== 0} />
        :
        <div className="wrapper">
          <FormEvent register={register} watch={watch} setValue={setValue} errors={errors} active={active} setActive={setActive} setBase64={setBase64} />
        </div>
      }
    </AdminLayout>);
});
