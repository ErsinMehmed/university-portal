"use client";

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { authStore, commonStore } from "../../stores/useStore";
import Layout from "../../components/layouts/Dashboard";

import dynamic from "next/dynamic";

const Dashboard = () => {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
  const { loginData, setLoginData, login } = authStore;
  const { errorFields, errorMessage, successMessage } = commonStore;

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  });

  return (
    <div>
      <Layout>
        <div className='max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6'>
          <div className='flex justify-between'>
            <div>
              <h5 className='leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2'>
                32.4k
              </h5>
              <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                Users this week
              </p>
            </div>
            <div className='flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center'>
              12%
              <svg
                className='w-3 h-3 ml-1'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 10 14'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13V1m0 0L1 5m4-4 4 4'
                />
              </svg>
            </div>
          </div>

          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type='area'
            height={"100%"}
            width={"100%"}
          />

          <div className='grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between'>
            <div className='flex justify-between items-center pt-5'>
              <button
                id='dropdownDefaultButton'
                data-dropdown-toggle='lastDaysdropdown'
                data-dropdown-placement='bottom'
                className='text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white'
                type='button'>
                Last 7 days
                <svg
                  className='w-2.5 m-2.5 ml-1.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>
              <div
                id='lastDaysdropdown'
                className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
                <ul
                  className='py-2 text-sm text-gray-700 dark:text-gray-200'
                  aria-labelledby='dropdownDefaultButton'>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Yesterday
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Today
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Last 7 days
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Last 30 days
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Last 90 days
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href='#'
                className='uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2'>
                Users Report
                <svg
                  className='w-2.5 h-2.5 ml-1.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default observer(Dashboard);
