<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { defineComponent, h } from "vue";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartTitle: {
      type: String,
    },
    lineColor: {
      type: String,
    },
  },
  setup(props) {
    // const monthNames = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    const labels = [];
    const prices = [];

    props.chartData.forEach((data) => {
      const date = new Date(data.x * 1000);
      //   labels.push(monthNames[date.getMonth()]);
      //   labels.push(date);
      //   const date = new Date(data.x * 1000);
      // labels.push(date.toISOString().substring(0, 10));
      labels.push(
        date.toLocaleDateString("he-IL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
      prices.push(data.y);
    });

    const chartData = {
      labels,
      datasets: [
        {
          label: "Price",
          borderColor: props.lineColor,
          pointRadius: 0,
          data: prices,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: props.chartTitle || "",
          font: { size: 20 },
          color: "whitesmoke",
        },
        x: {
          ticks: {
            color: "whitesmoke",
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: "whitesmoke",
            // font: {
            //   size: 15,
            // },
            // stepSize: 1,
            // beginAtZero: true,
          },
          grid: {
            color: "grey",
            borderDash: [4, 8],
          },
        },
        x: {
          ticks: {
            color: "whitesmoke",
          },
          grid: {
            color: "grey",
            borderDash: [4, 8],
          },
        },
        // xAxes:
        //   {
        //     gridLines: {
        //       display: true,
        //     },
        //   },

        // yAxes:
        //   {
        //     gridLines: {
        //       display: true,
        //     },
        //   },
      },

      /* FIX -  */
      //   scales: {
      //     xAxes: [
      //       {
      //         type: "time",
      //         time: {
      //           parser: "YYYY-MM-DD",
      //           unit: "month",
      //           displayFormats: {
      //             month: "MM/YY",
      //           },
      //           // tooltipFormat: "DD/MM/YY",
      //         },
      //       },
      //     ],
      //   },
    };

    return () =>
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
</script>