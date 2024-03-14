"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { commonStore } from "../stores/useStore";
import Layout from "@/components/layouts/Website";
import MainSection from "@/components/home/MainSection";
import CategorySection from "@/components/home/CategorySection";
import PopularJobsSection from "@/components/home/PopularJobsSection";

const Home = () => {
  useEffect(() => {
    commonStore.setIsLoading(false);
  }, []);

  return (
    <Layout>
      <MainSection />

      <CategorySection />

      <PopularJobsSection />
    </Layout>
  );
};

export default observer(Home);
