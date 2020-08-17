<template>
  <dv-full-screen-container id="dashboard" style="background: #021232;">
    <el-row
      :gutter="8"
    >
      <el-col
        :span="24"
        name="禅道看板"
      >
        <ZentaoDashboard />
      </el-col>
      <!-- <el-col :span="12" name="Sonar看板">
          <SonarDashboard />
        </el-col> -->
    </el-row>

  </dv-full-screen-container>
</template>

<script>
import SonarDashboard from '@/components/Sonar/dashboard'
// import ZentaoDashboard from '@/components/zentao/dashboard'
import ZentaoDashboard from '@/views/zentao/dashboardv1/dashboard'

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
