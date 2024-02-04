
<template>
  <div class="card flex justify-center p-4">
      <pvChart type="pie" :data="chartData" :options="chartOptions" class="" :pt="{root: { class: 'flex justify-center'}, canvas: { class: ''}}" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useSettings } from "@/stores/settings";

const settings = useSettings()

const { isDark, color, colorChoices } = storeToRefs(settings);

const props = defineProps({
  respondents: {
    type: Array,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// onMounted(() => {
// });
// const chartData = ref({});
// const chartOptions = ref({});

const chartData = computed(() => {
  const labelSet = new Set();
  props.respondents.forEach((respondent: any) => {
    if (respondent.extraInfo[props.field] === null || respondent.extraInfo[props.field] === undefined) {
      labelSet.add('N/A');
    } else {
      labelSet.add(respondent.extraInfo[props.field]);
    }
  })

  const labels = Array.from(labelSet);

  const data = labels.map((label) => {
      return props.respondents.filter((respondent: any) => respondent.extraInfo[props.field] === label).length;
  });

  // const documentStyle = getComputedStyle(document.body);

  return {
      labels,
      datasets: [
          {
              data,
              backgroundColor: settings.similarColors(color.value.primary)
              // backgroundColor: colorChoices.value.map(color => color+'bf'),
              // hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
          }
      ]
  };
});

const chartOptions = computed(() => {
  return {
      plugins: {
          legend: {
              title: {
                  display: chartData.value.labels.length > 0,
                  text: props.title,
                  color: isDark ? '#71717a' : '#404040',
                  font: { weight: 'bold', size: 15 },

              },
              labels: {
                  usePointStyle: true,
                  color: color.value.primary,
                  font: { size: 14 }
              },
              position: 'top',
          }
      }
  };
});

// onMounted(() => {
//   watch(() => props.respondents, () => {
//     const labelSet = new Set();
//     props.respondents.forEach((respondent: any) => {
//         if (respondent.extraInfo[props.field]) {
//           labelSet.add(respondent.extraInfo[props.field]);
//         }
//     });

//     const labels = Array.from(labelSet);

//     const data = labels.map((label) => {
//         return props.respondents.filter((respondent: any) => respondent.extraInfo[props.field] === label).length;
//     });

//     chartData.value = setChartData(labels, data);
//     chartOptions.value = setChartOptions();

//   }, { deep: true, immediate: true });

// })


// const setChartData = (labels: any[], data: any[]) => {
//   const documentStyle = getComputedStyle(document.body);

//   return {
//       labels,
//       datasets: [
//           {
//               data,
//               backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500')],
//               hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
//           }
//       ]
//   };
// };

// const setChartOptions = () => {
//   // const documentStyle = getComputedStyle(document.documentElement);
//   // const textColor = documentStyle.getPropertyValue('--text-color');

//   return {
//       plugins: {
//           legend: {
//               title: {
//                   display: true,
//                   text: props.title,
//                   // color: color.value.primary,
//                   color: isDark ? '#71717a' : '#404040',
//                   font: { weight: 'bold', size: 15 }
//               },
//               labels: {
//                   usePointStyle: true,
//                   color: color.value.primary,
//                   font: { size: 14 }
//               }
//           }
//       }
//   };
// };

// watch(() => color, () => {
//   chartOptions.value = setChartOptions()
// }, { deep: true });
</script>
