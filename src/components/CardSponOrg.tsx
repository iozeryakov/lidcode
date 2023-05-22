import { FC } from "react";
import { Link } from "react-router-dom";
interface IP {
    id: string
}
export const CardSponOrg: FC<IP> = ({ id }: IP) => {

    return (
        <div className="flex items-center gap-5">
            <img
                src="/img/1.png"
                alt="event"
                className=" rounded-lg h-[60px] object-cover p-[5px] "
            />
            <Link to="#" id={id} className=" cursor-pointer font-roboto font-normal md:text-xl text-sm sx:text-base sm:text-lg overflow-hidden text-ellipsis whitespace-nowrap">Яргу им. П.Г. Демидоваffffffffffffffffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffff</Link>
        </div>
    );
};
