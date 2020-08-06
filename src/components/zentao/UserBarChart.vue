<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getUserWorkInfoChart } from '@/api/zentao/user'

export default {
  props: {
    project: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: '工时'
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    'project': function() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (!this.project) {
        return
      }
      this.chart = echarts.init(this.$el, 'macarons')
      getUserWorkInfoChart({ project: this.project, category: this.category }).then(rs => {
        this.chart.setOption({
          title: {
            text: this.category
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: rs.legend
          },
          dataZoom: [
            {
              show: true,
              type: 'slider',
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            }
          ],
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: rs.xAxis
          },
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: rs.series
        })
      })
    }
  }
}
</script>
