import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import adAction from "@/actions/adAction";
import AdBox from "@/components/ad/AdBox";

const PopularJobsSection = () => {
  const [popularAds, setPopularAds] = useState([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    adAction
      .getPopularAds()
      .then((response) => {
        setPopularAds(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={
        inView
          ? {
              y: 0,
              opacity: 1,
              transition: { duration: 1.3 },
            }
          : {}
      }
      className="w-full py-10 md:py-16 border-b flex justify-center"
    >
      <div className="w-full md:max-w-screen-2xl">
        <h2 className="font-bold text-2xl sm:text-3xl text-center text-slate-700 mb-1.5">
          Популярни обяви
        </h2>

        <div className="text-slate-500 text-center mb-10">
          Осъзнайте стойността си и намерете работата, която отговаря на
          изискванията ви
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={
            inView
              ? {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1.3, delay: 0.8 },
                }
              : {}
          }
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 lg:gap-5 xl:gap-8 px-5 lg:px-5 xl:px-16"
        >
          {popularAds?.map((ad, index) => (
            <AdBox key={index} data={ad} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PopularJobsSection;
