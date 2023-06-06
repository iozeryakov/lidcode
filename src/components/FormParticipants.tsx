import { FC } from "react";
import { InputText } from "./InputText";
import { FormParticipant } from "./FormParticipant";
import { IInfoParticipant } from "../types/IInfo";
import { IInputTeam } from "../types/IInputs";
import { REGEXP_EMAIL, REGEXP_PHONE } from "../utils/consts";
import { addData } from "../utils/addData";



export const FormParticipants: FC<IInputTeam> = ({ register, errors, unregister, watch, children, check, setCheck, min, max, participants, setParticipants }: IInputTeam) => {
  const setData = (info: IInfoParticipant) => {
    setParticipants((prevParticipants) => {
      let updateParticipants = prevParticipants.map((participant) => {
        if (participant.id === info.id) {
          return {
            ...info,
          };
        } else {
          return {
            ...participant,
          };
        }
      });
      const count = [
        updateParticipants.filter((i) => i.contact).length,
        updateParticipants.filter((i) => i.coach).length,
      ];
      updateParticipants = updateParticipants.map((participant) => {
        return {
          ...participant,
          visibleCoach: participant.coach
            ? true
            : count[1]
              ? false
              : participant.contact
                ? false
                : true,
          visibleContact: participant.contact
            ? true
            : count[0]
              ? false
              : participant.coach
                ? false
                : true,
        };
      });
      return updateParticipants;
    });

  };

  const removeData = (id: number) => {
    setParticipants((prevParticipants) => {
      let updateParticipants = prevParticipants.filter(
        (participant) => participant.id !== id
      );
      const count = [
        updateParticipants.filter((i) => i.contact).length,
        updateParticipants.filter((i) => i.coach).length,
      ];
      updateParticipants = updateParticipants.map((participant) => {
        return {
          ...participant,
          visibleCoach: participant.coach
            ? true
            : count[1]
              ? false
              : participant.contact
                ? false
                : true,
          visibleContact: participant.contact
            ? true
            : count[0]
              ? false
              : participant.coach
                ? false
                : true,
        };
      });

      return updateParticipants;
    });
    unregister("participant")
  };


  return (
    <div className="flex flex-col w-full overflow-hidden ">
      <InputText register={register} title="name" required="Пожалуйста, укажите название" maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.name} type="text" name="Название команды" placeholder="Название команды*" />
      {min === 1 && max !== 1 &&
        <div className=" flex items-center gap-5 my-[10px]">
          <label className="standart_text font-medium">
            Больше одного участника:
          </label>
          <input
            type="checkbox"
            id="checkbox"
            checked={check}
            onChange={(e) => {
              setCheck(e.target.checked);
              setParticipants([{
                id: 0,
                reserve: false,
                contact: false,
                coach: false,
                main: true,
                visibleContact: true,
                visibleCoach: true
              }])
              unregister("participant")
            }}
          />
        </div>
      }
      {children}
      {!check ?
        <>
          <label className="standart_text font-roboto">
            Участник: 1
          </label>
          <div className=" flex flex-col pl-[10px] pb-5">
            <InputText register={register} required="Пожалуйста, укажите ФИО" maxLength={{ value: 100, message: "Превышенно количество букв" }} title={"participant[0].name"} error={errors.participant && errors.participant[0]?.name} name="ФИО" placeholder="ФИО*" />
            <InputText register={register} required="Пожалуйста, укажите email" pattern={{ value: REGEXP_EMAIL, message: "Вы уверены, что это email?" }} maxLength={{ value: 100, message: "Превышенно количество букв" }} title={"participant[0].emailAdress"} error={errors.participant && errors.participant[0]?.emailAdress} name="Email" placeholder="Email*" />
            <InputText register={register} required="Пожалуйста, укажите телефон" pattern={{ value: REGEXP_PHONE, message: "Вы уверены, что это телефон?" }} maxLength={{ value: 60, message: "Превышенно количество букв" }} title={"participant[0].phoneNumbers"} error={errors.participant && errors.participant[0]?.phoneNumbers} name="Телефон" placeholder="Телефон*" />
            <InputText register={register} required="Пожалуйста, укажите организацию" maxLength={{ value: 100, message: "Превышенно количество букв" }} title={"participant[0].organization"} error={errors.participant && errors.participant[0]?.organization} name="Организация" placeholder="Организация*" />
            <InputText register={register} title={"participant[0].universityFaculty"} maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.participant && errors.participant[0]?.universityFaculty} name="Факультет" placeholder="Факультет" />
            <InputText register={register} title={"participant[0].universityCourse"} maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.participant && errors.participant[0]?.universityCourse} name="Курс" placeholder="Курс" />
          </div>
        </> :
        <div className=" flex flex-col">
          {participants.map((i, index) => (
            <FormParticipant
              errors={errors}
              watch={watch}
              register={register}
              key={i.id}
              number={index + 1}
              info={i}
              setData={setData}
              removeData={index === 0 ? undefined : removeData}
            />
          ))}
          <div className=" flex flex-row justify-between">
            {participants.filter((i) => i.main).length < max && (
              <button
                type="button"
                id="add_main"
                className="mx-1 flex justify-center items-center  h-min w-min shadow-[0px_0px_8px_rgba(215,218,224,1)] rounded mb-5 cursor-pointer"
                onClick={() => {
                  addData("main", setParticipants);
                }}
              >

                <div className="p-[10px] sx:px-5 overflow-hidden text-ellipsis whitespace-nowrap font-semibold font-roboto text-xs sx:text-base">Добавить участника</div>
              </button>
            )}
            {participants.filter((i) => i.reserve).length < 2 &&
              participants.filter((i) => i.coach || i.contact).length < 2 && (
                <button
                  type="button"
                  id="add_reserve"
                  className=" mx-1 flex justify-center items-center  h-min w-min shadow-[0px_0px_8px_rgba(215,218,224,1)] rounded mb-5 cursor-pointer"
                  onClick={() => {
                    addData("reserve", setParticipants);
                  }}
                >
                  <div className=" p-[10px]  sx:px-5 overflow-hidden text-ellipsis whitespace-nowrap font-semibold font-roboto text-xs sx:text-base ">Добавить резерв</div>
                </button>
              )}
          </div>
        </div>
      }
    </div>
  );
};
