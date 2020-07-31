<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-collapse>
        <el-collapse-item :title="configTitle" name="1">
          <el-form>
            <el-col :span="4">
              <DynamicDataSourceSelect system="zentao" @changeDataSource="changeDataSource" />
            </el-col>
            <el-col :span="4">
              <el-form-item label="产品">
                <el-select v-model="productId" placeholder="请选择产品" @change="getProductProjectList">
                  <el-option
                    v-for="item in productList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="迭代">
                <el-select v-model="projectId" placeholder="请选择迭代" @change="listenProject">
                  <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-row :gutter="8">
        <el-col :span="12">
          <dataBox :option="dataBoxOption" />
        </el-col>
        <el-form>

          <el-col :span="6">
            <el-card class="box-card" style="height: 100px;margin-bottom: 5px;">
              <el-form-item label="Bug：">
                <template>
                  <el-tag>已解决：{{ bugInfo.resolved }}</el-tag>
                  <el-tag>活跃：{{ bugInfo.active }}</el-tag>
                  <el-tag>关闭：{{ bugInfo.closed }}</el-tag>
                  <el-tag>总数：{{ bugInfo.total }}</el-tag>
                </template>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" style="height: 100px;margin-bottom: 5px;">
              <el-form-item label="Task：">
                <template>
                  <el-tag>暂停：{{ taskInfo.pause }}</el-tag>
                  <el-tag>完成：{{ taskInfo.done }}</el-tag>
                  <el-tag>关闭：{{ taskInfo.closed }}</el-tag>
                  <el-tag>进行中：{{ taskInfo.doing }}</el-tag>
                  <el-tag>等待：{{ taskInfo.wait }}</el-tag>
                  <el-tag>取消：{{ taskInfo.cancel }}</el-tag>
                  <el-tag>总数：{{ taskInfo.total }}</el-tag>
                </template>
              </el-form-item>
            </el-card>
          </el-col>
        </el-form>
      </el-row>
      <el-row :gutter="8">
        <el-form>
          <el-col :span="12" style="margin-bottom: 5px;">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>迭代周期：{{ projectCycle.begin+'~'+projectCycle.end }}</span>
              </div>
              <el-form-item>
                <echartsPie
                  v-if="taskTaskTimeInfo.name!==undefined"
                  :pie-data="taskTaskTimeInfo"
                />
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12" style="margin-bottom: 5px;">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>任务情况</span>
              </div>
              <PieChart2
                v-if="ztTaskInfo !== undefined || ztTaskInfo !== null"
                :pie-data="ztTaskInfo"
              />
            </el-card>
          </el-col>
        </el-form>
      </el-row>
      <el-row :gutter="8" style="margin-bottom: 5px;">
        <el-form>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>人员分布</span>
              </div>
              <PieChart
                v-if="pieData.name!==undefined"
                :pie-data="pieData"
              />
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-form-item label="员工列表">
                  <el-select v-model="productId" placeholder="请选择分组" @change="listenGetUserData">
                    <el-option
                      v-for="item in ztDeptInfo"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <template>
                <el-table
                  :data="userList"
                  style="width: 100%"
                  height="268"
                  border
                >
                  <el-table-column
                    prop="account"
                    label="账号"
                  />
                  <el-table-column
                    prop="role"
                    label="角色"
                  />
                  <el-table-column
                    prop="realname"
                    label="姓名"
                  />
                  <el-table-column
                    prop="email"
                    label="邮箱"
                    width="200px"
                  />
                </el-table>
                <div class="block">
                  <el-pagination
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageInfo.size"
                    layout="sizes, prev, pager, next"
                    :total="pageInfo.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </template>
            </el-card>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24" />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDeptInfo } from '@/api/zentao/dept'
import { getUserList, getUserRoleList } from '@/api/zentao/user'
import { getZtProductList } from '@/api/zentao/product'
import { getZtProjectList, getProductProjectList, getZtProjectCycle } from '@/api/zentao/project'
import { getBugInfo, getBugDataBox } from '@/api/zentao/bug'
import {
  getTaskInfo,
  getZtTaskInfo,
  getTaskTimeInfo,
  getTaskDataBox
} from '@/api/zentao/task'

import dataBox from '@/components/DataBox'
import echartsPie from '@/components/Echarts/EchartsPie'
import DynamicDataSourceSelect from '@/components/DynamicDataSourceSelect'
import PieChart from '@/components/Echarts/PieChart'
import PieChart2 from '@/components/Echarts/PieChart2'

export default {
  name: 'Dashboard',
  components: {
    'echartsPie': echartsPie,
    'dataBox': dataBox,
    'DynamicDataSourceSelect': DynamicDataSourceSelect,
    'PieChart': PieChart,
    'PieChart2': PieChart2
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
      projectId: '',
      projectName: '',
      projectList: [],
      ztTaskInfo: [],
      ztDeptInfo: [],
      taskTaskTimeInfo: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10,
        'total': 100
      },
      form: {},
      pieData: {}
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
        this.getTaskInfo(projectId)
        this.getDataBox(this.projectId)
      })
    },
    listenProject(projectId) {
      this.getBugInfo(projectId)
      this.getZtTaskInfo(projectId)
      this.getZtProjectCycle(projectId)
      this.getTaskTimeInfo(projectId)
      this.getTaskInfo(projectId)
      this.getDataBox(projectId)
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
