<template>
  <div class="card card2">
    <div class="card-header card2Header">
      <div class="row card2HeaderEl">
        <div class="col-sm-12 d-flex justify-content-between" v-if="data.order_status === 'processing' || data.order_status === 'complete'">
          <div class="col-sm-3 text-center">
            <b>{{data.order_number}}</b>
          </div>
          <div class="col-sm-3 text-center">
            <b class='font-weight-normal'>DELIVERY TIME: {{data.delivery_time}}</b>
          </div>
          <div class="col-sm-3 text-center">
            <b v-if="data.order_status !== 'processing'">{{data.order_status}}</b>
          </div>
          <div class="col-sm-3 text-center">
            <b> PRINT ORDER </b>
          </div>
        </div>
        <div v-else-if="data.order_status === 'pending'" class="col-sm-12 text-center">
          <b style="color: #0064B1;"> NEW ORDER REQUEST AT 12:42 </b> 
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="col-sm-12">
      <div class="row">
        <div class="col-sm-7 orderInformation">
          <div class="row">
            <div v-if="data.order_status === 'pending'" class="col-sm-12 pt-3 pb-3 pendingCustomerInformation">
              <div class="row">
                <div class="col-sm-5">
                  <div>
                    <b> Customer Information </b>
                  </div>
                  <div>
                    <b class="font-weight-normal"> JOHN DOE </b>
                  </div>
                  <div>
                    <b style="color: #0064B1;"> Contact number </b>
                  </div>
                </div>
                <div class="col-sm-7">
                  <div>
                    <b>
                      Deliver to:
                    </b>
                  </div>
                  <div>
                    <b class="font-weight-normal"> Center Stage Tower 1 (101 Hollywood road, Central) Floor 1, unit C </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <b :style="'color: #0064B1'"> Restaurant Items: </b>
          </div>
          <div v-for="(el) in 2" :key="el + 'test'" class="mt-2 pr-5">
            <div class="d-flex justify-content-between">
              <b :style="'color: #E07700'"> Item name </b>
              <b class="font-weight-normal"> HK$ XX </b>
            </div>
            <div class="col-sm-12" :style="'color: #E07700'">
              + Description
            </div>
          </div>
          <div class="mt-3">
            <b :style="'color: #0064B1'"> Deli product Items: </b>
          </div>
          <div v-for="(el) in 2" :key="el" class="mt-2 pr-5">
            <div class="d-flex justify-content-between">
              <b :style="'color: #E07700'"> Item name </b>
              <b class="font-weight-normal"> HK$ XX </b>
            </div>
            <div class="col-sm-12" :style="'color: #E07700'">
              + Description
            </div>
          </div>
        </div>
        <div class="col-sm-5 customerInformation" :style="(data.order_status !== 'pending') ? 'min-height: calc(100vh - 378px) !important;' : 'min-height: calc(100vh - 280px) !important;'">
          <div v-if="data.order_status.toLowerCase() === 'processing' || data.order_status === 'complete'">
            <div class="mt-3">
              <b class="head"> Customer Information </b>
            </div>
            <div class="mt-2">
              <b class="font-weight-normal"> {{ data.full_name.toUpperCase() }} </b>
            </div>
            <div class="mt-1">
              <b class="text-primary"> Contact customer </b>
            </div>
            <br>
            <div class="mt-5">
              <b class="head"> Address: </b>
            </div>
            <div>
              <b class="font-weight-normal">
                {{ data.address }}
              </b>
            </div>
            <div class="row sectionRow">
              <div class="totalSection">
                <div class="d-flex justify-content-between">
                  <b>
                    TOTAL
                  </b>
                  <b>
                    HK$ XXX
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="data.order_status.toLowerCase() === 'pending'">
            <center>
              <div class="mt-4 mb-4">
                <b style="color: #00AF5F;"> ACCEPT FOR: </b>
              </div>
              <div class="mt-2" v-for="(el, ndx) in times" :key="'time' + ndx">
                <button class="squareButtonCommon" @click="focusIndex = ndx" :style="(focusIndex != ndx) ? unfocusStyle : focusStyle"> {{el}} </button>
              </div>
              <div class="mt-5">
                <button class="roundButtonCommon font-weight-bold" :style="focusStyle"> ACCEPT </button>
              </div>
              <div class="mt-3">
                <button class="roundButtonCommon font-weight-normal" :style="dangerUnfocusStyle"> Unable to fulfill order </button>
              </div>
            </center>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="card-footer card2Footer" v-if="data.order_status === 'processing' || data.order_status === 'complete'">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-3 p-3" v-for="(el, ndx) in progressButtons" :key="ndx">
            <div class="row" style="width: 100%;">
              <div class="col-sm-12 p-2 progressbtn">
                <div class="col-sm-8 p-0">
                  <b>{{el.text}}</b>
                </div>
                <div class="col-sm-4 p-0 Progress switch" v-if="data.order_status === 'processing'">
                  <div>
                    <i class="fas fa-check-circle switchIcon" :style="'margin-left: -6.5px; color: #7ABC87;'" v-if="el.status.toLowerCase() === 'yes'"></i>
                    <b v-else> {{el.status}} </b>
                  </div>
                  <div>
                    <b v-if="el.status.toLowerCase() === 'yes'"> {{el.status}} </b>
                    <i class="fas fa-circle switchIcon" :style="emptyCircle"  v-else></i>
                  </div>
                </div>
                <div class="col-sm-4 p-0 Progress switch" v-if="data.order_status === 'complete'">
                  <div class="meantime d-flex">
                    <i class="fas fa-check-circle switchIcon" :style="'margin-left: -6.5px; color: #7ABC87;'"></i>
                    <b class="ml-1"> Yes </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3 text-center p-2 Progress cancelWrapper">
            <div class="cancel">
              <b>
                CANCEL ORDER
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      emptyCircle: 'margin-right: -5px; color: #FFFFFF; border: 1px solid #B2AFAF; border-radius: 20px; font-size: 27px !important; margin-top: 0px;',
      progressButtons: [
        {text: 'Processing order', status: 'Yes'},
        {text: 'Out for delivery', status: 'No'},
        {text: 'Delivered', status: 'No'}
      ],
      focusStyle: 'background-color: #00AF5F; color: #FFFFFF; border 1px solid #00AF5F !important;',
      unfocusStyle: 'background-color: #FFFFFF; border: 1px solid #00AF5F; color: #00AF5F; border 1px solid #00AF5F !important;',
      dangerUnfocusStyle: 'background-color: #FFFFFF; border: 1px solid #BE0000; color: #BE0000; border 1px solid #00AF5F !important;',
      times: ['13:00 - 13:15', '13:15 - 13:30', '13:30 - 13:45'],
      focusIndex: 0
    }
  },
  methods: {}
}
</script>
<style scoped>
.customerInformation {
  padding-bottom: 50px !important;
  border: 1px solid #707070;
}
.orderInformation {
  border: 1px solid #707070;
}
.card2 {
  border: none;
}
.card2Header {
  display: flex;
  align-items: center;
  border: 1px solid #707070;
  border-radius: 0px;
  min-height: 72px;
  background-color: #FFFFFF;
}
.card2HeaderEl {
  display: flex !important;
  align-items: 'center' !important;
  width: 100%;
}
.card2Footer {
  min-height: 72px;
  background-color: #FFFFFF;
  border: 1px solid #707070;
  padding-top: 2px;
  padding-bottom: 2px;
  display: flex;
  justify-content: center !important;
}
.totalSection {
  min-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  border-top: 1px solid #707070;
  display: flex;
  align-items: center;
}
.totalSection div {
  width: 100%;
}
.sectionRow {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.Progress {
  display: flex;
  align-items: center;
  background-color: #FFFFFF; 
}
.progressbtn {
  display: flex;
  align-items: center;
  height: 64px;
  width: 243px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 50px;
  cursor: default;
  border: 1px solid #B2AFAF;
  color: #585858;
}
.switch {
  height: 31px;
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  border: 1px solid #B2AFAF;
  border-radius: 20px;
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.switchIcon {
  margin-top: 1.7px;
  font-size: 30px;
}
.cancel {
  display: flex;
  align-items: center;
  height: 63px;
  color: #BE0000;
}
.cancelWrapper {
  display: flex;
  align-items: center !important;
  justify-content: center;
  align-items: center !important;
}
.squareButtonCommon {
  height: 52px;
  width: 219px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  border: 0px;
}
.squareButtonCommon:focus {
  outline: none;
  box-shadow: none;
}
.roundButtonCommon {
  height: 64px;
  width: 219px;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 50px;
  cursor: default;
  border: 0px;
}
.roundButtonCommon:focus {
  outline: none;
  box-shadow: none;
}
.pendingCustomerInformation {
  border-bottom: 1px solid #707070;
}
.meantime {
  align-items: center;
  justify-content: space-between !important;
}
</style>
