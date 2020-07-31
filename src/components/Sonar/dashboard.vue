<template>
  <el-row :gutter="8">
    <dataBox :option="dataBoxOption" />

  </el-row>
</template>
<script>
import dataBox from '@/components/DataBox'
export default {
  name: 'SonarDashboard',
  components: {
    'dataBox': dataBox
  },
  props: {
    system: {
      type: String,
      default: 'admin'
    }
  },
  data() {
    return {
      codeSmellDataBox: {
        title: 'Sonar异味',
        count: 12332,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: []
      },
      debtDataBox: {
        title: 'Sonar债务',
        count: 12332,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: []
      },
      codelineDataBox: {
        title: '代码行数',
        count: 12332,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: []
      },
      bugDataBox: {
        title: 'SonarBug',
        count: 12332,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: []
      }
    }
  },
  computed: {
    // 仅读取
    dataBoxOption: function() {
      var dataBoxOption = {
        span: 6,
        data: [this.codeSmellDataBox, this.debtDataBox, this.codelineDataBox, this.bugDataBox]
      }
      return dataBoxOption
    }
  },

  created() {

  },

  methods: {

  }
}
</script>
