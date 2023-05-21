import { FC, useEffect, useState } from "react";
import { IInputImg } from "../types/IInputs";
import { dragLeaveHandler, dragStartHandler } from "../utils/dragAndDrop";

export const InputImg: FC<IInputImg> = ({ name, register, watch, title, setValue }: IInputImg) => {
  const image = watch(title, false)
  const [drag, setDrag] = useState(false)
  const [error, setError] = useState("")
  const [imageURL, setImageURL] = useState<string>("");


  const onDropHandler=(e: React.DragEvent<HTMLDivElement>)=> {
    setError("");
    e.preventDefault()
    if (e.dataTransfer.files[0].type.includes("image")) { setValue(title, e.dataTransfer.files) }
    else {
      setImageURL("")
      setValue(title, {})
      setError("Фаил не является изображением!");
    }
    setDrag(false)
  }

  useEffect(() => {
    if (image && image[0]) {
      if (image[0].type.includes("image")) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const imageNew = new Image();
          imageNew.onload = () => {
            setImageURL(imageNew.src);
            if (imageNew.width === imageNew.height && title === "imgD") {
              setError("");
            } else if (imageNew.width <= imageNew.height && title === "imgV") {
              setError("");
            } else if (imageNew.width >= imageNew.height && title === "imgH") {
              setError("");
            } else {
              setError("Вы уверены,что логотип нужного размера?");
            }
          };
          if (typeof fileReader.result === "string") {
            imageNew.src = fileReader.result;
          }
        };
        fileReader.readAsDataURL(image[0]);
      } else {
        setImageURL("")
        setValue(title, {})
        setError("Фаил не является изображением!");

      }

    } else { setImageURL("") }
  }, [image, title])


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
              src="/img/inputlogo.svg"
              alt="input"
              className="h-12 w-12 transition-all ease-in duration-300 p-[1px] hover:p-0 hover:h-[50px] hover:w-[50px]"
            />
          </div>
          {drag ? "Отпустите файл"
            : (image && image[0])
              ? image[0].name.length <= 25
                ? image[0].name
                : "..." +
                image[0].name.substring(image[0].name.length - 22, image[0].name.length)
              : "Нажмите, чтобы выбрать файл или перетащите"}
        </label>

        <input
          id={title}
          className=" opacity-0 invisible absolute max-w-0"
          type="file"
          {...register(title)}
        />
      </div>
      {imageURL && (
        <>
          <div className=" max-w-min max-h-min mt-[5px]  shadow-[0px_0px_8px_rgba(215,218,224,1)] relative">
            <img
              src={imageURL}
              alt="logo"
              className="max-w-[250px] max-h-[250px]"
            />
            <img
              className=" cursor-pointer w-[25px] h-[25px] m-[5px] absolute z-50 top-0 right-0 hover:w-[27px] hover:h-[27px] hover:m-[4px]"
              src="/img/close.svg"
              alt="close"
              onClick={() => {
                setValue(title, {})
                setError("")
                setImageURL("");
              }}
            />
          </div>
        </>
      )}
      {error && (
        <label className="error_valid">{error}</label>
      )}
    </div>
  );
};