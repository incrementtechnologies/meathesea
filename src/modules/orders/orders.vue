<template>
  <div class="container-fluid pt-0 mb-5">
    <div class="row" :style="!widerView ? 'border: 1px solid #707070;' : 'border: none;'">
      <div class="col-sm-5 cardbodyborder initialHeight" v-if="!widerView">
        <div class="row">
          <div class="col-sm-12 p-0">
            <div class="card nav_card">
              <div class="card-header p-0 nav_header">
                <div class="row pl-3 pr-3">
                  <div 
                    class="col-sm-4 navs" 
                    v-for="(nav, ndx) in navs" 
                    :key="ndx + 'navs'" 
                    @click="change(ndx)" 
                    :style="(focusIndex === ndx) ? focusStyle + 'color: ' + nav.color : unfocusStyle + 'color: ' + nav.color"
                  >
                    {{nav.name}}
                    <div class="notifications ml-3" v-if="nav.isNotification" :style="'background-color: ' + nav.notificationColor">
                      <b :style="'color :' + nav.notificationTextColor">{{nav.count}}</b>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body p-0 crockeriesBody">
                <div
                  class="col-sm-12 mt-3 crockeriesContainer"
                  v-for="(el, ndx) in returnData" 
                  :key="ndx + 'body'" 
                  :id="String(ndx) + navs[focusIndex]"
                  :style="'background-color: ' + navs[focusIndex].background"
                  @click='selectData(ndx, String(ndx) + navs[focusIndex])'
                >
                  <div 
                    class="d-flex justify-content-between crockeries"
                    :style="(selectedDataIndex === ndx) ? 'background-color: ' + navs[focusIndex].background : '; background-color: white;'"
                  >
                    <div v-if="!returnHeaderElements[typeIndex].changeDate && !returnHeaderElements[typeIndex].changeDate">{{el.id}}</div>
                    <div>
                      {{
                        el.delivery_time_requested === 'ASAP'
                        ?
                          el.local_time_created
                        :
                          el.delivery_time_requested
                      }}
                    </div>
                  </div>
                </div>
                <div v-if="data.length === 0" class="notFoundContainer">
                  <div class="notFound text-center">
                    <img :src="require('src/assets/img/logo_white.png')" style="width: 20%; height: auto;"/>
                    <div class="mt-2">
                      <b class="font-weight-normal"> 404 | No data yet</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="'p-0 ' + ((widerView) ? 'col-sm-12': 'col-sm-7')">
        <div class="card infoCard">
          <!-- <navbar v-bind:buttons="[
          { text: 'TODAY', colorLine: 'blue', type: 'button', componentTocall: 'card', wholeView: 'false', shorterView: 'true' },
          { text: 'THIS WEEK', colorLine: 'blue', type: 'button', componentTocall: 'table', wholeView: 'false', shorterView: 'true' },
          { text: 'ALL ORDERS', colorLine: 'red', type: 'button', componentTocall: 'table', wholeView: 'true', shorterView: 'true' }
          ]"
          @btnClick="sample"
          /> -->
          <div class="card-header infoCardHeader" :style="widerView ? 'border-left: 1px solid white; margin-left: -1px !important;' : ''">
            <div class="row">
              <div class="mt-1" v-if="widerView" style="width: 7%;">
                <center><i class="fas fa-arrow-alt-circle-left smallerView" @click="widerView = !widerView; switchComponent('card', 0)"></i></center>
              </div>
              <div
                v-for="(el, ndx) in returnHeaderElements"
                :key="String(ndx) + el.text"
                class="elWrapper p-1"
                :style="'width: ' + ((!widerView) ? el.column : el.wholeViewColumn) + (widerView ? '!important;' : '')"
              >
                <button 
                  class="buttonel" 
                  :style="el.style + 'background-color: ' + ((typeIndex === ndx || (widerView && typeIndex === ndx) ) ? el.focusedBackground + ';color: ' + el.focusedColor: '#FFFFFF; color: ' + el.unfocusedColor)"
                  v-if="el.type.toLowerCase() === 'button' && (!widerView || el.wholeView)"
                  @click="switchComponent(el.componentTocall.toLowerCase(), ndx)"
                >
                  {{el.text}}
                </button>
                <input 
                  type="text" 
                  class="buttonel"
                  v-model="search"
                  :style="el.style + ' padding: 15px;'"
                  :placeholder="el.text" 
                  v-else-if="el.type.toLowerCase() === 'input'"
                >
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <!-- <card1 :data="data[focusIndex][selectedDataIndex]" v-if="componentType === 'card'"/> -->
            <card2 
              :data="returnData[selectedDataIndex]" 
              v-if="data.length > 0 && componentType === 'card' && returnReRender"
              :restaurant="restaurant"
              :deliStore="deliStore"
              :times="times"
              @orderProcessed="acceptOrder"
            />
            <dataTable 
              v-else-if="componentType === 'table' && reRenderTable"
              :headers="tableHeaders"
              :tableData="allOrders"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import card1 from '../crockery/orderCard1.vue'
import card2 from '../orders/orderCard2.vue'
import dataTable from '../crockeryAndOrders/table'
import { APIGetRequest } from 'src/helpers/api'
import AUTH from 'src/services/auth'
import property from './property'
import LogInVue from '../../components/increment/basic/LogIn.vue'
import moment from 'moment'
export default {
  components: {
    card1,
    card2,
    dataTable
  },
  data() {
    return {
      tableHeaders: property.tableHeaders,
      navs: property.navs,
      headerElements: property.headerElements,
      data: [[], [], []],
      focusStyle: 'border-left: 1px solid #707070; border-right: 1px solid #707070; background-color: white;',
      unfocusStyle: 'border: 1px solid #707070; border-bottom: 1px solid #707070; border-top: none; background-color: #E1E1E1;',
      focusIndex: 0,
      selectedDataIndex: 0,
      typeIndex: 0,
      componentType: 'card',
      widerView: false,
      restaurant: [],
      deliStore: [],
      reRender: true,
      reRenderTable: true,
      tableData: [],
      createdAtMin: null,
      createdAtMax: null,
      currentDate: new Date(),
      currentIndex: 0,
      search: '',
      allOrders: [],
      times: []
    }
  },
  // created() {},
  created() {
    this.getDate('day', null)
    this.retrieveNotification()
  },
  mounted() {
    this.reRenderTable = false
    this.reRender = false
  },
  watch: {
    data: function(_new) {
      return _new
    },
    reRender: function(_new) {
      return _new
    },
    focusIndex: function(_new) {
      return _new
    }
  },
  computed: {
    returnHeaderElements() {
      let a = []
      if(this.widerView) {
        a = this.headerElements.filter(el => {
          return el.wholeView
        })
      }else {
        a = this.headerElements.filter(el => {
          return el.shorterView
        })
      }
      return a
    },
    returnCardData() {
      console.log('[RETURN DATA]', this.data[this.returnSelectedDataIndex])
      return this.data[this.returnSelectedDataIndex]
    },
    returnFocusedData() {
      return this.data
    },
    filteredOrders(){
      return this.data[this.currentIndex].filter(el => {
        if(el.order_number.includes(this.search) || el.created_on_utc.includes(this.search) || el.order_status.toLowerCase().includes(this.search.toLowerCase())){
          return el
        }
      })
    },
    returnfocusIndex() {
      return this.focusIndex
    },
    returnData() {
      return this.data
    },
    returnReRender() {
      return this.reRender
    },
    returnSelectedDataIndex() {
      return this.selectedDataIndex
    },
    returnTypeIndex() {
      return this.typeIndex
    }
  },
  methods: {
    sample(e) {
      console.log('Test::: ', e)
    },
    retrieveOrders () {
      const { user } = AUTH
      this.reRender = true
      this.data = []
      // if(!this.widerView){
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/orders?CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}&Status=10&StoreId=${user.userID}`, response => {
        $('#loading').css({'display': 'none'})
        console.log('[RESPONSE]', response)
        // response.orders.map((item, ndx) => {
        //   item.local_time_created = moment(item.local_time_created, ['HH:mm']).format('hh:mm')
        // })
        this.data = response.orders
        // response.orders.forEach(el => {
        //   console.log(el)
        //   if(el.order_status.toLowerCase() === 'pending' && el !== undefined) {
        //     this.currentIndex = 0
        //     this.data[0].push(el)
        //   }else if((el.order_status.toLowerCase() === 'processing' || el.order_status.toLowerCase() === 'delivering') && el !== undefined) {
        //     this.currentIndex = 1
        //     this.data[1].push(el)
        //   }else if(el.order_status.toLowerCase() === 'complete' && el !== undefined){
        //     this.currentIndex = 2
        //     this.data[2].push(el)
        //   }
        // })
        console.log(this.data)
        this.selectData(this.selectedDataIndex, 0)
        this.reRender = true
        this.reRenderTable = true
      }, error => {
        console.log(error, ' <-=---------- ERROR <-|->')
      })
      // }
      // else if(this.widerView) {
      //   console.log('wider view all ')
      //   if(this.typeIndex === 0){
      //     $('#loading').css({'display': 'block'})
      //     this.reRenderTable = false
      //     this.APIGetRequest(`orders?Status=50&Status=60&Status=70&StoreId=${user.userID}`, response => {
      //       console.log('Rejected data : ', response)
      //       $('#loading').css({'display': 'none'})
      //       this.allOrders = response.orders
      //       this.reRenderTable = true
      //     }, error => {
      //       console.log('Retrieving All Orders ERROR: ', error)
      //     })
      //   }else if(this.typeIndex === 1) {
      //     $('#loading').css({'display': 'block'})
      //     this.reRenderTable = false
      //     this.APIGetRequest(`orders?StoreId=${user.userID}`, response => {
      //       console.log('All Orders : ', response)
      //       $('#loading').css({'display': 'none'})
      //       this.allOrders = response.orders
      //       this.reRenderTable = true
      //     }, error => {
      //       console.log('Retrieving All Orders ERROR: ', error)
      //     })
      //   }
      // }
    },
    retrieveNotification(){
      const {user} = AUTH
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/orders/count?Status=10&StoreId=${user.userID}`, response => {
        this.navs[0].count = response.count
      })
      this.APIGetRequest(`/orders/count?Status=25&Status=20&StoreId=${user.userID}`, response => {
        this.navs[1].count = response.count
      })
      this.APIGetRequest(`/orders/count?Status=30&StoreId=${user.userID}`, response => {
        this.navs[2].count = response.count
      })
    },
    returnDate(el) {
      let date = new Date(new Date().toLocaleDateString().replaceAll('/', '-'))
      let yesterday = ('' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() - 1)).slice(-2) + '-' + date.getFullYear()
      if(!this.returnHeaderElements[this.typeIndex].changeDate) {
        return new Date(el.created_on_utc).toLocaleTimeString()
      }else if(new Date(el.created_on_utc).toLocaleDateString().replaceAll('/', '-') === new Date().toLocaleDateString().replaceAll('/', '-')) {
        return 'Today'
      }else if(new Date(el.created_on_utc).toLocaleDateString().replaceAll('/', '-') === yesterday) {
        return 'Yesterday'
      }else {
        return new Date(el.created_on_utc).toLocaleDateString().replaceAll('/', '-')
      }
    },
    change(ndx) {
      console.log('TEsting', ndx, ' :: ', this.currentIndex)
      this.reRender = false
      this.focusIndex = ndx
      // console.log('[INDEX]', ndx)
      let status = null
      if(ndx === 0){
        this.currentIndex = 0
        status = 10
        this.retrieveOrdersByStatus(status, 0)
      }else if(ndx === 2){
        this.currentIndex = 1
        status = 30
        this.retrieveOrdersByStatus(status, 0)
      }else{
        console.log('supposed to be processing')
        this.currentIndex = 2
        status = [20, 25]
        this.retrieveOrdersByStatus(status, 0)
      }
    },
    retrieveOrdersByStatus(status, ndx){
      const { user } = AUTH
      this.restaurant = []
      this.data = []
      this.deliStore = []
      // console.log('[NDX]', ndx)
      if(Array.isArray(status)){
        $('#loading').css({'display': 'block'})
        let query = `orders?CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}&StoreId=${user.userID}`
        status.forEach((el, ndx) => {
          query += `&Status=${status[ndx]}`
        })
        this.APIGetRequest(query, response => {
          $('#loading').css({'display': 'none'})
          this.allOrders = ndx === 1 ? response.orders : []
          this.reRenderTable = true
          this.data = response.orders
          response.orders.map(el => {
            el.order_items.map(each => {
              if(each.product.category_type === 1){
                this.deliStore.push(each)
              }else{
                this.restaurant.push(each)
              }
            })
          })
          this.selectData(this.selectedDataIndex, 0)
          this.reRender = true
        })
      }else{
        $('#loading').css({'display': 'block'})
        this.APIGetRequest(`orders?CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}&Status=${status}&StoreId=${user.userID}`, response => {
          $('#loading').css({'display': 'none'})
          this.allOrders = ndx === 1 ? response.orders : []
          this.reRenderTable = true
          this.data = response.orders
          response.orders.map(el => {
            el.order_items.map(each => {
              if(each.product.category_type === 1){
                this.deliStore.push(each)
              }else if(each.product.category_type === 0){
                this.restaurant.push(each)
              }
            })
          })
          this.selectData(this.selectedDataIndex, 0)
          this.reRender = true
        })
      }
    },
    selectData(ndx, popId) {
      this.selectedDataIndex = ndx
      this.reRender = false
      this.restaurant = []
      this.deliStore = []
      if(this.data.length > 0){
        this.APIGetRequest(`get_order_accept_time?orderId=${this.data[ndx].id}`, response => {
          this.times = response.order_accept_time
          this.data[ndx].order_items.map(el => {
            if(el.product.category_type === 0){
              this.restaurant.push(el)
            }else if(el.product.category_type === 1){
              this.deliStore.push(el)
            }
          })
        }, error => {
          console.log('ACCEPT TIME RETRIEVE ERROR: ', error)
        })
      }
      this.reRender = true
    },
    switchComponent(component, ndx) {
      this.widerView = this.returnHeaderElements[ndx].wholeView
      this.reRenderTable = false
      this.typeIndex = ndx
      if(ndx === 0 && !this.widerView){
        if(this.currentIndex === 2){
          this.getDate('day', 1)
        }else{
          this.getDate('day', ndx)
        }
      }else if(ndx === 1 && !this.widerView){
        this.getDate('week', ndx)
      }else if(this.widerView){
        ndx = ndx > 1 ? 1 : ndx
        this.typeIndex = ndx
        if(ndx === 1){
          this.getDate('month', 2)
        }else{
          this.getDate('month', 3)
        }
      }
      this.componentType = component
      this.reRenderTable = true
    },
    getDate(date, ndx){
      if(date === 'day'){
        var start = new Date()
        start.setHours(0, 0, 0, 0)
        var end = new Date(start.getTime())
        end.setHours(23, 59, 59, 999)
        // this.createdAtMin = start.toISOString()
        this.createdAtMin = start.toISOString().slice(0, 10)
        console.log('[Current Date]', this.createdAtMin)
        // this.createdAtMax = end.toISOString()
        this.createdAtMax = ''
        // console.log(start.toISOString() + ':' + end.toISOString())
      }else if(date === 'week'){
        let first = this.currentDate.getDate() - this.currentDate.getDay()
        let firstDay = new Date(this.currentDate.setDate(first))
        let lastDay = new Date(this.currentDate.setDate(this.currentDate.getDate() + 6))
        this.createdAtMin = firstDay.toISOString()
        this.createdAtMax = lastDay.toISOString()
        console.log('DATE::: ', this.createdAtMin, this.createdAtMax)
        this.retrieveOrdersByStatus([20, 25], 1)
        // this.createdAtMin = ''
        // this.createdAtMax = ''
      }else{
        console.log('NDX', ndx)
        this.createdAtMin = ''
        this.createdAtMax = ''
        console.log('monthly data: ', date)
      }
      if(ndx === 1){
        this.retrieveOrdersByStatus([20, 25], 1)
      }else if(ndx === 2){
        this.retrieveOrdersByStatus([10, 20, 25, 30, 40, 50, 60, 70], 1)
      }else if(ndx === 3){
        this.retrieveOrdersByStatus([70, 60, 50], 1)
      }else {
        this.retrieveOrders()
      }
    },
    acceptOrder(data) {
      // let temp = this.data[this.focusIndex]
      // let temp2 = this.data
      // let temp3 = {}
      // temp = temp.filter(el => {
      //   if(el.id === data.id && data.process === 'accepted') {
      //     console.log(el)
      //     temp3 = el
      //   }else if(el.id === data.id && data.process === 'complete'){
      //     temp3 = el
      //   }
      //   return el.id !== data.id
      // })
      // temp2[1].push(temp3)
      // temp2[this.focusIndex] = temp
      // this.data = temp2
      // if(this.selectedDataIndex - 1 >= 0) {
      //   this.selectedDataIndex -= 1
      // }else {
      //   this.selectedDataIndex += 1
      //   this.selectedDataIndex -= 1
      // }
      this.retrieveOrdersByStatus([20, 25], null)
      this.selectData(this.selectedDataIndex, 0)
    }
  }
}
</script>
<style scoped>
.notFoundContainer {
  min-height: 581px;
}
.notFound {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}
.initialHeight {
  min-height: 500px;
}
.nav_container{
  border: 1px solid gray;
}
.nav-tabs {
  border-bottom: none !important;
}
.nav_link {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.nav_link:hover {
  cursor: default;
}
.navs {
  background-color: #E1E1E1;
  height: 72px;
  display: flex;
  align-items: center;
  overflow-wrap: unset;
  font-weight: bold;
  padding-right: 20px !important;
  padding-left: 10px !important;
}
.navs:hover {
  cursor: pointer;
}
.nav_header {
  min-height: 52px;
  border: 0px;
  background-color: white;
}
.nav_card {
  border: none;
  /* border: 1px solid gray; */
}
.crockeries {
  align-items: center;
  height: 47px;
  padding-left: 15px;
  padding-right: 15px;
}
.crockeriesContainer {
  padding: 0px;
  padding-left: 17px;
}
.popover {
  width: 365px;
  border: 0px !important;
  left: 0px;
  padding: 0px !important;
  margin-left: 2px !important;
}
.buttonel {
  width: 100%;
  height: 52px;
  border-radius: 50px;
}
.buttonel:focus {
  outline: none;
  box-shadow: none;
}
.buttonsHeader {
  height: 72px;
  display: flex;
  justify-content: flex-start;
  /* overflow-x: scroll;
  scrollbar-width: thin !important; */
  background-color: #FFFFFF;
  border: none;
}
.elWrapper {
  /* margin-left: 5px;
  margin-right: 5px; */
}
.buttonsHeader::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px #FFFFFF;
	background-color: #FFFFFF;
}
.buttonsHeader::-webkit-scrollbar
{
  height: 5px;
	background-color: #FFFFFF;
}
.buttonsHeader::-webkit-scrollbar-thumb
{
	background-color: #0064B1;
	border: 0px;
  border-radius: 10px;
}
.infoCard {
  border: 0px;
}
.infoCardHeader {
  border-top: 1px solid #FFFFFF !important;
  border-left: 1px solid #707070;
  border-right: 1px solid white !important;
  border-bottom: 1px solid #707070;
  margin-top: -1px;
  margin-right: -1px;
  background-color: #FFFFFF;
  border-radius: 0px;
}
.notifications {
  width: 16px;
  height: 16px;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute !important;
  right: 0;
  margin-right: 5px;
  top: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.smallerView {
  color: #0064B1;
  cursor: pointer;
  font-size: 48px;
}
.cardbodyborder {
  border-right: 1px solid #707070;
}
@media (max-width: 1450px) {
  .elWrapper {
    font-size: 12px;
  }
}
@media (max-width: 1300px) {
  .elWrapper {
    width: 100% !important;
  }
}
.crockeriesBody {
  height: 581px;
  overflow-y: scroll;
}
.crockeriesBody::-webkit-scrollbar-track
{
	/* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
	background-color: #F5F5F5;
}
.crockeriesBody::-webkit-scrollbar
{
  width: 5px;
	background-color: #F5F5F5;
}
.crockeriesBody::-webkit-scrollbar-thumb
{
	background-color: #707070;
	border: 0px;
  border-radius: 10px;
}
</style>
<style>
.popover .popover-body {
  left: 0px;
  padding: 0px 0px;
}

/* .popover .arrow::before{
  content: '';
  display: none !important;
}
.popover .arrow::after{
  content: '';
  display: none !important;
} */
</style>
