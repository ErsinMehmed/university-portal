import React from "react";
import {
  CiLocationOn,
  CiMicrophoneOn,
  CiSettings,
  CiTimer,
  CiClock2,
  CiUmbrella,
  CiDollar,
} from "react-icons/ci";
import Tooltip from "@/components/Tooltip";
import Select from "@/components/html/Select";

const AdDetails = (props) => {
  const {
    adData,
    adDataCreate,
    handleElementClick,
    renderInputElement,
    handleLanguageClick,
    handleInputChange,
    formatCurrency,
    languages,
    educationTypes,
    experience,
    employment,
    activeElement,
  } = props;

  return (
    <div className='rounded-2xl shadow-md border p-5 space-y-3 bg-white'>
      <h2 className='font-semibold text-lg text-slate-700 border-b-2 pb-2.5'>
        ДЕТАЙЛИ
      </h2>

      {props.editable ? (
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => handleElementClick("location")}>
          <CiLocationOn className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {activeElement === "location"
              ? renderInputElement("location", undefined, "left", 56)
              : adData?.ad?.location ?? adDataCreate.location}
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <CiLocationOn className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {adData?.ad?.location}
          </div>
        </div>
      )}

      {props.editable ? (
        <div>
          <Tooltip
            width='w-64'
            buttonChild={
              <div className='flex items-center gap-1'>
                <CiMicrophoneOn className='text-slate-600 w-5 h-5 mt-0.5' />

                <div className='text-slate-700 font-semibold'>
                  {(adData?.ad?.languages ?? adDataCreate.languages).map(
                    (language, index, array) => (
                      <span key={index}>
                        {index === 0 ? "" : " "}
                        {language}
                        {index !== array.length - 1 && array.length > 1 && ","}
                      </span>
                    )
                  )}
                </div>
              </div>
            }
            position='bottom'>
            <div className='text-slate-600 font-semibold mb-1.5'>
              Избери еизици:
            </div>

            <div className='flex gap-1.5 flex-wrap'>
              {languages.map((language, index) => (
                <span
                  className={`shadow-lg rounded-lg border border-slate-200 p-1.5 text-sm cursor-pointer transition-all active:scale-95 ${
                    (adData?.ad?.languages ?? adDataCreate.languages).includes(
                      language
                    )
                      ? "bg-blue-300 hover:bg-blue-400 text-white"
                      : "bg-white hover:bg-blue-300 hover:text-white text-slate-600"
                  }`}
                  key={index}
                  onClick={() => handleLanguageClick(language)}>
                  {language}
                </span>
              ))}
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <CiMicrophoneOn className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {adData?.ad?.languages &&
              adData?.ad.languages.map((language, index) => (
                <span key={index}>
                  {index === 0 ? "" : " "}
                  {language}
                  {index !== adData?.ad.languages.length - 1 &&
                    adData?.ad.languages.length > 1 &&
                    ","}
                </span>
              ))}
          </div>
        </div>
      )}

      {props.editable ? (
        <Tooltip
          width='w-64'
          buttonChild={
            <div className='flex items-center gap-1 cursor-pointer'>
              <CiSettings className='text-slate-600 w-5 h-5 mt-0.5' />

              <div className='text-slate-700 font-semibold'>
                {adData?.ad?.education_requirements ??
                  adDataCreate.education_requirements}
              </div>
            </div>
          }
          position='bottom'>
          <div className='text-slate-600 font-semibold mb-1.5'>
            Избери образование:
          </div>

          <Select
            items={educationTypes}
            label='Избери образование'
            value={
              adData?.ad?.education_requirements ??
              adDataCreate.education_requirements
            }
            onChange={(value) =>
              handleInputChange("education_requirements", value)
            }
          />
        </Tooltip>
      ) : (
        <div className='flex items-center gap-1'>
          <CiSettings className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {adData?.ad?.education_requirements}
          </div>
        </div>
      )}

      {props.editable ? (
        <div>
          <Tooltip
            width='w-64'
            buttonChild={
              <div className='flex items-center gap-1 cursor-pointer'>
                <CiTimer className='text-slate-600 w-5 h-5 mt-0.5' />

                <div className='text-slate-700 font-semibold'>
                  Години опит{" "}
                  {adData?.ad?.experience ?? adDataCreate.experience}
                </div>
              </div>
            }
            position='bottom'>
            <div className='text-slate-600 font-semibold mb-1.5'>
              Избери години опит:
            </div>

            <Select
              items={experience}
              label='Избери годни опит'
              value={(adData?.ad?.experience || "") ?? adDataCreate.experience}
              onChange={(value) => handleInputChange("experience", value)}
            />
          </Tooltip>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <CiTimer className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            Години опит {adData?.ad?.experience}
          </div>
        </div>
      )}

      {props.editable ? (
        <Tooltip
          width='w-64'
          buttonChild={
            <div className='flex items-center gap-1 cursor-pointer'>
              <CiClock2 className='text-slate-600 w-5 h-5 mt-0.5' />

              <div className='text-slate-700 font-semibold'>
                {adData?.ad?.employment ?? adDataCreate.employment}
              </div>
            </div>
          }
          position='bottom'>
          <div className='text-slate-600 font-semibold mb-1.5'>
            Избери работно време:
          </div>

          <Select
            items={employment}
            label='Избери работно време'
            value={adDataCreate.employment || ""}
            onChange={(value) => handleInputChange("employment", value)}
          />
        </Tooltip>
      ) : (
        <div className='flex items-center gap-1'>
          <CiClock2 className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {adData?.ad?.employment}
          </div>
        </div>
      )}

      {props.editable ? (
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => handleElementClick("paid_leave")}>
          <CiUmbrella className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {activeElement === "paid_leave"
              ? renderInputElement("paid_leave", undefined, "center", 10)
              : `Отпуска: ${
                  adData?.ad?.paid_leave ?? adDataCreate.paid_leave
                } дни`}
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <CiUmbrella className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            Отпуска: {adData?.ad?.paid_leave} дни
          </div>
        </div>
      )}

      {props.editable ? (
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => handleElementClick("salary")}>
          <CiDollar className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            {activeElement === "salary"
              ? renderInputElement("salary", undefined, "center", 20)
              : `Заплата: ${formatCurrency(
                  adData?.ad?.salary ?? adDataCreate.salary,
                  0
                )}`}
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <CiDollar className='text-slate-600 w-5 h-5 mt-0.5' />

          <div className='text-slate-700 font-semibold'>
            Заплата: {formatCurrency(adData?.ad?.salary, 0)}
          </div>
        </div>
      )}

      <h2 className='font-semibold text-lg text-slate-700'>Меки умения</h2>

      <div className='flex flex-wrap gap-2'>
        {adData?.ad?.soft_skills &&
          adData?.ad.soft_skills.map((skill, index) => (
            <div
              key={index}
              className='rounded-xl px-2 py-0.5 bg-blue-300 text-white text-sm'>
              {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdDetails;
