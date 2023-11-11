<template>

  <div id="pie-chart" class="">

  </div>

</template>

<script lang="ts" setup>
import Highcharts from 'highcharts'
import { onMounted } from 'vue';

// Highcharts.setOptions({
//     colors: Highcharts.map(Highcharts.getOptions().colors, function (color: any) {
//         return {
//             radialGradient: {
//                 cx: 0.5,
//                 cy: 0.3,
//                 r: 0.7
//             },
//             stops: [
//                 [0, color],
//                 [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
//             ]
//         };
//     })
// });

onMounted(() => {
  // Build the chart
  Highcharts.chart({
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          height: 350,
          width: 350,
          renderTo: 'pie-chart',
      },
      title: {
        text: 'Net Worth',
      },
      // title: {
      //     text: 'Registered private vehicles in Norway, by type of fuel, 2020',
      //     align: 'left'
      // },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: false,
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                      '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
                  connectorColor: 'rgba(128,128,128,0.5)'
              }
          }
      },
      series: [{
          name: 'Share',
          data: [
              { name: 'Petrol', y: 938899 },
              { name: 'Diesel', y: 1229600 },
              { name: 'Electricity', y: 325251 },
              { name: 'Other', y: 238751 }
          ]
      }]
  });
})



</script>