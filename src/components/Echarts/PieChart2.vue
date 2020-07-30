<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    pieData: {
      type: Array,
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
    'pieData': function() {
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
      if (this.pieData != null || this.pieData !== undefined) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '80%',
              data: this.pieData,
              roseType: 'angle',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(0, 0, 0, 0.7)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(70, 70, 0, 0.3)'
                  }
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(255, 255, 255, 0.3)'
                }
              }
            }
          ]
        })
      }
    }
  }
}
</script>
