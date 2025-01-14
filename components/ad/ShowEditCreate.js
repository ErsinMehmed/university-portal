"use client";
import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FiBookmark } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { adStore, userStore } from "@/stores/useStore";
import { getWords, getRemainingWords, formatCurrency } from "@/utils";
import adAction from "@/actions/adAction";
import Image from "next/image";
import moment from "moment";
import adBannerImg from "@/public/images/ad-show-banner.png";
import adProfileImg from "@/public/images/ad-profile-logo.png";
import ListItems from "@/components/ad/showEditCreate/ListItem";
import AdDetails from "@/components/ad/showEditCreate/AdDetails";
import CompanyDetails from "@/components/ad/showEditCreate/CompanyDetails";
import EditableBadge from "@/components/ad/showEditCreate/EditableBadge";
import EditableSection from "@/components/ad/showEditCreate/EditableSection";
import Tooltip from "@/components/Tooltip";
import {
  dashboardCategories,
  employmentTypes,
  workPositions,
  buttonColors,
  educationTypes,
  languages,
  employment,
  experience,
} from "@/app/data";
import "moment/locale/bg";

const ShowEditCreate = (props) => {
  const { adDataCreate, setAdDataCreate } = adStore;
  const { user } = userStore;
  const { data: session } = useSession();
  const params = useParams();
  const pathname = usePathname();
  const [activeElement, setActiveElement] = useState(null);
  const [adData, setAdData] = useState(null);
  const [renderSectionData, setRenderSectionData] = useState([
    {
      title: "Търсени умения",
      key: "skills",
      placeholder: "Примерно търсено умение",
      order: adDataCreate.qualification_section_order,
      orderName: "qualification_section_order",
    },
    {
      title: "Изисквания за позицията",
      key: "qualifications",
      placeholder: "Примерно изискване за длъжността",
      order: adDataCreate.skill_section_order,
      orderName: "skill_section_order",
    },
    {
      title: "Предлагаме ти",
      key: "job_benefits",
      placeholder: "Какво предлагате",
      order: adDataCreate.job_benefit_section_order,
      orderName: "job_benefit_section_order",
    },
  ]);
  const inputRef = useRef(null);

  const handleElementClick = (element) => {
    setActiveElement(element);
    removeArrayEmptyValue();
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".editable-element")) {
      setActiveElement(null);
    }
  };

  const removeArrayEmptyValue = () => {
    Object.keys(adData?.ad ?? adDataCreate).forEach((field) => {
      const adValue = adData?.ad;
      const createValue = adDataCreate;
      const fieldValue = adValue ? adValue[field] : createValue[field];

      if (Array.isArray(fieldValue)) {
        const emptyValueIndex = fieldValue.findIndex((value) => value === "");

        if (emptyValueIndex !== -1 && fieldValue.length > 1) {
          const updatedArray = fieldValue.filter((value) => value !== "");
          const updatedData = adValue
            ? { ...adValue, [field]: updatedArray }
            : { ...createValue, [field]: updatedArray };

          adValue
            ? setAdData({ ...adData, ad: updatedData })
            : setAdDataCreate(updatedData);
        }
      }
    });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [activeElement]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = (name, value, index) => {
    if (index !== undefined) {
      const updatedArray = [...(adData?.ad?.[name] ?? adDataCreate[name])];
      updatedArray[index] = value;
    }

    if (index !== undefined) {
      const updatedArray = [...(adData?.ad?.[name] ?? adDataCreate[name])];
      updatedArray[index] = value;

      if (adData?.ad?.[name]) {
        setAdData({
          ...adData,
          ad: {
            ...adData.ad,
            [name]: updatedArray,
          },
        });
      } else {
        setAdDataCreate({ ...adDataCreate, [name]: updatedArray });
      }
    } else {
      if (adData?.ad?.[name]) {
        setAdData({ ...adData?.ad, [name]: value });

        setAdData({
          ...adData,
          ad: {
            ...adData.ad,
            [name]: value,
          },
        });
      } else {
        setAdDataCreate({ ...adDataCreate, [name]: value });
      }
    }
  };

  const renderInputElement = (field, index, align, width) => {
    return (
      <input
        ref={inputRef}
        value={
          index || index === 0
            ? adData?.ad[field][index] ?? adDataCreate[field][index]
            : adData?.ad[field] ?? adDataCreate[field]
        }
        onChange={(event) => {
          handleInputChange(
            field,
            event.target.value,
            index || index === 0 ? index : undefined
          );
        }}
        className={`text-${
          align ?? "left"
        } focus:outline-none border border-slate-100 shadow-lg rounded-lg px-2 w-${
          width ?? "full"
        } ${!width && !align && "mr-20"} py-0 editable-element`}
      />
    );
  };

  const renderTextareaElement = (field) => {
    return (
      <textarea
        ref={inputRef}
        value={adData?.ad[field] ?? adDataCreate[field]}
        onChange={(event) => handleInputChange(field, event.target.value)}
        className={`focus:outline-none border border-slate-100 shadow-lg rounded-lg w-full editable-element h-60 sm:h-44 md:h-40 lg:h-36 xl:h-32 resize-none p-1.5`}
      />
    );
  };

  const renderSection = (title, key, placeholder, order) => {
    const isFirst = order === 1;
    const isLast =
      order === Math.max(...renderSectionData.map((section) => section.order));

    const updateAdDataCreate = () => {
      const updatedAdDataCreate = { ...adDataCreate };

      renderSectionData.forEach((section) => {
        updatedAdDataCreate[section.orderName] = section.order;
      });

      setAdDataCreate(updatedAdDataCreate);
    };

    const handleArrowClick = (direction) => {
      const sections = [...renderSectionData];
      const index = sections.findIndex((section) => section.key === key);

      if (direction === "up" && index > 0) {
        sections[index].order = sections[index - 1].order;
        sections[index - 1].order = order;
      } else if (direction === "down" && index < sections.length - 1) {
        sections[index].order = sections[index + 1].order;
        sections[index + 1].order = order;
      }

      updateAdDataCreate();

      if (props.editable && pathname.includes("/edit")) {
        const updatedAdDataCreate = { ...adData };

        renderSectionData.forEach((section) => {
          updatedAdDataCreate.ad[section.orderName] = section.order;
        });

        setAdData(updatedAdDataCreate);
      }
    };

    return (
      <div key={key}>
        {props.editable ? (
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-xl sm:text-2xl text-slate-700 mb-2.5 mt-10 sm:mt-12 px-6 sm:px-12'>
              {title}
            </h2>

            {isFirst && (
              <button
                className='rounded-full p-1.5 bg-white border hover:bg-slate-50 transition-all active:scale-95 mt-9 mr-12'
                onClick={() => handleArrowClick("down")}>
                <IoIosArrowDown className='w-5 h-5' />
              </button>
            )}

            {!isFirst && !isLast && (
              <div>
                <div>
                  <button
                    className='rounded-full p-1.5 bg-white border hover:bg-slate-50 transition-all active:scale-95 mt-9 mr-12'
                    onClick={() => handleArrowClick("up")}>
                    <IoIosArrowUp className='w-5 h-5' />
                  </button>
                </div>
                <button
                  className='rounded-full p-1.5 bg-white border hover:bg-slate-50 transition-all active:scale-95 mt-2 mr-12'
                  onClick={() => handleArrowClick("down")}>
                  <IoIosArrowDown className='w-5 h-5' />
                </button>
              </div>
            )}

            {isLast && (
              <button
                className='rounded-full p-1.5 bg-white border hover:bg-slate-50 transition-all active:scale-95 mt-9 mr-12'
                onClick={() => handleArrowClick("up")}>
                <IoIosArrowUp className='w-5 h-5' />
              </button>
            )}
          </div>
        ) : (
          <h2 className='font-semibold text-xl sm:text-2xl text-slate-700 mb-2.5 mt-10 sm:mt-12 px-6 sm:px-12'>
            {title}
          </h2>
        )}

        {props.editable ? (
          <EditableSection
            adData={adData}
            adDataCreate={adDataCreate}
            fieldName={key}
            text={placeholder}
            setAdDataCreate={setAdDataCreate}
            setAdData={setAdData}
            removeArrayEmptyValue={removeArrayEmptyValue}
            renderInputElement={renderInputElement}
            handleElementClick={handleElementClick}
            activeElement={activeElement}
          />
        ) : (
          <ListItems items={adData?.ad?.[key]} />
        )}
      </div>
    );
  };

  useEffect(() => {
    if ((props.editable && params.id) || params.id) {
      const fetchData = async () => {
        const data = await adAction.getAd(params.id);
        setAdData(data);
        if (data) {
          setRenderSectionData((prevRenderSectionData) => {
            return prevRenderSectionData.map((section) => {
              return {
                ...section,
                order: data.ad[section.orderName],
              };
            });
          });
        }
      };

      fetchData();
    }
  }, [params.id, props.editable]);

  const handleLanguageClick = (language) => {
    const languageIndex =
      adData?.ad?.languages ?? adDataCreate.languages.indexOf(language);

    if (adData?.ad?.languages) {
      if (adData?.ad?.languages.includes(language)) {
        if (adData?.ad?.languages.length > 1) {
          const updatedLanguages = adData?.ad?.languages.filter(
            (lang) => lang !== language
          );

          setAdData((prevState) => ({
            ...prevState,
            ad: {
              ...prevState.ad,
              languages: updatedLanguages,
            },
          }));
        }
      } else {
        const updatedLanguages = [...adData?.ad?.languages, language];

        setAdData((prevState) => ({
          ...prevState,
          ad: {
            ...prevState.ad,
            languages: updatedLanguages,
          },
        }));
      }
    } else {
      if (adDataCreate.languages.includes(language)) {
        if (adDataCreate.languages.length > 1) {
          adDataCreate.languages.splice(languageIndex, 1);
        }
      } else {
        adDataCreate.languages.push(language);
      }
    }
  };

  return (
    <div
      className={`w-full ${
        pathname.includes("/dashboard") && "mt-16"
      } max-w-screen-xl 2xl:max-w-screen-2xl mx-auto relative`}>
      <Link
        href={pathname.includes("/dashboard") ? "/dashboard/ads" : "/find-job"}
        className='flex items-center pl-4 2xl:pl-5 pt-8 text-blue-600 font-semibold hover:ml-1.5 hover:text-blue-400 transition-all w-fit'>
        <HiOutlineArrowLeft className='mt-0.5 mr-1 w-5 h-5' />
        {pathname.includes("/dashboard")
          ? "Към всички обяви"
          : "Виж всички обяви"}
      </Link>

      <div
        className={`w-full px-4 2xl:px-5 pb-10 pt-8 ${
          pathname.includes("/dashboard") ? "xl:flex-row" : "lg:flex-row"
        } flex flex-col-reverse gap-8 relative`}>
        <div className='rounded-2xl shadow-md border pb-10 bg-white'>
          <Image
            src={adBannerImg}
            alt='Ad banner'
            width={"100%"}
            height={"100%"}
            className='rounded-t-2xl h-48'
          />

          <div className='flex justify-center rounded-xl -mt-12'>
            <Image
              src={adProfileImg}
              alt='Ad banner'
              width={"100%"}
              height={"100%"}
              className='rounded-xl h-24 w-24 p-1 bg-white'
            />
          </div>

          <h2
            className={`font-semibold text-2xl sm:text-4xl text-center text-slate-700 mt-7 ${
              activeElement !== "title" && "mb-1.5"
            } ${props.editable && "cursor-pointer"}`}
            onClick={() => handleElementClick("title")}>
            {props.editable
              ? activeElement === "title"
                ? renderInputElement("title", undefined, "center")
                : adData?.ad?.title ?? adDataCreate.title
              : adData?.ad?.title ?? ""}
          </h2>

          <div className='flex flex-wrap justify-center mt-1.4 sm:mt-2.5 space-x-1 sm:space-x-2'>
            <EditableBadge
              editable={props.editable}
              editCreateValue={adData?.ad?.category ?? adDataCreate.category}
              badgeColor={adData?.ad?.badge_color ?? adDataCreate.badge_color}
              setAdData={setAdData}
              adData={adData}
              onChange={(value) => handleInputChange("category", value)}
              items={dashboardCategories}
              value={adData?.ad?.category ?? adDataCreate.category}
              label='Избери категория'
              text={adData?.ad?.category}
            />

            <EditableBadge
              editable={props.editable}
              editCreateValue={adData?.ad?.position ?? adDataCreate.position}
              badgeColor={adData?.ad?.badge_color ?? adDataCreate.badge_color}
              setAdData={setAdData}
              adData={adData}
              onChange={(value) => handleInputChange("position", value)}
              items={workPositions}
              value={adData?.ad?.position ?? adDataCreate.position}
              label='Избери длъжност'
              text={adData?.ad?.position}
            />

            <EditableBadge
              editable={props.editable}
              editCreateValue={
                adData?.ad?.employment_type ?? adDataCreate.employment_type
              }
              badgeColor={adData?.ad?.badge_color ?? adDataCreate.badge_color}
              setAdData={setAdData}
              adData={adData}
              onChange={(value) => handleInputChange("employment_type", value)}
              items={employmentTypes}
              value={
                adData?.ad?.employment_type ?? adDataCreate.employment_type
              }
              label='Избери тип заетост'
              text={adData?.ad?.employment_type}
            />
          </div>

          <div className='px-6 sm:px-12 py-10'>
            <div className='border-b-2 border-gray-200' />
          </div>

          <div className='sm:flex justify-between items-center px-6 sm:px-12'>
            <h2 className='font-semibold text-xl sm:text-2xl text-center text-slate-700 mb-1.5'>
              Описание
            </h2>

            <h2 className='font-semibold text-sm sm:text-base text-center text-slate-700 mb-1.5'>
              Публикувано на
              <span className='text-slate-500'>
                {" "}
                {props.editable
                  ? moment().locale("bg").format("D MMMM YYYY")
                  : moment(adData?.ad?.updatedAt)
                      .locale("bg")
                      .format("D MMMM YYYY")}
              </span>
            </h2>
          </div>

          {props.editable ? (
            <div
              className='px-6 sm:px-12 text-slate-600 mt-5 text-justify sm:text-left cursor-pointer'
              onClick={() => handleElementClick("details")}>
              {activeElement === "details"
                ? renderTextareaElement("details")
                : adData?.ad.details ?? adDataCreate.details}
            </div>
          ) : (
            <>
              <div className='px-6 sm:px-12 text-slate-600 mt-5 text-justify sm:text-left'>
                {getWords(adData?.ad.details ?? "", 40)}
              </div>

              <div className='px-6 sm:px-12 text-slate-600 mt-3 text-justify sm:text-left'>
                {getRemainingWords(adData?.ad.details ?? "", 40)}
              </div>
            </>
          )}

          <div>
            <div>
              {renderSectionData
                ?.sort((a, b) => a.order - b.order)
                .map((section) =>
                  renderSection(
                    section.title,
                    section.key,
                    section.placeholder,
                    section.order
                  )
                )}
            </div>
          </div>

          <div className='flex gap-2 mt-8 px-6 sm:px-20 lg:hidden'>
            <button
              type='button'
              className='bg-blue-500 text-white py-2 rounded-full w-full transition-all hover:bg-[#1967d2] font-semibold active:scale-95'>
              Кандидатствай
            </button>

            {session?.user && (
              <button className='bg-[#e2eaf8] rounded-full p-2.5 text-blue-500 hover:text-white hover:bg-blue-500 transition-all lg:hover:scale-110'>
                <FiBookmark className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>

        <div>
          <div
            className={`grid ${
              pathname.includes("/dashboard")
                ? "sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:w-96"
                : "lg:grid-cols-1 lg:w-96"
            } sm:grid-cols-2 lg:sticky w-full ${
              pathname.includes("/edit") || pathname.includes("/create")
                ? "top-20"
                : "top-24"
            }`}>
            <div
              className={`hidden gap-2 mb-3.5 ${
                pathname.includes("/dashboard") ? "xl:flex" : "lg:flex"
              }`}>
              {props.editable ? (
                <Tooltip
                  width='w-56'
                  buttonWidth='w-full'
                  space='11'
                  buttonChild={
                    <div
                      className={`${
                        adData?.ad?.apply_button_color ??
                        adDataCreate.apply_button_color
                      } text-white py-2 rounded-full w-full text-center transition-all font-semibold cursor-pointer`}>
                      Кандидатствай
                    </div>
                  }
                  position='bottom'>
                  <div className='text-slate-600 font-semibold mb-1.5'>
                    Избери цвят:
                  </div>

                  <div className='w-full grid grid-cols-4 gap-2'>
                    {buttonColors.map((color, index) => (
                      <div
                        key={index}
                        className={`h-10 w-10 rounded-full shodow-lg transition-all cursor-pointer ${color} flex items-center justify-center`}
                        onClick={() => {
                          if (adData?.ad) {
                            setAdData({
                              ...adData,
                              ad: {
                                ...adData.ad,
                                apply_button_color: color,
                              },
                            });
                          } else {
                            setAdDataCreate({
                              ...adDataCreate,
                              apply_button_color: color,
                            });
                          }
                        }}>
                        {(adData?.ad?.apply_button_color ??
                          adDataCreate.apply_button_color) === color && (
                          <FaCheck className='w-5 h-5' />
                        )}
                      </div>
                    ))}
                  </div>
                </Tooltip>
              ) : (
                <button
                  type='button'
                  className={`${
                    adData?.ad?.apply_button_color ??
                    adDataCreate.apply_button_color
                  } text-white py-2 rounded-full w-full transition-all font-semibold`}>
                  Кандидатствай
                </button>
              )}

              {session?.user && (
                <button className='bg-[#e2eaf8] rounded-full p-2.5 text-blue-500 hover:text-white hover:bg-blue-500 transition-all active:scale-95'>
                  <FiBookmark className='w-5 h-5' />
                </button>
              )}
            </div>

            <AdDetails
              adData={adData}
              adDataCreate={adDataCreate}
              handleElementClick={handleElementClick}
              renderInputElement={renderInputElement}
              handleLanguageClick={handleLanguageClick}
              handleInputChange={handleInputChange}
              formatCurrency={formatCurrency}
              languages={languages}
              educationTypes={educationTypes}
              experience={experience}
              employment={employment}
              activeElement={activeElement}
              editable={props.editable}
            />

            <CompanyDetails
              adData={adData}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ShowEditCreate);
