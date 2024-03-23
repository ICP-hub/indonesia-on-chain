/* eslint-disable react/prop-types */
import React from 'react'
import Chart from "react-apexcharts";

const BarGraphAnalytics = ({ data }) => {
    const colors = ["#7B61FF"] //7B61FF
    const series = [{
        name: "Total Studnets",
        data: data.map(s => s.students)
    }]
    const options = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false,
            },
        },
        grid: {
            show: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
                borderRadius: "5"
                // startingShape: "rounded",
            },
        },
        fill: {
            opacity: 1,
        },
        stroke: {
            curve: "smooth",
            width: 2,
            lineCap: "round",
            colors: colors,
            dashArray: [0, 0]

        },
        xaxis: {
            categories: data.map(l => l.shortName),

        },
        yaxis: {
            tickPlacement: "between",

        },
        colors: colors,
    }
    return (

        <Chart
            options={options}
            series={series}
            type="bar"
            height={"100%"}
            className="w-[900px] lg:w-full h-full"
        />

    )
}

export default BarGraphAnalytics