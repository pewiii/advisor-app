<template>
  <div id="area-chart" class="h-full w-full">
  </div>
</template>

<script lang="ts" setup>
import Highcharts from 'highcharts'
import { onMounted } from 'vue';


// const date = Date.now()
// const add 

function getLast20Days() {
  const currentDate = new Date();
  const last20Days = [];

  for (let i = 0; i < 20; i++) {
    const dayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i, 0, 0, 0, 0);
    last20Days.push(dayStart.valueOf());
  }

  return last20Days;
}


onMounted(() => {
  
  Highcharts.chart({
      chart: {
          type: 'area',
          renderTo: 'area-chart'
          // height: 350
      },
      title: {
          text: 'Respondents'
      },
      legend: {
        enabled: false
      },
      xAxis: {
        //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        type: 'datetime'
      },
      credits: false,
      yAxis: {
        title: null
        //   title: {
        //       text: 'Respondents'
        //   }
      },
      series: [{
          name: 'Respondents',
        //   data: [30, 25, 42, 51, 22].map(value => [date.valueOf(), value])
        data: getLast20Days().map(date => [date, Math.ceil(Math.random() * 50)])
      }]
  });

})


</script>