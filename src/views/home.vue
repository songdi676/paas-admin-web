<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="configTitle" name="1">
          <el-form>
            <el-col :span="6">
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
            <el-col :span="6">
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
        <el-form>
          <el-col :span="6">
            <dataBox :option="dataBoxOption" />
          </el-col>
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
                <span />
              </div>
              <el-form-item>
                <echartsPie
                  v-if="taskTaskTimeInfo.name!==undefined"
                  :pie-data="taskTaskTimeInfo"
                />
              </el-form-item>
            </el-card>
          </el-col>
        </el-form>
      </el-row>
      <el-row :gutter="8" style="margin-bottom: 5px;">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>人员分布</span>
            </div>
            <div id="userListChart" :style="{ height: '300px'}" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>员工列表</span>
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
      </el-row>
      <el-row :gutter="8" style="margin-bottom: 5px;">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ pieData.name }}</span>
            </div>
            <echartsPie
              v-if="pieData.name!==undefined"
              :pie-data="pieData"
            />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>任务完成情况</span>
            </div>
            <echartsPie
              v-if="pieData.name!==undefined"
              :pie-data="pieData"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProjectList, getUserRoleList } from '@/api/zentao/user'
import { getZtProductList } from '@/api/zentao/product'
import { getZtProjectList, getProductProjectList, getZtProjectCycle } from '@/api/zentao/project'
import { getBugInfo } from '@/api/zentao/bug'
import {
  getZtTaskInfo,
  getTaskTimeInfo
} from '@/api/zentao/task'

import dataBox from '@/components/DataBox'
import echartsPie from '@/components/Echarts/EchartsPie'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Dashboard',
  components: {
    'echartsPie': echartsPie,
    'dataBox': dataBox
  },
  data() {
    return {
      configTitle: '选择产品和迭代',
      dataBoxOption: {
        span: 12,
        data: [
          {
            click: function(item) {
              alert(JSON.stringify(item))
            },
            title: 'BUG数量',
            count: 12332,
            icon: 'el-icon-warning',
            color: 'rgb(49, 180, 141)',
            target: '_blank',
            subData: [{
              title: '较昨日',
              value: '+12'
            }, {
              title: '较上迭代',
              value: '+120'
            }]
          }] },
      lineChartData: lineChartData.newVisitis,
      userList: [],
      productId: '',
      productName: '',
      productList: [],
      bugInfo: {},
      taskInfo: {},
      projectCycle: {},
      projectId: '',
      projectName: '',
      projectList: [],
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
  mounted() {
    var data1 = {
      'params': {},
      'pageInfo': {}
    }
    this.getUserData(data1)
    this.drawLine()
    this.getZtProductList()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getUserData(data) {
      getProjectList(data).then(res => {
        this.userList = res.content
        this.pageInfo = res.pageInfo
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      var reqData = {
        'params': {},
        'pageInfo': this.pageInfo
      }
      this.getUserData(reqData)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      var reqData = {
        params: {},
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
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('userListChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: legendData
          },
          series: [
            {
              name: '职位分布',
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
              data: seriesData
            }
          ]
        })
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
    getProductProjectList(productId) {
      const data = {
        params: productId,
        pageInfo: {
          'pageNum': 1,
          'pageSize': 9999999
        }
      }
      getProductProjectList(data).then(res => {
        this.projectList = res.content
        this.projectId = this.projectList[0].id
        this.projectName = this.projectList[0].name
        this.getBugInfo(productId)
        this.getZtTaskInfo(productId)
        this.getZtProjectCycle(productId)
        this.getTaskTimeInfo(productId)
      })
    },
    listenProject(projectId) {
      this.getBugInfo(projectId)
      this.getZtTaskInfo(projectId)
      this.getZtProjectCycle(projectId)
      this.getTaskTimeInfo(projectId)
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
