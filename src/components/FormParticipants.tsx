import { FC, useEffect, useState } from "react";
import { InputText } from "./InputText";
import { FormParticipant } from "./FormParticipant";
import { IInfoParticipant } from "../types/IInfo";
import { IInputTeam } from "../types/IInputs";



export const FormParticipants: FC<IInputTeam> = ({ register, errors, unregister, watch }: IInputTeam) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [participants, setParticipants] = useState<IInfoParticipant[]>([]);

  useEffect(() => { setMin(1); setMax(3) }, [])
  useEffect(() => {
    for (let i = 0; i < min; i++) {
      addData("main")
    }
  }, [min])
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
      unregister("participant")
      return updateParticipants;
    });
  };
  const addData = (type: string) => {
    setParticipants((prevParticipants) => {
      const count = [
        prevParticipants.filter((i) => i.contact).length,
        prevParticipants.filter((i) => i.coach).length,
      ];
      return [
        ...prevParticipants,
        {
          id: prevParticipants.length ? prevParticipants[prevParticipants.length - 1].id + 1 : 1,
          reserve: type === "reserve" ? true : false,
          contact: false,
          coach: false,
          main: type === "main" ? true : false,
          visibleContact: count[0] ? false : true,
          visibleCoach: count[1] ? false : true,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col w-full ">
      <InputText register={register} title="name" required="Пожалуйста, укажите название" maxLength={{ value: 100, message: "Превышенно количество букв" }} error={errors.name} type="text" name="Название команды" placeholder="Название команды*" />
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
            removeData={index < min ? undefined : removeData}
          />
        ))}
        <div className=" flex flex-row justify-between">
          {participants.filter((i) => i.main).length < max && (
            <button
              type="button"
              className=" flex justify-center items-center  h-min w-min shadow-[0px_0px_8px_rgba(215,218,224,1)] rounded mb-5 cursor-pointer"
              onClick={() => {
                addData("main");
              }}
            >

              <div className=" p-[10px] sx:px-5 overflow-hidden text-ellipsis whitespace-nowrap font-semibold font-roboto text-xs sx:text-base">Добавить участника</div>
            </button>
          )}
          {participants.filter((i) => i.reserve).length < 2 &&
            participants.filter((i) => i.coach || i.contact).length < 2 && (
              <button
                type="button"
                className=" flex justify-center items-center  h-min w-min shadow-[0px_0px_8px_rgba(215,218,224,1)] rounded mb-5 cursor-pointer"
                onClick={() => {
                  addData("reserve");
                }}
              >
                <div className=" p-[10px]  sx:px-5 overflow-hidden text-ellipsis whitespace-nowrap font-semibold font-roboto text-xs sx:text-base ">Добавить резерв</div>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
