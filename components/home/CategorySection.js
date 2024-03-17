import React, { useEffect, useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { categoriesData } from "@/app/data";
import adAction from "@/actions/adAction";
import { adStore } from "@/stores/useStore";

const CategorySection = () => {
  const { setAdvancedSearchData, advancedSearchData } = adStore;
  const [adCategories, setAdCategories] = useState([]);
  const [adCount, setAdCount] = useState();
  const [overallAdsCount, setOverallAdsCount] = useState();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const popularCategories = [
      "Счетоводство и Финанси",
      "Маркетинг, Реклама, ПР",
      "Информационни технологии",
      "Логистика, Спедиция",
      "Шофьори, Куриери",
      "Човешки ресурси (HR)",
      "Здравеопазване и Фармация",
      "Недвижими имоти",
      "Търговия и Продажби",
      "Сигурност и Охрана",
      "Телекоми",
      "Мениджмънт",
    ];

    adAction
      .getAdCategories(popularCategories)
      .then((response) => {
        setAdCategories(response.categories);
        setAdCount(response.totalAdsCount);
        setOverallAdsCount(response.overallAdsCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const categories = adCategories.map((category, index) => ({
    title: category.name,
    positions: `(${category.count} отворени позиции)`,
    icon: categoriesData[index]?.icon || null,
  }));

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
      className='w-full py-10 md:py-16 border-b flex justify-center'>
      <div className='w-full md:max-w-screen-2xl'>
        <h2 className='font-bold text-2xl sm:text-3xl text-center text-slate-700 mb-1.5'>
          Популярни категории
        </h2>

        {overallAdsCount !== undefined && adCount !== undefined && (
          <div className='text-slate-500 text-center mb-10'>
            {overallAdsCount} обяви от, които {adCount} обяви добавени днес
          </div>
        )}

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
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-5 xl:gap-8 px-5 lg:px-5 xl:px-16 min-h-[30rem]'>
          {categories.map((category, index) => (
            <Link
              key={index}
              onClick={() =>
                setAdvancedSearchData({
                  ...advancedSearchData,
                  category: category.title,
                })
              }
              href='/find-job'
              className='border rounded-lg p-3.5 group shadow'>
              <div className='flex items-center'>
                <div className='bg-gray-100 group-hover:bg-blue-500 w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500'>
                  {category.icon}
                </div>

                <div className='text-slate-700 font-semibold ml-5 sm:text-lg'>
                  <div>{category.title}</div>

                  <div className='text-gray-500 text-[13px] sm:text-sm mt-1'>
                    {category.positions}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default observer(CategorySection);
