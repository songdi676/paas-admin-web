<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getBugPieChar } from '@/api/zentao/bug'

export default {
  props: {
    pieData: {
      type: Object,
      default: null
    },
    project: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      default: 'status'
    },
    category: {
      type: String,
      default: 'status'
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
      if (!this.project) {
        return
      }
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
      this.chart = echarts.init(this.$el, 'macarons')
      getBugPieChar({ project: this.project, category: this.category }).then(r => {
        this.chart.setOption({
          title: {
            text: this.text,
            left: 'center',
            textStyle: { // 图例文字的样式
              color: '#32C5FF'
            },
            backgroundColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#02215E' // 0% 处的颜色
              }, {
                offset: 1, color: '#082D78' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            padding: [16, 200, 16, 200]
          },
          backgroundColor: '#021232',
          color: ['#32C5FF', '#44D7B6', '#FA6400', '#B620E0'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            icon: 'circle',
            orient: 'vertical',
            x: '35px',
            y: '270px',
            textStyle: { // 图例文字的样式
              color: '#32C5FF'
            },
            data: r.legend
          },
          series: [
            {
              name: this.text,
              type: 'pie',
              radius: '50%',
              // center: ['60%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              data: r.series,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }

      )
    }
  }
}
</script>
