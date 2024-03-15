import { FiBookmark } from "react-icons/fi";
import { BsBriefcase, BsGeoAlt, BsClock, BsCashStack } from "react-icons/bs";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import companyImg from "@/public/images/up-logo.png";

const AdBox = (props) => {
  return (
    <div className="border rounded-lg shadow w-full p-4 relative z-0 group/button hover:bg-slate-50 transition-all">
      <button className="absolute top-6 right-6 sm:top-3 sm:right-3 border rounded-full p-1.5 group bg-white sm:bg-transparent group-hover/button:border-gray-300 hover:sm:bg-blue-300 hover:sm:border-blue-300 transition-all z-20 active:sm:scale-95">
        <FiBookmark className="w-5 h-5 sm:w-4 sm:h-4 text-slate-500 group-hover:sm:text-white" />
      </button>

      <Link href={`/ad/${props.data._id}`} className="sm:flex">
        <Image
          src={companyImg}
          alt="Picture of the company"
          width={"100%"}
          height={"100%"}
          className="w-full object-cover h-36 sm:w-16 sm:h-16 rounded-lg"
        />

        <div className="sm:ml-3 pt-1.5 sm:pt-0">
          <div className="text-slate-700 font-semibold group-hover/button:text-blue-500 transition-all sm:text-lg">
            {props.data.title}
          </div>

          <div className="flex flex-wrap items-center mt-2 gap-x-3.5 gap-y-1.5">
            <div className="flex font-medium text-slate-500 text-sm gap-x-1">
              <BsBriefcase className="w-[18px] h-[18px] mt-[1px]" />

              {props.data.position}
            </div>

            <div className="flex font-medium text-slate-500 text-sm gap-x-1">
              <BsGeoAlt className="w-[18px] h-[18px] mt-[1px]" />

              {props.data.location}
            </div>

            <div className="flex font-medium text-slate-500 text-sm gap-x-1">
              <BsClock className="w-[18px] h-[18px] mt-[1px]" />

              {props.data.employment_type}
            </div>

            <div className="flex font-medium text-slate-500 text-sm gap-x-1">
              <BsCashStack className="w-[18px] h-[18px] mt-[1px]" />

              {formatCurrency(props.data.salary, 0)}
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-2 sm:mt-3 gap-2">
            <div className="bg-blue-300 text-white rounded-full px-2 py-1 text-center text-xs">
              Опит {props.data.experience} години
            </div>

            <div className="bg-blue-300 text-white rounded-full px-2 py-1 text-center text-xs">
              {props.data.employment}
            </div>

            <div className="bg-blue-300 text-white rounded-full px-2 py-1 text-center text-xs">
              {props.data.category}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdBox;
