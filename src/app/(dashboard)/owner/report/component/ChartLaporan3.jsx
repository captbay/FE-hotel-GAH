'use client';

import { getLaporan2, getLaporan3 } from '@/api/api';
import useGetCookie from '@/hooks/useGetCookie';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartLaporan3 = ({ year }) => {
  const { token } = useGetCookie();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({
    series: [
      {
        name: 'Grup',
        data: [],
      },
      {
        name: 'Personal',
        data: [],
      },
      {
        name: 'Total',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 200,
      },
      colors: [
        '#f7c948',
        '#72c0e6',
        '#d76d77',
        '#5e72e4',
        '#35bdc3',
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'SUPERIOR',
          'DOUBLE DELUXE',
          'EXECUTIVE DELUXE',
          'JUNIOR SUITE',
        ],
      },
      yaxis: {
        // title: {
        //     text: 'Rp',
        // },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return 'Rp ' + val;
          },
        },
      },
      legend: {
        position: 'right',
        verticalAlign: 'center',
        offsetY: 80,
      },
    },
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    const _getLaporan2 = async () => {
      try {
        const res = await getLaporan3(token, year);
        if (res.status === 200) {
          const data = res.data.data;

          const series = [
            {
              name: 'Grup',
              data: data.map((item) => item.grup),
            },
            {
              name: 'Personal',
              data: data.map((item) => item.personal),
            },
            {
              name: 'Total',
              data: data.map((item) => item.total),
            },
          ];

          setState((prevState) => ({
            ...prevState,
            series,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    _getLaporan2();
  }, [year, mounted, token]);

  if (!mounted) return null;

  return (
    <>
      <div id="chart" className="max-w-full">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default ChartLaporan3;
