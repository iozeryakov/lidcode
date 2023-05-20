import { FC, useState } from "react";
import { IInputFile } from "../types/IInputs";
import { dragLeaveHandler, dragStartHandler } from "../utils/dragAndDrop";

export const InputFile: FC<IInputFile> = ({ name, register, title, watch, setValue }: IInputFile) => {
  const file = watch(title, false)
  const [drag, setDrag] = useState(false)

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setValue(title, e.dataTransfer.files)
    setDrag(false)
  }

  return (
    <div className="flex flex-col pb-[5px]">
      <label className="standart_text font-normal font-roboto">{name}</label>
      <div
        onDragStart={(e) => dragStartHandler(e, setDrag)}
        onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
        onDragOver={(e) => dragStartHandler(e, setDrag)}
        onDrop={(e) => onDropHandler(e)}
        className={drag ? "flex mt-[5px] flex-col border-dashed border-4 border-[#D7DAE0] rounded " : "flex mt-[5px] flex-col"}>
        <label
          htmlFor={title}
          className="cursor-pointer font-roboto font-light sm:text-base text-sm flex flex-row items-center"
        >
          <div className="h-[50px] w-[50px] mr-[15px] sx:mr-[30px]">
            <img
              src="/img/inputfile.svg"
              alt="input"
              className="h-12 w-12 transition-all ease-in duration-300 p-[1px] hover:p-0 hover:h-[50px] hover:w-[50px]"
            />
          </div>
          {drag ? "Отпустите файл" :
            file && file[0]
              ? file[0].name.length <= 25
                ? file[0].name
                : "..." +
                file[0].name.substring(file[0].name.length - 22, file[0].name.length)
              : "Нажмите, чтобы выбрать файл или перетащите"}
        </label>
        <input
          id={title}
          className=" opacity-0 invisible absolute max-w-0"
          type="file"
          {...register(title)}
        />
      </div>
    </div>
  );
};
