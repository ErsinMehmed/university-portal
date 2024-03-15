import { motion } from "framer-motion";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { observer } from "mobx-react-lite";
import { BsBriefcase, BsEnvelope, BsFileEarmarkArrowUp } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { adStore } from "@/stores/useStore";
import Image from "next/image";
import homeBannerImg from "@/public/images/home-banner-img.webp";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const { setAdAdvacedSearchData, adAdvacedSearchData } = adStore;
  const router = useRouter();

  const setAnimation = (duration, delay) => {
    const animationValue = {
      opacity: 1,
      transition: { duration: duration, delay: delay },
    };

    return animationValue;
  };

  const handleInputChange = (name, event) => {
    setAdAdvacedSearchData({
      ...adAdvacedSearchData,
      [name]: event.target.value,
    });
  };

  const handleFindJob = () => {
    router.push("/find-job");
  };

  return (
    <div className="bg-[#f3f7fd] w-full">
      <div className="lg:flex items-center px-10 lg:px-12 xl:px-14 2xl:px-0 w-full max-w-screen-2xl mx-auto pb-16 lg:pb-0 pt-20 lg:pt-12 space-x-10">
        <div className="w-full lg:w-7/12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 1 },
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-slate-700 font-bold font-mono text-center sm:text-left">
              Тук има <span className="text-[#1967d2]">93,178</span> публикации
              за теб!
            </h2>

            <div className="text-slate-400 text-sm font-semibold mt-2.5 text-center sm:text-left">
              Намери Работа, Служители & Възможност за кариера
            </div>

            <div className="lg:bg-white lg:p-5 lg:shadow lg:border border-slate-200 rounded-lg lg:flex items-center lg:space-x-3 mt-8 space-y-5 lg:space-y-0">
              <div className="flex items-center w-full">
                <div className="bg-white lg:bg-transparent py-3 sm:py-5 lg:py-0 rounded-l-lg pl-4 lg:pl-0 border border-gray-200 border-r-0 lg:border-0">
                  <HiOutlineMagnifyingGlass className="h-7 w-7 lg:mt-0.5 text-gray-400" />
                </div>

                <input
                  type="text"
                  placeholder="име, ключова дума или компания"
                  value={adAdvacedSearchData.keyword}
                  onChange={(event) => handleInputChange("keyword", event)}
                  className="text-gray-700 text-sm focus:outline-none w-full px-2.5 pl-3 sm:pl-4 lg:pl-2.5 py-4 sm:py-6 lg:py-2.5 bg-white border border-gray-200 border-l-0 lg:border-0 rounded-r-lg"
                />
              </div>

              <div className="flex items-center w-full lg:border-l-2 lg:pl-2.5">
                <div className="bg-white lg:bg-transparent py-2.5 sm:py-[17px] lg:py-0 rounded-l-lg pl-4 lg:pl-0 border border-gray-200 border-r-0 lg:border-0">
                  <CiLocationOn className="h-8 w-8 sm:mt-0.5 text-gray-400" />
                </div>

                <input
                  type="text"
                  placeholder="град"
                  value={adAdvacedSearchData.location}
                  onChange={(event) => handleInputChange("location", event)}
                  className="text-gray-700 text-sm focus:outline-none w-full px-2.5 pl-3 sm:pl-4 lg:pl-2.5 py-4 sm:py-6 lg:py-2.5 bg-white border border-gray-200 border-l-0 lg:border-0 rounded-r-lg"
                />
              </div>

              <button
                onClick={handleFindJob}
                className="w-full lg:w-auto flex justify-center text-white bg-blue-500 hover:bg-[#1967d2] hover:text-white font-semibold focus:outline-none rounded-lg py-3 lg:py-2.5 px-4 transition-all active:scale-95"
              >
                Намери
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.6, delay: 1 },
            }}
            className="text-slate-400 text-sm mt-3.5 md:mt-2.5 ml-0.5"
          >
            <span className="font-semibold mr-2.5 text-slate-500">
              Популярни търсения:{" "}
            </span>{" "}
            Програмист, Дизайнер, Архитект, Шофьор
          </motion.div>
        </div>

        <div className="hidden lg:block w-5/12 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={setAnimation(1, 1)}
            className="absolute top-4 xl:top-10 xl:-left-36 -left-24 bg-white p-3 xl:p-4 rounded-xl shadow-md border border-slate-100 flex items-center space-x-4 w-56 xl:w-72"
          >
            <div className="bg-[#fef3d9] p-2 xl:p-2.5 rounded-lg">
              <BsEnvelope className="text-[#f9ae0b] w-7 h-7 xl:w-8 xl:h-8" />
            </div>

            <div className="text-[15px] xl:text-base font-semibold text-slate-700">
              Направи запитване до Ричард Mуфан
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={setAnimation(1, 2.7)}
            className="absolute top-20 -right-14 2xl:-right-16 bg-white p-3 xl:p-4 rounded-xl shadow-md border border-slate-100 items-center space-x-4 w-52 xl:w-64"
          >
            <div className="text-center text-[15px] xl:text-base font-semibold text-slate-700 mb-2 xl:mb-3">
              10k+ Кандидати
            </div>

            <AvatarGroup isBordered>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            </AvatarGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={setAnimation(1, 1.9)}
            className="absolute top-64 xl:top-80 -right-6 xl:-right-8 bg-white p-3 xl:p-4 rounded-xl shadow-md border border-slate-100 flex items-center justify-between space-x-4 w-[280px] xl:w-80"
          >
            <div className="bg-[#f8d5d3] p-2.5 rounded-full">
              <BsBriefcase className="text-slate-50 w-6 h-6 xl:w-7 xl:h-7" />
            </div>

            <div>
              <div className="font-semibold">Творческа Aгенция</div>
              <div className="text-gray-400 text-sm">Стартирайте сега</div>
            </div>

            <div className="bg-[#f8d5d3] p-2 rounded-full mt-1">
              <FaCheck className="text-slate-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={setAnimation(1, 3.6)}
            className="absolute top-[23.1rem] xl:top-[30rem] 2xl:top-[34rem] -left-2 xl:-left-8 bg-white pl-8 xl:pl-10 py-3 xl:py-4 rounded-xl shadow-md border border-slate-100 flex items-center space-x-4 w-[260px] xl:w-72"
          >
            <div className="bg-white absolute -top-7 -left-6 xl:-top-8 xl:-left-7 shadow-lg p-2.5 xl:p-3 rounded-md border border-slate-100">
              <BsFileEarmarkArrowUp className="text-[#1967d2] w-9 h-9 xl:w-10 xl:h-10" />
            </div>

            <div>
              <div className="font-semibold">Създай собствено CV</div>
              <div className="text-gray-400 text-sm">
                Отнема само няколко минути
              </div>
            </div>
          </motion.div>

          <Image
            src={homeBannerImg}
            alt="Picture of the author"
            width={"100%"}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(MainSection);
