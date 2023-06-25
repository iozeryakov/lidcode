import { IInfoParticipant } from "../types/IInfo";

/**
 * Добавляет данные в список участников.
 * 
 * @param {string} type - Тип данных.
 * @param {React.Dispatch<React.SetStateAction<IInfoParticipant[]>>} setParticipants - Функция для обновления состояния участников.
 */
export const addData = (type: string, setParticipants: React.Dispatch<React.SetStateAction<IInfoParticipant[]>>) => {
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