import { FC, useEffect } from "react";
import { InputText } from "./InputText";
import { IInputParticipant } from "../types/IInputs";
import { REGEXP_EMAIL, REGEXP_PHONE } from "../utils/consts";
export const FormParticipant: FC<IInputParticipant> = ({
  number,
  info,
  setData,
  removeData,
  register, watch, errors
}: IInputParticipant) => {
  const coach = watch("participant[" + (number - 1) + "].coach")
  const contact = watch("participant[" + (number - 1) + "].contact")

  useEffect(() => {
    setData({ ...info, contact: contact, coach: coach })
    // eslint-disable-next-line 
  }, [coach, contact])


  return (
    <>
      <div className="flex flex-row justify-between">
        <label className="standart_text font-roboto">
          Участник {number}:
        </label>
        {removeData && (
          <img
            src="/img/close.svg"
            id={"close_" + (number - 1)}
            alt="close"
            className=" cursor-pointer w-[25px] h-[25px] m-[5px]  hover:w-[27px] hover:h-[27px] hover:m-[4px]"
            onClick={() => removeData(info.id)}
          />
        )}
      </div>
      <input
        type="checkbox"
        id="scales"
        className=" hidden"
        checked={info.main}
        {...register("participant[" + (number - 1) + "].main")}
      />
      <input
        type="checkbox"
        id="scales"
        className=" hidden"
        checked={info.reserve}
        {...register("participant[" + (number - 1) + "].reserve")}
      />
      {info.reserve && !info.visibleCoach && !info.visibleContact && (
        <label className="error_valid">
          Участник в резерве должен быть или контакным лицом или тренером
        </label>
      )}

      <div className="flex pl-[10px] items-center">
        <label className="not-standart_text font-medium  ">
          {info.main ? "Основной состав команды" : "Резерв"}
        </label>
      </div>
      <div
        className={info.visibleContact ? "flex gap-5 items-center" : "hidden"}
      >
        <input
          id={"participant[" + (number - 1) + "].contact"}
          type="checkbox"

          className=" h-4 w-4 sx:h-5 sx:w-5"

          {...register("participant[" + (number - 1) + "].contact")}
        />
        <label className="not-standart_text ">
          Контактное лицо
        </label>
      </div>
      <div className={info.visibleCoach ? "flex gap-5 items-center" : "hidden"}>
        <input
          type="checkbox"
          id={"participant[" + (number - 1) + "].coach"}
          className=" h-4 w-4 sx:h-5 sx:w-5"
          {...register("participant[" + (number - 1) + "].coach")}
        />
        <label className="not-standart_text">
          Тренер
        </label>
      </div>

      <div className=" flex flex-col pl-[10px] pb-5">
        <InputText register={register} required="Пожалуйста, укажите ФИО" maxLength={{ value: 100, message: "Превышенно количество букв" }} title={"participant[" + (number - 1) + "].name"} error={errors.participant && errors.participant[number - 1]?.name} name="ФИО" placeholder="ФИО*" />
        <InputText register={register} required="Пожалуйста, укажите email" pattern={{ value: REGEXP_EMAIL, message: "Вы уверены, что это email?" }} maxLength={{ value: 100, message: "Превышенно количество букв" }} title={"participant[" + (number - 1) + "].emailAdress"} error={errors.participant && errors.participant[number - 1]?.emailAdress} name="Email" placeholder="Email*" />
        <InputText register={register} required="Пожалуйста, укажите телефон" pattern={{ value: REGEXP_PHONE, message: "Вы уверены, что это телефон?" }} maxLength={{ value: 60, message: "Превышенно количество букв" }} title={"participant[" + (number - 1) + "].phoneNumbers"} error={errors.participant && errors.participant[number - 1]?.phoneNumbers} name="Телефон" placeholder="Телефон*" />
        <InputText register={register} required="Пожалуйста, укажите организацию" maxLength={{ value: 100, message: "Превышенно количество букв" }} title={"participant[" + (number - 1) + "].organization"} error={errors.participant && errors.participant[number - 1]?.organization} name="Организация" placeholder="Организация*" />
        <InputText register={register} title={"participant[" + (number - 1) + "].universityFaculty"} maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.participant && errors.participant[number - 1]?.universityFaculty} name="Факультет" placeholder="Факультет" />
        <InputText register={register} title={"participant[" + (number - 1) + "].universityCourse"} maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.participant && errors.participant[number - 1]?.universityCourse} name="Курс" placeholder="Курс" />
      </div>
    </>
  );
};
