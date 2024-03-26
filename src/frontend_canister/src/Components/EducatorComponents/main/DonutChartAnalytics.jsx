/* eslint-disable react/prop-types */
import React from 'react'
import Chart from "react-apexcharts";

const DonutChartAnalytics = ({ data }) => {
    const series = data.map(item => item.value)
    const label = data.map(item => item.title)
    const options = {
        labels: label,
        colors: ["#7B61FF", "#9B8AFC", "#6A38EF"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        }
    }
    return (
        <Chart
            options={options}
            series={series}
            type="donut"
            height="250px"
            className="w-[300px] lg:w-full"
        />
    )
}

export default DonutChartAnalytics