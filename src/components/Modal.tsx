import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "..";

/**
 * Компонент модального окна.
 *
 * @component
 * 
 * @returns {JSX.Element} - Компонент модального окна.
 */
export const Modal: FC = observer(() => {
    const { modal } = useContext(Context)


    return (
        <div onClick={() => modal.otcl()} className={modal.isVisible ? modal.isRed ? "fixed z-50 top-20 right-0 mx-5 flex items-center justify-center  rounded-lg max-w-[300px] overflow-hidden bg-red-600" : " fixed z-50 top-20 right-0 mx-5 flex items-center justify-center bg-green-600 rounded-lg max-w-[300px] overflow-hidden" : "hidden"}>
            <div className=" flex items-start justify-start p-3 overflow-hidden text-white">
                {modal.info}
            </div>
        </div>
    );
});
