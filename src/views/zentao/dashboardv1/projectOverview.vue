<template>
  <div style="width: 100%;background: #021232;height: 180px;">

    <div class="unit">
      <svg-icon icon-class="ztuser" style="width: 20%; height:40%;margin-left:20px; margin-top: 10%;" />
      <div class="number">{{ totalPeople }}</div>
      <div class="label">成员数</div>
    </div>
    <div class="unit">
      <svg-icon icon-class="ztTask" style="width: 20%; height:40%;margin-left:20px; margin-top: 10%;" />
      <div class="number">{{ taskAmount }}</div>
      <div class="label">任务数</div>
    </div>
    <div class="unit">
      <svg-icon icon-class="ztworktime" style="width: 20%; height:40%;margin-left:20px; margin-top: 10%;" />
      <div class="number">{{ totalWorkTime }}</div>
      <div class="label">工时数</div>
    </div>
    <div class="unit">
      <svg-icon icon-class="bug" style="width: 20%; height:40%;margin-left:20px; margin-top: 10%;" />
      <div class="number">{{ bugAmount }}</div>
      <div class="label">BUG数</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProjectOverview',
  props: {
    totalPeople: {
      type: Number,
      default: 0
    },
    taskAmount: {
      type: Number,
      default: 0
    },
    totalWorkTime: {
      type: Number,
      default: 0
    },
    bugAmount: {
      type: Number,
      default: 0
    }},
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
  }

}
</script>

<style>
.unit {
  display: inline-block;
  border-top: 2px solid #F7B500;
  height: 129px;
  width: 21%;
  margin-left: 2.4%;
  background: #031E55;
  margin-top: 25px;
}
.number {
  display: inline-block;
  font-family: PingFangSC-Semibold;
  font-size: 50px;
  color: #F7B500;
  letter-spacing: 0;
  text-align: center;
  margin-left: 18px;
  padding-bottom: 35px;
  width:100px;
}
.label {
  display: inline-block;
  font-family: PingFangSC-Medium;
  font-size: 125%;
  color: #32C5FF;
  letter-spacing: 0;
  float: right;
  margin-top: 15%;
  margin-right: 5%;
}

</style>
