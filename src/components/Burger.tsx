import { FC } from "react";
import { IInfoHeader } from "../types/IInfo";
export const Burger: FC<IInfoHeader> = ({ active, setActive }: IInfoHeader) => {
  return (
    <div
      onClick={() => {
        setActive((prev) => !prev);
      }}
      className={
        active
          ? "burger before:translate-y-[10px] before:rotate-45 after:translate-y-[-10px] after:-rotate-45"
          : "burger"
      }
    >
      <span className={active ? "burgerMidl scale-0" : "burgerMidl"}></span>
    </div>
  );
};
