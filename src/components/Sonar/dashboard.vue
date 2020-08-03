<template>
  <div>
    <el-collapse>
      <el-collapse-item :title="configTitle" name="1">
        <el-col :span="8">
          <DynamicDataSourceSelect system="sonar" @changeDataSource="changeDataSource" />
        </el-col>
        <el-col :span="8">
          <el-select v-model="projectuuid" placeholder="请选择项目" @change="changeProject">
            <el-option
              v-for="item in sonarProjectList"
              :key="item.uuid"
              :label="item.longName"
              :value="item.uuid"
            />
          </el-select>
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
import { getProjectMeasuresBoxes } from '@/api/sonar/project-measures'
import { getProjectList } from '@/api/sonar/project'

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
      sonarProjectList: [],
      projectuuid: '',
      dataBoxList: [],
      dataBoxOption: {
        span: 6,
        data: []
      },
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

  },

  created() {

  },

  methods: {
    changeDataSource() {
      const project = { scope: 'PRJ' }
      getProjectList(project).then(res => {
        this.projectuuid = res[0].uuid
        this.sonarProjectList = res
        this.changeProject(res[0].uuid)
      })
    },
    changeProject(uuid) {
      this.projectuuid = uuid
      const projectMeasures = { componentUuid: this.projectuuid }
      getProjectMeasuresBoxes(projectMeasures).then(res => { this.dataBoxOption.data = res })
    }
  }
}
</script>
