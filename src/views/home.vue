<template>
  <div class="dashboard-container">
    <el-button type="primary" plain @click="goto">大屏监控</el-button>
    <div class="dashboard-editor-container">
      <el-row
        :gutter="8"
      >
        <el-col
          :span="12"
          name="禅道看板"
        >
          <ZentaoDashboard />
        </el-col>
        <el-col :span="12" name="Sonar看板">
          <SonarDashboard />
        </el-col>
      </el-row>
    </div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :visibility-height="1" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import SonarDashboard from '@/components/Sonar/dashboard'
import ZentaoDashboard from '@/components/zentao/dashboard'

export default {
  name: 'Dashboard',
  components: {
    'SonarDashboard': SonarDashboard,
    'ZentaoDashboard': ZentaoDashboard
  },

  data() {
    return {

    }
  },

  mounted() {

  },
  methods: {
    goto() {
      this.$router.push({ path: '/zentao/dashboard-fullscreen' })
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
