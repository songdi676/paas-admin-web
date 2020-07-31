<template>
  <div class="dashboard-container">
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
