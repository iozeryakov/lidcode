import { FC, useEffect, useRef } from "react";
import { IInfoHeader } from "../types/IInfo";
export const Burger: FC<IInfoHeader> = ({ active, setActive }: IInfoHeader) => {
  const buttonRef = useRef<any>(null)
  useEffect(() => {
    const handleClick = (e: any) => {
      if (buttonRef.current && e.target !== buttonRef.current && e.target !== buttonRef.current.children[0]) {

        setActive(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => { document.removeEventListener("click", handleClick) }
  }, [buttonRef])
  return (
    <div
      ref={buttonRef}
      onClick={() => {
        setActive(prev => !prev)
      }}
      className={
        active
          ? "sm:hidden burger before:translate-y-[10px] before:rotate-45 after:translate-y-[-10px] after:-rotate-45"
          : "sm:hidden burger"
      }
    >
      <span className={active ? "burgerMidl scale-0" : "burgerMidl"}></span>
    </div>
  );
};
