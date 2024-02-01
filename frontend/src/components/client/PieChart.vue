
<template>
  <div class="card flex justify-content-center p-4">
      <pvChart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" :pt="{ root: { canvas: 'text-white '}}" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSettings } from "@/stores/settings";

const { isDark, color } = storeToRefs(useSettings());

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [540, 325, 702],
              backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
          }
      ]
  };
};

const setChartOptions = () => {
  // const documentStyle = getComputedStyle(document.documentElement);
  // const textColor = documentStyle.getPropertyValue('--text-color');

  return {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: color.value.primary
              }
          }
      }
  };
};

watch(() => color, () => {
  console.log("HERE")
  chartOptions.value = setChartOptions()
}, { deep: true });
</script>
