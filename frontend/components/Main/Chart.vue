<template>
  <div class="chart">
    <div class="chart__inner">
      <LazyClientOnly>
        <Doughnut
          class="chart-doughnut"
          :data="data"
          :options="options"
          :plugins="plugins"
        />
      </LazyClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chart from "chart.js/auto";
import { Doughnut } from "vue-chartjs";

import {
  CategoryScale,
  type ChartData,
  type ChartOptions,
  type DoughnutControllerChartOptions,
  type Plugin,
} from "chart.js";
import type { ITodoView } from "~/interfaces/models/todo";
Chart.register(CategoryScale);

const props = defineProps<{
  data: ITodoView[] | null;
  limit?: Number;
}>();

const data = computed(() => ({
  //   labels: labels.value,
  datasets: [
    {
      borderColor: "rgb(15, 16, 19)",
      // borderRadius: 12,
      borderWidth: 6,
      backgroundColor: props.data?.map((item) => item?.category?.color),
      //   backgroundColor: "#009639",
      // data: props.data.reduce(() => {}, 0),
      data: props.data?.map((item) => item.sum),
    },
  ],
})) as ComputedRef<ChartData<"doughnut", number[], unknown>>;

const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   radius: 100,

  plugins: {
    tooltip: {
      enabled: false,
    },
  },
} as ChartOptions<"doughnut">;
// as DoughnutControllerChartOptions;

const plugins = computed(() => [
  {
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;

      // ctx.save();
      ctx.restore();
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "32px Arial, Helvetica, sans-serif";
      // var(--font-family)
      ctx.fillText(
        props.data
          ?.reduce((sum, current) => sum + current.sum, 0)
          .toLocaleString() ?? "0",
        width / 2,
        height / 2 + 16
      );
      ctx.save();
    },
  },
]) as ComputedRef<Plugin<"doughnut">[]>;
</script>

<style lang="scss" scoped>
.chart {
  margin: 0 auto;
  max-width: 500px;

  &__inner {
    position: relative;
    width: 100%;
    padding-top: 100%;
  }

  &-doughnut {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
