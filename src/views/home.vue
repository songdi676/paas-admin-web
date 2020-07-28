<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-row :gutter="8">
        <el-form>
          <el-col :span="6">
            <el-card class="box-card">
              <el-form-item label="迭代周期：">
                <span>{{ projectCycle.begin+'~'+projectCycle.end }}</span>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col />
          <el-col />
          <el-col />
        </el-form>
      </el-row>
      <el-row :gutter="8">
        <el-form>
          <el-col :span="6">
            <el-card class="box-card">
              <el-form-item label="Product：">
                <el-select v-model="productData" placeholder="请选择Product：" @change="getProductProjectList">
                  <el-option
                    v-for="item in productList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <el-form-item label="Project：">
                <el-select v-model="projectData" placeholder="请选择Project：" @change="listenProject">
                  <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
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
            <el-card class="box-card">
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
    </div>
  </div>
</template>

<script>
import { getProjectList, getUserRoleList } from '@/api/zentao/user'
import { getZtProductList } from '@/api/zentao/product'
import { getZtProjectList, getProductProjectList, getZtProjectCycle } from '@/api/zentao/project'
import { getBugInfo } from '@/api/zentao/bug'
import { getZtTaskInfo } from '@/api/zentao/task'

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
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      userList: [],
      productData: '',
      productList: [],
      bugInfo: {},
      taskInfo: {},
      projectCycle: {},
      projectData: '',
      projectList: [],
      pageInfo: {
        'pageNum': 1,
        'pageSize': 10,
        'total': 100
      },
      form: {}
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
        this.productData = this.productList[0].name
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
        this.projectData = this.projectList[0].name
        this.getBugInfo(productId)
        this.getZtTaskInfo(productId)
        this.getZtProjectCycle(productId)
      })
    },
    listenProject(projectId) {
      this.getBugInfo(projectId)
      this.getZtTaskInfo(projectId)
      this.getZtProjectCycle(projectId)
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
