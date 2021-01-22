<template>
  <div class="card card2">
    <div class="card-header card2Header">
      <div class="row card2HeaderEl">
        <div class="col-sm-12 d-flex justify-content-between" v-if="data.order_status.toLowerCase() === 'processing' || data.order_status.toLowerCase() === 'delivered'">
          <div class="col-sm-3 text-center divAsButton">
            <b>{{data.id}}</b>
          </div>
          <div class="col-sm-3 text-center divAsButton" :style="'color: #0064B1;'">
            <b class='font-weight-normal'>DELIVERY TIME: {{data.delivery_time}}</b>
          </div>
          <div class="col-sm-3 text-center divAsButton">
            <b v-if="data.order_status.toLowerCase() === 'processing'" :style="'color: #FFBF51; text-transform: uppercase;'">{{data.order_status}}</b>
          </div>
          <div class="col-sm-3 text-center divAsButton" :style="'color: #0064B1;'">
            <b> PRINT ORDER </b>
          </div>
        </div>
        <div v-else-if="data.order_status.toLowerCase() === 'pending'" class="col-sm-12 text-center">
          <b style="color: #0064B1;"> NEW ORDER REQUEST AT 12:42 </b> 
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="col-sm-12">
      <div class="row">
        <div class="col-sm-7 orderInformation" :style="(data.order_status.toLowerCase() !== 'pending') ? 'height: calc(100vh - 378px) !important;' : 'height: calc(100vh - 280px) !important;'">
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
          <div v-for="(el, ndx) in restaurant" :key="'restaurant' + ndx" class="mt-2 pr-5">
            <div class="d-flex justify-content-between">
              <b :style="'color: #E07700'"> {{el.product.name}} </b>
              <b class="font-weight-normal"> {{data.customer_currency_code}} {{el.product.price}} </b>
            </div>
            <div class="col-sm-12" :style="'color: #E07700'">
              + {{el.product.short_description}}
            </div>
          </div>
          <div class="mt-3">
            <b :style="'color: #0064B1'"> Deli product Items: </b>
          </div>
          <div v-for="(el, ndx) in deliStore" :key="'deli' + ndx" class="mt-2 pr-5">
            <div class="d-flex justify-content-between">
              <b :style="'color: #E07700'"> {{el.product.name}} </b>
              <b class="font-weight-normal"> {{data.customer_currency_code}} {{el.product.price}} </b>
            </div>
            <div class="col-sm-12" :style="'color: #E07700'">
              + {{el.product.short_description}}
            </div>
          </div>
          <div class="mt-3">
            <b :style="'color: #0064B1'"> Other add-ons and requests: </b>
          </div>
          <div class="mt-2">
            <b :style="'color: #E07700'"> Contactless delivery </b>
          </div>
          <div class="mt-2">
            <b :style="'color: #E07700'"> Add cutlery </b>
          </div>
        </div>
        <div class="col-sm-5 customerInformation" :style="(data.order_status.toLowerCase() !== 'pending') ? 'height: calc(100vh - 378px) !important;' : 'height: calc(100vh - 280px) !important;'">
          <div v-if="data.order_status.toLowerCase() === 'processing' || data.order_status.toLowerCase() === 'delivered'">
            <div class="mt-3">
              <b class="head"> Customer Information </b>
            </div>
            <div class="mt-2">
              <b class="font-weight-normal"> {{ (data.customer.first_name + ' ' + data.customer.last_name).toUpperCase() }} </b>
            </div>
            <div class="mt-1">
              <b class="text-primary"> Contact customer </b>
            </div>
            <br>
            <div class="mt-5">
              <b class="head"> Address: </b>
            </div>
            <div>
              <b class="font-weight-normal" v-if="data.shipping_address.address1 !== '' && data.shipping_address.address1 !== null && data.shipping_address.address1 !== undefined">
                {{data.shipping_address.address1}}
              </b>
              <b class="font-weight-normal" v-else-if="data.shipping_address.address2 !== '' && data.shipping_address.address2 !== null && data.shipping_address.address2 !== undefined">
                {{data.shipping_address.address2}}
              </b>
              <i v-else> {{data.shipping_address.address1}} </i>
            </div>
            <div class="row sectionRow">
              <div class="totalSection">
                <div class="d-flex justify-content-between">
                  <b>
                    TOTAL
                  </b>
                  <b>
                    {{data.customer_currency_code}} {{data.order_total}}
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
                <button class="roundButtonCommon font-weight-normal" :style="dangerUnfocusStyle" data-toggle="modal" data-target="#reasonModal"> Unable to fulfill order </button>
              </div>
            </center>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="card-footer card2Footer" v-if="data.order_status.toLowerCase() === 'processing' || data.order_status.toLowerCase() === 'delivered'">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-3 p-3" v-for="(el, ndx) in progressButtons" :key="ndx">
            <div class="row" style="width: 100%;">
              <div class="col-sm-12 p-2 progressbtn">
                <div class="col-sm-8 p-0">
                  <b>{{el.text}}</b>
                </div>
                <div class="col-sm-4 p-0 Progress switch" v-if="data.order_status.toLowerCase() === 'processing'">
                  <div>
                    <i class="fas fa-check-circle switchIcon" :style="'margin-left: -6.5px; color: #7ABC87;'" v-if="el.status.toLowerCase() === 'yes'"></i>
                    <b v-else> {{el.status}} </b>
                  </div>
                  <div>
                    <b v-if="el.status.toLowerCase() === 'yes'"> {{el.status}} </b>
                    <i class="fas fa-circle switchIcon" :style="emptyCircle"  v-else></i>
                  </div>
                </div>
                <div class="col-sm-4 p-0 Progress switch" v-if="data.order_status.toLowerCase() === 'delivered'">
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
    <div class="modal fade bd-example-modal-lg reasonModalContainer" id="reasonModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg reasonModal" role="document">
        <div class="modal-content">
          <div class="modal-header modalHeader">
            <b class="font-weight-bold reasonHeader"> UNABLE TO FULFILL ORDER </b>
            <button type="button" class="xButton close" data-dismiss="modal" aria-label="Close">
              <b>&times;</b>
            </button>
          </div>
          <div class="modal-body pt-2">
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-4" v-for="(el, ndx) in rejectReasons" :key="'reason' + ndx">
                  <div class="reasonCard">
                    <div class="mb-2">
                      <input type="radio" class="radio" :name="'reason' + ndx">
                    </div>
                    <div>
                      <b>{{el}}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer modalFooter">
            <button class="roundButtonCommon rejectButton font-weight-bold"> REJECT ORDER </button>
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
      rejectReasons: ['Item unavailable', 'Too busy to process order', 'Too late to take order'],
      focusIndex: 0,
      restaurant: [],
      deliStore: []
    }
  },
  methods: {},
  mounted() {
    this.data.order_items.forEach(el => {
      if(el.product.category_type === 0){
        this.restaurant.push(el)
      }else if(el.product.category_type === 1){
        this.deliStore.push(el)
      }
    })
  },
  watch: {
    restaurant: function(_new, old) {
      return _new
    },
    deliStore: function(_new, old) {
      return _new
    }
  }
}
</script>
<style scoped>
.divAsButton {
  cursor: pointer;
}
.customerInformation {
  padding-bottom: 50px !important;
  border: 1px solid #707070;
}
.orderInformation {
  border: 1px solid #707070;
  /* height: calc(100vh - 378px) !important; */
  overflow-y: scroll;
  padding-bottom: 50px;
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
.xButton {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #FFFFFF;
  color: #FF0045;
  border-radius: 50%;
  width: 27px;
  height: 27px;
  margin: 0 auto;
  padding: 0;
  padding-top: -10px !important;
  padding-bottom: 10px !important;
  display: table-cell;
  vertical-align: middle;
  opacity: 1;
  margin-top: -10px;
  margin-right: -10px;
}
.xButton:after {
  opacity: 0.2 !important;
}
.xButton:focus {
  outline: none;
  box-shadow: none;
}
.modalHeader {
  display: flex;
  text-align: center;
  justify-content: center;
  border: 0px;
  min-height: 92px;
}
.modalFooter {
  display: flex;
  text-align: center;
  justify-content: center;
  border: 0px;
  min-height: 92px;
  padding-bottom: 50px;
  padding-top: 30px;
}
.reasonCard {
  -webkit-box-shadow: 1px 1px 15px 0px rgba(0,0,0,0.19); 
  box-shadow: 1px 1px 15px 0px rgba(0,0,0,0.19);
  min-height: 110px;
  padding: 15px;
  margin-top: 7px;
  display: block;
  text-align: center;
  justify-content: center;
}
.radio {
  width: 19px;
  height: 19px;
  border: 1px solid #0064B1;
}

input[type='radio']:before {
  width: 19px;
  height: 19px;
  border: 1px solid #707070 !important;
}

input[type="radio"]:checked:before {
  background: #0064B1;
}

input[type="radio"]:checked {
  border-color:#0064B1;
}
.rejectButton {
  background-color: #BE0000;
  color: white;
}
.reasonHeader {
  color:  #BE0000;
  font-size: 18px;
}
.reasonModalContainer {
  margin-top: -50px; 
  text-align: center;
  padding: 0!important;
}

.reasonModalContainer:before {
  content: '';
  display: inline-block;
  min-height: 100%;
  vertical-align: middle;
}

.reasonModal {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
.orderInformation::-webkit-scrollbar-track
{
	/* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
	background-color: #F5F5F5;
}
.orderInformation::-webkit-scrollbar
{
  width: 7px;
	background-color: #F5F5F5;
}
.orderInformation::-webkit-scrollbar-thumb
{
	background-color: #707070;
	border: 0px;
  border-radius: 10px;
}
</style>
