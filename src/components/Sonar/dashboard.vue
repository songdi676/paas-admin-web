<template>
  <div>
    <el-collapse>
      <el-collapse-item :title="configTitle" name="1">
        <el-col :span="8">
          <DynamicDataSourceSelect system="sonar" @changeDataSource="changeDataSource" />
        </el-col>

      </el-collapse-item>
    </el-collapse>

    <el-row :gutter="8">
      <dataBox :option="dataBoxOption" />

    </el-row>
  </div>
</template>
<script>
import dataBox from '@/components/DataBox'
import DynamicDataSourceSelect from '@/components/DynamicDataSourceSelect'
export default {
  name: 'SonarDashboard',
  components: {
    'dataBox': dataBox,
    'DynamicDataSourceSelect': DynamicDataSourceSelect
  },
  props: {
    system: {
      type: String,
      default: 'admin'
    }
  },
  data() {
    return {
      configTitle: '选择数据库',
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
