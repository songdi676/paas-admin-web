<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getTaskEestimate } from '@/api/zentao/dept'
export default {
  props: {
    project: {
      type: Number,
      required: true
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
    }, '100%')
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
      this.chart = echarts.init(this.$el, 'macarons')
      if (!this.project) {
        return
      }
      getTaskEestimate(this.project).then(r => {
        const areaStyle = { // 区域填充样式
          normal: {
            opacity: 0.35,
            color: 'green'
          }
        }
        this.chart.setOption({
          title: {
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: r.legend
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: r.xAxis
          },
          yAxis: {
            type: 'value'
          },
          series: r.series
        })
      })
    }
  }
}
</script>
