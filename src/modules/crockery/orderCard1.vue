<template>
  <div class="card card1" v-if="Object.keys(data).length > 0">
    <div class="card-header car1Header">
      <div class="col-sm-12 p-0 d-flex justify-content-center mt-2">
        <b>{{ data.order_id }}</b>
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
        <b class="font-weight-normal"> {{ data.order_details.shipping_address.first_name + ' ' + data.order_details.shipping_address.last_name }} </b>
      </div>
      <div class="mt-1">
        <b class="text-primary"> {{data.order_details.shipping_address.phone_number}} </b>
      </div>
      <div class="mt-5">
        <b class="head"> Address: </b>
      </div>
      <div>
        <b class="font-weight-normal">
          {{ data.order_details.shipping_address.address1 + ', ' + data.order_details.shipping_address.city + ', ' + data.order_details.shipping_address.country}}
        </b>
      </div>
      <div class="marginTop text-center" v-if="['pickup', 'returninperson'].includes(data.crockery_status.toLowerCase())">
        <button class="successButton buttonCommon" style="cursor:pointer;" @click="acceptCrockery(data.id, data.address_id)"> ACCEPT </button>
      </div>
      <div class="marginTop" v-else-if="(data.crockery_status.toLowerCase() === 'processing')">
        <center>
          <div class="successButton buttonCommon progressAccepted"><i class="fas fa-check-circle mr-4"></i> ACCEPTED </div>
          <div class="mt-3 buttonCommon progressCollect" style="cursor:pointer;" @click="collected(data.id, data.address_id)"> COLLECT </div>
          <div class="mt-5 buttonCommon reschedule" style="cursor:pointer;" @click="reschedule(data.id, data.address_id)"><p> RESCHEDULE COLLECTION </p></div>
        </center>
      </div>
      <div class="marginTop" v-else-if="(data.crockery_status.toLowerCase() === 'reschedule')">
        <center>
          <div class="successButton buttonCommon progressAccepted"><i class="fas fa-check-circle mr-4"></i> ACCEPTED </div>
          <div class="mt-5 buttonCommon reschedule" style="cursor:pointer;background-color:#800000;color:white;height: 80px;border-radius: 30px;border: 1px solid black;"><p> RESCHEDULE REQUESTED </p></div>
        </center>
      </div>
      <div class="marginTop" v-else-if="data.order_details.order_status.toLowerCase() === 'complete'">
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
import AUTH from 'src/services/auth'
export default {
  data() {
    return {}
  },
  methods: {
    acceptCrockery(id, addID) {
      const { user } = AUTH
      this.APIPutRequest(`update_crockery?CrockeryId=${id}&AddressId=${addID}&CrockeryStatusId=40`, {}, response => {
        console.log('READING IN ACCEPT', response)
        this.$parent.retrieveNotification()
        this.$parent.retrieveCrockeryByStatus([20, 30], 0)
      })
    },
    reschedule(id, addID) {
      const { user } = AUTH
      this.APIPutRequest(`update_crockery?CrockeryId=${id}&AddressId=${addID}&CrockeryStatusId=45`, {}, response => {
        console.log('READING IN ACCEPT', response)
        this.$parent.retrieveNotification()
        this.$parent.retrieveCrockeryByStatus([40, 45], 0)
      })
    },
    collected(id, addID) {
      this.APIPutRequest(`update_crockery?CrockeryId=${id}&AddressId=${addID}&CrockeryStatusId=50`, {}, response => {
        console.log('READING IN ACCEPT', response)
        this.$parent.retrieveNotification()
        this.$parent.retrieveCrockeryByStatus(50, 0)
        this.$parent.focusIndex = 2
      })
    }
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
  margin-bottom: 100px;
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
  margin-top: 60px;
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
