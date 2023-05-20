import { FC } from "react";

export const CardSponOrg: FC = () => {

    return (
        <div className="flex items-center gap-5">
            <img
                src="/img/1.png"
                alt="event"
                className=" rounded-lg h-[60px] object-cover p-[5px] "
            />
            <div className=" font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg overflow-hidden text-ellipsis">Яргу им. П.Г. Демидоваffffffffffffffffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffff</div>
        </div>
    );
};
