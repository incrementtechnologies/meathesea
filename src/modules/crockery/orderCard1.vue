<template>
  <div class="card card1">
    <div class="card-header car1Header">
      <div class="col-sm-12 p-0 d-flex justify-content-center mt-2">
        <b>{{ data.order_number }}</b>
      </div>
      <div class="col-sm-12 p-0 d-flex justify-content-center mt-2 mb-3">
        <b class="font-weight-normal">PICK-UP TIME: {{ data.pickup_time }}</b>
      </div>
    </div>
    <div class="card-body">
      <div class="mt-3">
        <b class="head"> Customer Information </b>
      </div>
      <div class="mt-2">
        <b class="font-weight-normal"> {{ data.full_name.toUpperCase() }} </b>
      </div>
      <div class="mt-1">
        <b class="text-primary"> Contact customer </b>
      </div>
      <div class="mt-5">
        <b class="head"> Address: </b>
      </div>
      <div>
        <b class="font-weight-normal">
          {{ data.address }}
        </b>
      </div>
      <div class="marginTop text-center" v-if="data.order_status === 'pending'">
        <button class="successButton buttonCommon"> ACCEPT </button>
      </div>
      <div class="marginTop" v-else-if="data.order_status === 'processing'">
        <center>
          <div class="successButton buttonCommon progressAccepted"><i class="fas fa-check-circle mr-4"></i> ACCEPTED </div>
          <div class="mt-3 buttonCommon progressCollect"> COLLECT </div>
          <div class="mt-5 buttonCommon reschedule"> reschedule collection </div>
        </center>
      </div>
      <div class="marginTop" v-else-if="data.order_status === 'complete'">
        <center>
          <div class="successButton buttonCommon progressAccepted"><i class="fas fa-check-circle mr-4"></i> ACCEPTED </div>
          <div class="mt-3 successButton buttonCommon progressAccepted"><i class="fas fa-check-circle mr-4"></i> COLLECTED </div>
        </center>
      </div>
    </div>
  </div>
</template>
<script>
import props from '../../components/stripe/props'
export default {
  data() {
    return {}
  },
  props: ['data'],
  watch: {
    data(_new, old) {
      return this.data
    }
  }
}
</script>
<style scoped>
.card1 {
  border: 1px solid #707070;
  width: 365px !important;
  /* min-height: calc(100vh - 205px) !important; */
}
.car1Header {
  background-color: #FFFFFF;
  border-bottom: 1px solid #707070;
}
.buttonCommon {
  height: 64px;
  width: 243px;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 50px;
  font-weight: bold;
  cursor: default;
}
.successButton {
  background-color: #17B56D;
  border: none;
  color: #FFFFFF;
}
.buttonCommon:focus {
  outline: none;
  box-shadow: none;
}
.marginTop {
  margin-top: 70px;
}
.progressAccepted {
  display: flex;
  align-items: center;
  justify-content: center;
}
.progressCollect {
  border: 1px solid #17B56D;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #17B56D;
}
.reschedule {
  border: 1px solid #BE0000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #BE0000;
  height: 50px;
}
</style>
