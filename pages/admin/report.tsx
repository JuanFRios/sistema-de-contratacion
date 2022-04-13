import React, { useState, useEffect } from 'react';
import { matchRoles } from 'utils/matchRoles';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { GET_CHART_DATA } from 'graphql/queries/chart';
import LoadingComponent from '@components/utils/LoadingComponent';

const ReactApexChart = dynamic(
  // eslint-disable-next-line arrow-body-style
  () => {
    return import('react-apexcharts');
  },
  { ssr: false }
);

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Report = () => {
  const { data, loading } = useQuery(GET_CHART_DATA);

  const [options, setOptions] = useState({
    chart: {},
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
    title: {
      align: 'left',
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data) {
      setSeries(data.getChartData.series);
      setOptions({
        ...options,
        xaxis: { ...options.xaxis, categories: data.getChartData.categories },
      });
    }
    console.log(data);
  }, [data]);
  if (loading) return <LoadingComponent />;

  return (
    <div className='place-content-center'>
      <div className='flex justify-center pt-12 pb-6 font-bold text-4xl'>
        <p>
          Cantidad de documentos pendientes por cada proceso de contratación
        </p>
      </div>
      <div className='w-11/12'>
        <ReactApexChart
          options={options}
          series={series}
          type='bar'
          height={350}
        />
      </div>
    </div>
  );
};
export default Report;
