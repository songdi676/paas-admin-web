<template>
  <div id="overviewManHoursDiv">
    <el-table

      :data="tableData"
      height="300"
      size="small"
      style="width: 100%; "
      background="red"
      :row-class-name="tableRowClassName"
      :header-cell-style="tableHeaderColor"
      :header-row-class-name="tableHeaderFont"
      :row-style="rowStyle"
    >
      <template slot="empty">
        <img class="data-pic" src="#" alt="">
      </template>
      <el-table-column
        prop="realname"
        label="人员"
        width="105"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="color: #32C5FF;text-align: center;display: block;">{{ scope.row['realname'] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalManHour"
        label="分配工时"
        width="105"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="color: #32C5FF;text-align: center;display: block;">{{ scope.row['totalManHour'] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expendManHour"
        label="实际消耗"
        width="105"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="color: #32C5FF;text-align: center;display: block;">{{ scope.row['expendManHour'] }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="efficiency"
        label="效率"
        width="70"
        header-align="center"
      >
        <template slot-scope="scope">
          <div v-html="formateHtml(scope.row.efficiency)" />
        </template>
      </el-table-column> -->
      <el-table-column
        prop="bugs"
        label="bugs"
        width="60"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="color: #32C5FF;text-align: center;display: block;">{{ scope.row['bugs'] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="yesterdayConsumption"
        label="昨日消耗"
        width="105"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="color: #32C5FF;text-align: center;display: block;">{{ scope.row['yesterdayConsumption'] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserWorkInfo } from '@/api/zentao/user'

export default {
  name: 'OverviewManHours',
  props: {
    project: {
      type: Number,
      required: true
    },
    team: {
      type: String,
      default: '一'
    },
    dept: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      tableData: [],
      projectName: ''
    }
  },
  watch: {
    'project': function() {
      this.getData()
    }
  },
  created() {

  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
  },
  methods: {
    getData() {
      if (!this.project) {
        return
      }
      getUserWorkInfo({ project: this.project }).then(t => {
        this.tableData = t
      })
    },
    getGroup() {

    },
    tableRowClassName({ row, rowIndex }) {
      // console.log(rowIndex)
      if ((rowIndex + 1) % 2 === 0) {
        return 'odd-row'
      }
      return 'even-row'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 3) {
        return 'background-color: #0A3893;color:#F7B500;font-weight: 500;'
      }
      return 'background-color: #0A3893;color:#32C5FF;font-weight: 500;'
    },
    tableHeaderFont() {
      return 'headerFont'
    },
    rowStyle() {
      return 'color:#32C5FF;'
    },
    formateHtml(cellValue) {
      const cell = parseInt(cellValue)
      const color = cell >= 1 ? '#F7B500' : 'red'
      return (`<span style="color:${color};text-align: center;display: block;">${cellValue}</span>`)
    }
  }
}
</script>

<style>
  .el-table .el-table__body tbody{
    background-color: transparent;
  }
  .el-table .el-table__body tbody .even-row{
    background: #052767;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
    /* background-color: transparent; */
  }
  .el-table .el-table__body tbody .odd-row {
    /* opacity: 0.15; */
    background: #0A3893;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
    /* background-color: transparent; */
  }
  .headerFont{
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }
  span #group{
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #32C5FF;
    letter-spacing: 0;
    text-align:center;
    line-height:50px;
    display: block;
    height: 50px;
    /* background-image: linear-gradient(180deg, #02215E 14%, #082D78 100%); */
    background-color:#021232;
  }
  #overviewManHoursDiv{
    background-color:#021232;
  }
  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

</style>
