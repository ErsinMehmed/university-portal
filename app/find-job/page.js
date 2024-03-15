"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { adStore } from "@/stores/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { FiList } from "react-icons/fi";
import { FaHouse } from "react-icons/fa6";
import Layout from "@/components/layouts/Website";
import AdBox from "@/components/ad/AdBox";
import Select from "@/components/html/Select";
import SearchSideBar from "@/components/find-job/SearchSideBar";
import { commonStore } from "@/stores/useStore";
import { sortBy } from "@/app/data";

const FindJob = () => {
  const {
    siteAds,
    currentPageSite,
    totalPagesSite,
    totalAdsSite,
    loadAds,
    setCurrentPageSite,
  } = adStore;

  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const observer = useRef();
  const prevScrollY = useRef(0);
  const { setErrorMessage, setErrorFields } = commonStore;

  const lastAdRef = useCallback(
    (node) => {
      const loadMoreAds = () => {
        if (currentPageSite <= totalPagesSite) {
          setShouldLoadMore(false);

          loadAds(currentPageSite).then(() => {
            setShouldLoadMore(true);

            const updatedPageSite = currentPageSite + 1;

            setCurrentPageSite(updatedPageSite);
          });
        }
      };

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && shouldLoadMore) {
          loadMoreAds();
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      shouldLoadMore,
      loadAds,
      currentPageSite,
      setCurrentPageSite,
      totalPagesSite,
    ]
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY < prevScrollY.current;

      setIsVisible(!isScrollingDown);
      prevScrollY.current = currentScrollY;
    };

    setErrorMessage("");
    setErrorFields("");

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="bg-[#f6f8fd] pt-20 pb-[72px] text-center w-full">
        <h2 className="font-semibold text-2xl sm:text-3xl text-center text-slate-700 mb-2.5">
          Намери работа
        </h2>

        <div className="flex justify-center w-full">
          <Breadcrumbs>
            <BreadcrumbItem startContent={<FaHouse />}>Начало</BreadcrumbItem>
            <BreadcrumbItem startContent={<FiList />}>Обяви</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-x-8 max-w-screen-2xl mx-auto my-7 px-6 sm:px-8">
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-28 bg-[#f5f7fc] rounded-md p-7 text-slate-700">
            <SearchSideBar />
          </div>
        </div>

        <div className="col-span-3 lg:col-span-2 space-y-6">
          <div className="flex justify-end">
            <div className="w-full md:w-1/2 xl:w-1/3">
              <Select
                items={sortBy}
                label="Сортирай по"
                // onChange={(value) => handleInputChange("role", value)}
              />
            </div>
          </div>

          {Array.isArray(siteAds) &&
            siteAds.map((ad, index) => <AdBox key={index} data={ad} />)}
        </div>

        <div ref={lastAdRef}></div>
      </div>

      <AnimatePresence>
        {isVisible && totalAdsSite && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed -ml-[105px] left-1/2 text-slate-700 text-sm font-semibold bottom-4 bg-slate-50 rounded-md w-48 shadow-2xl border text-center py-1"
          >
            Обяви{" "}
            <motion.span
              key={`${(currentPageSite - 2) * 10}-${
                (currentPageSite - 1) * 10
              }-${totalAdsSite}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {currentPageSite === 2 ? 1 : (currentPageSite - 2) * 10} -{" "}
              {currentPageSite === totalPagesSite + 1
                ? totalAdsSite
                : (currentPageSite - 1) * 10}
            </motion.span>{" "}
            от {totalAdsSite}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default observer(FindJob);
