<template>
  <div>
    <productAndProjectSelect />

    <projectOverview :total-people="0" :task-amount="taskDataBox.count" :total-work-time="timeDataBox.count" :bug-amount="bugDataBox.count" />

    <el-carousel
      :autoplay="false"
      style="width:92%; height:950px; background-color: #021232;"
      indicator-position="none"
      arrow="always"
    >
      <el-carousel-item style="width:95%; height:950px; margin-left: 53px;">
        <div class="carouselItem">
          <div class="itemName">项目工时数据</div>

          <BurnDept :pie-data="ztBurnDeptInfo" />

          <div class="one">
            <groupSelect :project="projectId" />

          </div>
          <span class="one">
            <TaskEstimateLine :project="projectId" />
            <overviewManHours :project="projectId" team="三" dept="5" />
          </span>
        </div>
      </el-carousel-item>

      <el-carousel-item style="width:95%; height:950px;margin-left: 53px;">

        <div class="carouselItem">
          <div class="itemName">项目BUG数据</div>
          <span class="one">
            <UserBarChart :project="projectId" category="Bug" />
          </span>
          <span class="one">
            <BugPieChart :project="projectId" text="Bug状态" category="status" />
            <BugPieChart :project="projectId" text="Bug状态类型" category="type" />
            <BugPieChart :project="projectId" text="Bug级别" category="severit" />
            <bugMatter />
          </span>
        </div>
      </el-carousel-item>

      <el-carousel-item style="width:95%; height:950px;margin-left: 53px;">
        <div class="carouselItem">
          <div class="itemName">项目任务数据</div>
          <span class="one">
            <UserBarChart :project="projectId" category="任务数" />
          </span>

          <span class="one">
            <!-- <taskLevel></taskLevel> -->
            <taskType />
            <!-- <taskMatter></taskMatter> -->
            <taskDetail />
          </span>
        </div>
      </el-carousel-item>

    </el-carousel>

  </div>
</template>

<script>
import productAndProjectSelect from '@/views/zentao/dashboardv1/productAndProjectSelect'
import projectOverview from '@/views/zentao/dashboardv1/projectOverview'
import groupSelect from '@/views/zentao/dashboardv1/groupSelect'
import overviewManHours from '@/views/zentao/dashboardv1/overviewManHours'
import { getDeptInfo } from '@/api/zentao/dept'
import { getUserList, getUserRoleList } from '@/api/zentao/user'
import { getZtProductList } from '@/api/zentao/product'
import { getZtProjectList, getProductProjectList, getZtProjectCycle } from '@/api/zentao/project'
import { getBugInfo, getBugDataBox, getBugPieChar } from '@/api/zentao/bug'
import { getZtBurnDept } from '@/api/zentao/burnDept'
import {
  getTaskInfo,
  getZtTaskInfo,
  getTaskTimeInfo,
  getTaskDataBox
} from '@/api/zentao/task'

import dataBox from '@/components/DataBox'
import echartsPie from '@/components/Echarts/EchartsPie'
import DynamicDataSourceSelect from '@/components/DynamicDataSourceSelect'
import PieChart2 from '@/components/Echarts/PieChart2'
import BurnDept from '@/components/zentao/BurnDept'
import UserBarChart from '@/components/zentao/UserBarChart'
import TaskEstimateLine from '@/components/zentao/TaskEstimateLine'
import BugPieChart from '@/components/zentao/BugPieChart'
export default {
  name: 'Dashboard',
  components: {
    'echartsPie': echartsPie,
    'dataBox': dataBox,
    'DynamicDataSourceSelect': DynamicDataSourceSelect,
    'PieChart2': PieChart2,
    'BurnDept': BurnDept,
    'UserBarChart': UserBarChart,
    'productAndProjectSelect': productAndProjectSelect,
    'projectOverview': projectOverview,
    'groupSelect': groupSelect,
    'TaskEstimateLine': TaskEstimateLine,
    'overviewManHours': overviewManHours,
    'BugPieChart': BugPieChart
  },
  // 数据字典
  dicts: ['task_status', 'bug_status'],
  data() {
    return {
      configTitle: '选择产品和迭代',

      userDataBox: {
        title: '成员数',
        count: 12332,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        background: 'rgb(49, 180, 141)',
        subData: [{
          title: '较昨日',
          value: '+12'
        }, {
          title: '较上迭代',
          value: '+120'
        }]
      },
      timeDataBox: {
        title: '工时',
        count: 12332,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: [{
          title: '较昨日',
          value: '+12'
        }, {
          title: '较上迭代',
          value: '+120'
        }]
      },
      taskDataBox: {
        title: '任务数量',
        count: 0,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: [{
          title: '较昨日',
          value: '+12'
        }, {
          title: '较上迭代',
          value: '+120'
        }]
      },
      bugDataBox: {
        title: 'BUG数量',
        count: 0,
        showIcon: false,
        icon: 'el-icon-warning',
        color: 'rgb(49, 180, 141)',
        subData: [{
          title: '较昨日',
          value: '+12'
        }, {
          title: '较上迭代',
          value: '+120'
        }]
      },
      userList: [],
      userInfo: {},
      productId: '',
      productName: '',
      productList: [],
      bugInfo: {},
      taskInfo: {},
      projectCycle: {},
      projectId: 0,
      projectName: '',
      projectList: [],
      ztTaskInfo: [],
      ztDeptInfo: [],
      ztBurnDeptInfo: {},
      taskTaskTimeInfo: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10,
        'total': 100
      },
      form: {},
      pieData: {},
      burnDept: {}
    }
  },
  computed: {
    // 仅读取
    dataBoxOption: function() {
      var dataBoxOption = {
        span: 6,
        data: [this.userDataBox, this.timeDataBox, this.taskDataBox, this.bugDataBox]
      }
      return dataBoxOption
    }
  },
  watch: {
    'taskTaskTimeInfo': function() {
      this.dataBoxOption.data[1].count = this.taskTaskTimeInfo.seriesData[1].value
      this.dataBoxOption.data[1].subData[0] = this.taskTaskTimeInfo.seriesData[2].value
      this.dataBoxOption.data[1].subData[1] = this.taskTaskTimeInfo.seriesData[2].value
    },
    'userList': function() {
      this.dataBoxOption.data[0].count = this.pageInfo.total
    }
  },
  mounted() {
    this.$eventBus.$on('projectChange', project => {
      this.projectId = project
      this.getDataBox(project)
      this.getZtBurnDept(project)
    })
  },
  methods: {
    changeDataSource() {
      var data1 = {
        'params': this.userInfo,
        'pageInfo': this.pageInfo
      }
      this.getUserData(data1)
      this.drawLine()
      this.getZtProductList()
      this.getDeptInfo()
    },

    getDataBox(projectId) {
      var query = {
        'project': projectId
      }
      getBugDataBox(query).then(res => {
        this.bugDataBox = { ...res }
        this.bugDataBox.dict = this.dict.label.bug_status
        this.bugDataBox.color = '#E6A23C'
      })
      getTaskDataBox(query).then(res => {
        this.taskDataBox = { ...res }
        this.taskDataBox.dict = this.dict.label.task_status
        this.taskDataBox.color = '#409EFF'
      })
    },
    listenGetUserData(val) {
      this.userInfo.dept = val
      const data = {
        'params': this.userInfo,
        pageInfo: this.pageInfo
      }
      getUserList(data).then(res => {
        this.userList = res.content
        this.pageInfo = res.pageInfo
      })
    },
    getUserData(data) {
      getUserList(data).then(res => {
        this.userList = res.content
        this.pageInfo = res.pageInfo
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      var reqData = {
        'params': this.userInfo,
        'pageInfo': this.pageInfo
      }
      this.getUserData(reqData)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      var reqData = {
        params: this.userInfo,
        pageInfo: this.pageInfo
      }
      this.getUserData(reqData)
    },
    drawLine() {
      const legendData = []
      const seriesData = []
      getUserRoleList().then(res => {
        for (const item of res.content) {
          legendData.push(item.roleName)
          const seriesData1 = {
            'name': '',
            'value': ''
          }
          seriesData1.name = item.roleName
          seriesData1.value = item.total
          seriesData.push(seriesData1)
        }
        this.pieData.legendData = legendData
        this.pieData.seriesData = seriesData
        this.pieData.name = '随便写写'
      })
    },
    getZtProductList() {
      const data = {
        'pageNum': 1,
        'pageSize': 9999999
      }
      getZtProductList(data).then(res => {
        this.productList = res.content
        this.productId = this.productList[0].id
        this.productName = this.productList[0].name
        this.getProductProjectList(this.productList[0].id)
      })
    },
    getZtProjectList() {
      const data = {
        'pageNum': 1,
        'pageSize': 9999999
      }
      getZtProjectList(data).then(res => {
        this.projectList = res.content
      })
    },
    getProductProjectList(projectId) {
      const data = {
        params: projectId,
        pageInfo: {
          'pageNum': 1,
          'pageSize': 9999999
        }
      }
      getProductProjectList(data).then(res => {
        this.projectList = res.content
        this.projectId = this.projectList[0].id
        this.projectName = this.projectList[0].name
        this.getBugInfo(projectId)
        this.getZtTaskInfo(projectId)
        this.getZtProjectCycle(projectId)
        this.getTaskTimeInfo(projectId)
        this.getDataBox(this.projectId)
        this.getZtBurnDept(projectId)
      })
    },
    listenProject(projectId) {
      this.getBugInfo(projectId)
      this.getZtTaskInfo(projectId)
      this.getZtProjectCycle(projectId)
      this.getTaskTimeInfo(projectId)
      this.getTaskInfo(projectId)
      this.getDataBox(projectId)
      this.getZtBurnDept(projectId)
    },
    getBugInfo(projectId) {
      getBugInfo(projectId).then(res => {
        this.bugInfo = res.content
      })
    },
    getZtTaskInfo(projectId) {
      getZtTaskInfo(projectId).then(res => {
        this.taskInfo = res.content
      })
    },
    getZtProjectCycle(projectId) {
      getZtProjectCycle(projectId).then(res => {
        this.projectCycle = res.content
      })
    },
    getTaskTimeInfo(projectId) {
      getTaskTimeInfo(projectId).then(res => {
        this.taskTaskTimeInfo = res.content
      })
    },
    getTaskInfo(projectId) {
      getTaskInfo(projectId).then(res => {
        this.ztTaskInfo = res.content
      })
    },
    getDeptInfo() {
      getDeptInfo().then(res => {
        this.ztDeptInfo = res.content
      })
    },
    getZtBurnDept(project) {
      getZtBurnDept(project).then(res => {
        this.ztBurnDeptInfo = res.content
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .one{
    display: flex;
    flex-direction: row;

  }
  #main{
    padding-top: 0px;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 4%;
    background: #021232;
    /* margin : 10%; */
  }
  .itemName {
    width: 100%;
    background-image: linear-gradient(180deg, #02215E 14%, #082D78 100%);
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #00A6FF;
    letter-spacing: 0;
    text-align: center;
    height: 50px;
    margin-bottom: 12px;
    padding-top: 7px;
    /* margin-left: 80px; */
  }
button.el-carousel__arrow.el-carousel__arrow--left{
  left: 1%;
  font-size: 50px;
  height: 40px;
  width: 40px;
  color: #32C5FF;
 }
button.el-carousel__arrow.el-carousel__arrow--right {
  right: -0.5%;
  font-size: 50px;
  height: 40px;
  width: 40px;
  z-index: 10;
  color: #32C5FF;
 }
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
