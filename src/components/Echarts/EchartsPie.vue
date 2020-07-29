<template>
  <div id="pieChart" :style="{ height: '300px'}" />
</template>

<script>

require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    pieData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    'pieData': function() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: this.pieData.legendData
        },
        series: [
          {
            name: this.pieData.name,
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.pieData.seriesData
          }
        ]
      })
    }
  }
}
</script>
