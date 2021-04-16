<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-5" v-if="!widerView">
        <div class="row">
          <div class="col-sm-12 p-0">
            <div class="card nav_card">
              <div class="card-header p-0 nav_header">
                <div class="row pl-3 pr-3">
                  <div class="col-sm-4 navs" 
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
              <div class="card-body initialHeight p-0">
                <div
                  class="col-sm-12 mt-3 crockeriesContainer"
                  v-for="(el, ndx) in returnData[returnFocusIndex]" 
                  :key="ndx + 'body'" 
                  :id="String(ndx) + navs[focusIndex]"
                  :style="'background-color: ' + navs[returnFocusIndex].background"
                  @click='selectData(ndx, String(ndx) + navs[returnFocusIndex])'
                >
                  <div 
                    class="d-flex justify-content-between crockeries"
                    :style="(selectedDataIndex === ndx) ? 'background-color: ' + navs[returnFocusIndex].background : '; background-color: white;'"
                  >
                    <div v-if="!headerElements[typeIndex].changeDate && !headerElements[typeIndex].changeDate">{{el.order_id}}</div>
                    <div>
                      {{
                        el.order_details.delivery_time_requested === "ASAP"
                        ? headerElements[typeIndex].changeDate === true ? returnDate(el) : el.order_details.local_time_created
                        : headerElements[typeIndex].changeDate === true ? returnDate(el) : el.order_details.delivery_time_requested
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="' p-0 ' + ((widerView) ? 'col-sm-12': 'col-sm-7')">
        <div class="card infoCard">
          <div class="card-header infoCardHeader" :style="widerView ? 'border-left: 1px solid white; margin-left: -1px !important;' : ''">
            <div class="row">
              <div class="mt-1" v-if="widerView" style="width: 7%;">
                <center><i class="fas fa-arrow-alt-circle-left smallerView" @click="() => {widerView = !widerView; switchComponent('card', 0)}"></i></center>
              </div>
              <div
                v-for="(el, ndx) in returnHeaderElements"
                :key="String(ndx) + el.text"
                class="elWrapper p-1"
                :style="'width: ' + ((!widerView) ? el.column : el.wholeViewColumn) + (widerView ? '!important;' : '')"
              >
                <button 
                  class="buttonel" 
                  :style="el.style + 'background-color: ' + ((typeIndex === ndx || widerView ) ? el.focusedBackground + ';color: ' + el.focusedColor: '#FFFFFF; color: ' + el.unfocusedColor)"
                  v-if="el.type.toLowerCase() === 'button' && (!widerView || el.wholeView)"
                  @click="switchComponent(el.componentTocall.toLowerCase(), ndx)"
                >
                  {{el.text}}
                </button>
                <input 
                  type="text" 
                  class="buttonel"
                  :style="el.style + ' padding: 15px;'"
                  :placeholder="el.text" 
                  v-else-if="el.type.toLowerCase() === 'input'"
                  @keyup.enter="handleSearchChange"
                >
              </div>
            </div>
          </div>
          <div class="card-body p-0 initialHeight tableArea">
            <card1 :data="(this.searchValue !== '') ? [] :(data[returnFocusIndex][returnSelectedIndex] !== undefined) ? data[returnFocusIndex][returnSelectedIndex] : {}" v-if="componentType === 'card' && returnCardRender"/>
            <!-- <card2 :data="data[focusIndex][selectedDataIndex]" v-if="componentType === 'card' && $route.path === '/orders'"/> -->
            <div 
              v-else-if="componentType === 'table'"
            >
              <dataTable :headers="tableHeaders" :tableData="data[returnFocusIndex]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import card1 from './orderCard1.vue'
import card2 from '../orders/orderCard2.vue'
import dataTable from '../crockeryAndOrders/table'
import AUTH from 'src/services/auth'
export default {
  components: {
    card1,
    card2,
    dataTable
  },
  data() {
    return {
      tableHeaders: [
        {text: 'Order date/time', key: 'created_date_utc'},
        {text: 'Order number', key: 'order_id'},
        {text: 'Order Status', key: 'crockery_status'},
        {text: 'Plate returned', key: 'returned'}
      ],
      navs: [
        {name: 'NEW', isNotification: true, notificationColor: '#FF0045', notificationTextColor: '#FFFFFF', background: '#B7F6D9', color: '#0064B1', count: 0},
        {name: 'IN PROGRESS', isNotification: true, notificationColor: '#F3E4A7', notificationTextColor: '#0064B1', background: '#FFBF51', color: '#0064B1', count: 0},
        {name: 'RETURNED', background: '#E1E1E1', color: '#878787'}
      ],
      headerElements: [
        {
          text: 'TODAY',
          style: 'border: 1px solid #0064B1; color: #0064B1;',
          type: 'button',
          componentTocall: 'card',
          focusedBackground: '#FFFACA',
          focusedColor: '#0064B1',
          unfocusedColor: '#000000',
          wholeView: false,
          shorterView: true,
          column: '20%',
          changeDate: false
        },
        {
          text: 'THIS WEEK',
          style: 'border: 1px solid #0064B1; color: #000000;',
          type: 'button',
          componentTocall: 'table',
          focusedBackground: '#FFFACA',
          focusedColor: '#0064B1',
          unfocusedColor: '#000000',
          wholeView: false,
          shorterView: true,
          column: '20%',
          changeDate: true
        },
        {
          text: 'ALL OUTSTANDING',
          style: 'border: 1px solid #BE0000; color: #BE0000;',
          type: 'button',
          componentTocall: 'table',
          focusedBackground: '#BE0000',
          focusedColor: '#FFFFFF',
          unfocusedColor: '#BE0000',
          wholeView: true,
          shorterView: true,
          column: '20%',
          wholeViewColumn: '20%',
          changeDate: false
        },
        {
          text: 'Search',
          style: 'border: 1px solid #707070; background-color: #FFFFFF; color: #000000;',
          type: 'input',
          componentTocall: 'table',
          wholeView: true,
          shorterView: true,
          column: '40%',
          focusedBackground: '#0064B1',
          wholeViewColumn: '70%',
          changeDate: false
        }
      ],
      data: [
        [], // new
        [], // in progress
        [] // returned
      ],
      focusStyle: 'border-left: 1px solid #707070; border-right: 1px solid #707070; background-color: white;',
      unfocusStyle: 'border: 1px solid #707070; border-bottom: 1px solid #707070; border-top: none; background-color: #E1E1E1;',
      focusIndex: 0, // new, in progress, returned
      selectedDataIndex: 0, // side menu
      typeIndex: 0, // today, this week, all outstanding
      componentType: 'card',
      widerView: false,
      orders: [],
      cardRedered: true,
      searchValue: '',
      notifications: [],
      createdAtMin: '',
      createdAtMax: ''
    }
  },
  mounted() {},
  created() {
    this.getDate('day', 0)
    this.retrieveOrders()
    // this.retrieveOrderId()
  },
  watch: {},
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
    returnFocusIndex () {
      return this.focusIndex
    },
    returnSelectedIndex () {
      return this.selectedDataIndex
    },
    returnData() {
      return this.data
    },
    returnTypeIndex() {
      return this.typeIndex
    },
    returnCardRender() {
      return this.cardRedered
    }
  },
  methods: {
    getDate(date, ndx) {
      if(date === 'day'){
        var start = new Date()
        start.setHours(0, 0, 0, 0)
        var end = new Date(start.getTime())
        end.setHours(23, 59, 59, 999)
        this.createdAtMin = start.toISOString().slice(0, 10)
        console.log('[Current Date]', this.createdAtMin)
        this.retrieveOrdersByStatus([10], 1)
      } else if(date === 'week') {
        let first = this.currentDate.getDate() - this.currentDate.getDay()
        let firstDay = new Date(this.currentDate.setDate(first))
        let lastDay = new Date(this.currentDate.setDate(this.currentDate.getDate() + 6))
        console.log('[THIS IS FIRST DAY]', firstDay.toISOString().slice(0, 10))
        this.createdAtMin = firstDay.toISOString().slice(0, 10)
        this.createdAtMax = lastDay.toISOString().slice(0, 10)
        console.log('DATE::: ', this.createdAtMin, this.createdAtMax)
        this.retrieveOrdersByStatus([20, 30], 1)
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
    retrieveOrdersByStatus(){
      const { user } = AUTH
    },
    returnDate(el) {
      let date = new Date(new Date().toLocaleDateString().replaceAll('/', '-'))
      let yesterday = ('' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() - 1)).slice(-2) + '-' + date.getFullYear()
      if(!this.headerElements[this.typeIndex].changeDate) {
        return new Date(el.created_date_utc).toLocaleTimeString()
      }else if(new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-') === new Date().toLocaleDateString().replaceAll('/', '-')) {
        return 'Today'
      }else if(new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-') === yesterday) {
        return 'Yesterday'
      }else {
        return new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-')
      }
    },
    change(ndx) {
      this.cardRedered = false
      this.focusIndex = ndx
      this.cardRedered = true
      let status = null
      if(ndx === 0){
        this.currentIndex = 0
        status = [20, 30]
        this.retrieveCrockeryByStatus(status, 0)
      }else if(ndx === 2){
        this.currentIndex = 1
        status = 40
        this.retrieveCrockeryByStatus(status, 0)
      }else{
        console.log('supposed to be processing')
        this.currentIndex = 2
        status = 50
        this.retrieveCrockeryByStatus(status, 0)
      }
    },
    retrieveCrockeryByStatus() {

    },
    selectData(ndx, popId) {
      console.log('SIDE MENU CLICKED: ', ndx)
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::show::popover', popId)
      this.selectedDataIndex = ndx
    },
    switchComponent(component, ndx) {
      this.widerView = this.headerElements[ndx].wholeView
      this.typeIndex = ndx
      this.componentType = component
    },
    retrieveCrockery() {
      const { user } = AUTH
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`get_crockery?StoreId=${user.userID}`, response => {
        $('#loading').css({'display': 'none'})
        response.crockery.forEach((el, ndx) => {
          if(el.crockery_status.toLowerCase() === 'pending') {
            let orderDetails1 = this.orders.filter(t => {
              return t.id === el.order_id
            })
            el['order_details'] = orderDetails1[0]
            this.data[0].push(el)
            this.navs[0].count = this.data[0].length
            console.log(this.data[0])
          }else if(el.crockery_status.toLowerCase() === 'processing' || el.crockery_status.toLowerCase() === 'pickup' || el.crockery_status.toLowerCase() === 'returninperson') {
            let orderDetails2 = this.orders.filter(t => {
              return t.id === el.order_id
            })
            el['order_details'] = orderDetails2[0]
            this.data[1].push(el)
            this.navs[1].count = this.data[1].length
          }else if(el.crockery_status.toLowerCase() === 'complete') {
            let orderDetails3 = this.orders.filter(t => {
              return t.id === el.order_id
            })
            el['order_details'] = orderDetails3[0]
            this.data[2].push(el)
          }
        })
      }, error => {
        console.log('RETRIEVING CROCKERY ERROR: ', error)
      })
    },
    retrieveOrders() {
      const { user } = AUTH
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`orders?StoreId=${user.userID}`, response => {
        $('#loading').css({'display': 'none'})
        console.log('ORDERS', response.orders)
        this.orders = response.orders
        this.retrieveCrockery()
      }, error => {
        console.log('Retrieving All Orders ERROR: ', error)
      })
    },
    handleSearchChange(event) {
      this.searchValue = event.target.value
      console.log('TESTING !!!: ', this.searchValue)
      const { user } = AUTH
      let val = Number(this.searchValue)
      if(this.navs[this.focusIndex].name === 'NEW'){
        $('#loading').css({'display': 'block'})
        this.APIGetRequest(`crockery_search?Keyword=${val}&StoreId=${user.userID}&Status=20&Status=30`, response => {
          $('#loading').css({'display': 'none'})
          this.data[0] = []
          response.crockery.forEach((el, ndx) => {
            if(el.crockery_status.toLowerCase() === 'processing' || el.crockery_status.toLowerCase() === 'pickup' || el.crockery_status.toLowerCase() === 'returninperson') {
              let orderDetails2 = this.orders.filter(t => {
                return String(t.id).match(String(el.order_id))
              })
              el['order_details'] = orderDetails2[0]
              this.data[0].push(el)
              this.navs[0].count = this.data[0].length
              console.log('DATA1', orderDetails2[0])
            }
          })
          // this.data = response.crockery
        })
      } else if(this.navs[this.focusIndex].name === 'IN PROGRESS') {
        $('#loading').css({'display': 'block'})
        this.APIGetRequest(`crockery_search?Keyword=${val}&StoreId=${user.userID}&Status=40`, response => {
          $('#loading').css({'display': 'none'})
          // this.data = response.crockery
        })
      } else if(this.navs[this.focusIndex].name === 'RETURNED') {
        $('#loading').css({'display': 'block'})
        this.APIGetRequest(`crockery_search?Keyword=${val}&StoreId=${user.userID}&Status=50`, response => {
          $('#loading').css({'display': 'none'})
          // this.data = response.crockery
        })
      }
      // $('#loading').css({'display': 'block'})
      // this.APIGetRequest(`get_crockery?StoreId=${user.userID}`, response => {
      //   $('#loading').css({'display': 'none'})
      //   console.log('sample_Data:', response)
      //   console.log('test:', val)
      //   response.crockery.forEach((el, ndx) => {
      //     if(String(el.id).match(val)){
      //       console.log('customer_id:', el)
      //       this.data[0].push(el.id)
      //     }
      //     if(el.id === val) {
      //       let orderDetails1 = this.orders.filter(t => {
      //         return t.id === el.order_id
      //       })
      //       el['order_details'] = orderDetails1[0]
      //       this.data[0].push(el)
      //       console.log(this.data[0])
      //     }
      //   })
      // })
    }
  }
}
</script>
<style scoped>
.tableArea {
  border: none;
  height: calc(80vh - 5px) !important;
}
.initialHeight {
  min-height: 80vh;
  /* min-height: calc(100vh - 95px - 8rem) !important; */
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
  justify-content: center;
  font-weight: bold;
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
  border: 1px solid gray;
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
  border-bottom: 1px solid white !important;
  margin-top: -1px;
  margin-right: -1px;
  margin-bottom: -1px;
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
}
.smallerView {
  color: #0064B1;
  cursor: pointer;
  font-size: 48px;
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
