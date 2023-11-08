<template>
  <div id="area-chart">
  </div>
</template>

<script lang="ts" setup>
import Highcharts from 'highcharts'
import { onMounted } from 'vue';




onMounted(() => {
  
  Highcharts.chart('area-chart', {
      chart: {
          type: 'area',
          // height: 350
      },
      title: {
          text: 'Sample Area Chart'
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
      },
      credits: false,
      yAxis: {
          title: {
              text: 'Value'
          }
      },
      series: [{
          name: 'Series 1',
          data: [5, 7, 3, 8, 4]
      }, {
          name: 'Series 2',
          data: [3, 4, 2, 6, 5]
      }]
  });

})


</script>