import React from "react";
import moment from "moment";
import Image from "next/image";
import adProfileImg from "@/public/images/ad-profile-logo.png";
import { usePathname } from "next/navigation";
import { CiCalendar, CiUser, CiCircleList, CiSearch } from "react-icons/ci";
import { getWords, getRemainingWords } from "@/utils";

const CompanyDetails = (props) => {
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname.includes("/dashboard")
          ? "sm:ml-0 sm:mt-5 md:ml-8 md:mt-0 xl:ml-0 xl:mt-5"
          : "sm:mt-0 sm:ml-8 lg:ml-0 lg:mt-5"
      } rounded-2xl shadow-md border p-5 space-y-3 mt-8  text-slate-700 bg-white`}>
      <Image
        src={adProfileImg}
        alt='Ad banner'
        width={"100%"}
        height={"100%"}
        className='rounded-xl bg-white'
      />

      <h2 className='font-semibold sm:text-lg border-b-2 pb-3 pt-2'>
        {props.adData?.ad?.creator.name ?? props.user?.name}
      </h2>

      <p className='text-sm sm:text-base'>
        {getWords(
          props.adData?.ad?.creator.company_description ??
            props.user?.company_description ??
            "",
          20
        )}
      </p>

      <p className='text-sm sm:text-base'>
        {getRemainingWords(
          props.adData?.ad?.creator.company_description ??
            props.user?.company_description ??
            "",
          20
        )}
      </p>

      <div className='flex items-center gap-1 text-sm sm:text-base'>
        <CiCalendar className='text-slate-600 w-4 h-4 mt-0.5' />

        <div className='text-slate-700 font-semibold'>
          В България{" "}
          {" " +
            moment(
              props.adData?.ad?.creator.company_created ??
                props.user?.company_created
            ).year()}
        </div>
      </div>

      <div className='flex items-center gap-1 border-b-2 pb-3 text-sm sm:text-base'>
        <CiUser className='text-slate-600 w-4 h-4 mt-0.5' />

        <div className='text-slate-700 font-semibold'>
          {props.adData?.ad?.creator.company_size ?? props.user?.company_size}{" "}
          служители
        </div>
      </div>

      <div className='flex sm:flex-col md:flex-row text-sm sm:text-base items-center justify-between sm:justify-start md:justify-between text-blue-600 pt-1'>
        <button className='flex items-center gap-1 hover:text-blue-400 transition-all sm:w-full md:w-auto'>
          <CiCircleList className='w-4 h-4 mt-0.5' />
          <div className='font-semibold'>ОБЯВИ ({props.adData?.adCount})</div>
        </button>

        <button className='flex items-center gap-1 hover:text-blue-400 transition-all sm:w-full md:w-auto'>
          <CiSearch className='w-4 h-4 mt-0.5' />
          <div className='font-semibold'>ВИЖ ПРОФИЛА</div>
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
