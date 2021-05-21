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
                  v-for="(el, ndx) in (returnTypeIndex === 1 && !widerView ? returnSelectedData : returnData )" 
                  :key="ndx + 'body'" 
                  :id="String(ndx) + navs[focusIndex]"
                  :style="(el.crockery_status !== 'Reschedule' ) ? 'background-color: ' + navs[returnFocusIndex].background + ';' : 'background-color: #F08080;' "
                  @click='selectData(ndx, String(ndx) + navs[returnFocusIndex])'
                >
                  <div 
                    class="d-flex justify-content-between crockeries"
                    :style="(selectedDataIndex === ndx) ? ( el.crockery_status !== 'Reschedule' ) ? 'background-color: ' + navs[returnFocusIndex].background +';' : 'background-color: #F08080;' : 'background-color: white;'"
                  >
                    <div v-if="!headerElements[typeIndex].changeDate">{{el.order_id}}</div>
                    <div v-if="!headerElements[typeIndex].changeDate">
                    </div>
                    <div v-if="headerElements[typeIndex].changeDate">{{ el.date_remarks !== '' ? el.date_remarks : returnDate(el) }}</div>
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
                  @keyup="onType"
                >
              </div>
            </div>
          </div>
          <div class="card-body p-0 initialHeight tableArea">
            <card1 
              :data="typeIndex === 1 && !widerView? returnTableData[returnWeeklySelected] : returnData[returnSelectedIndex]"
              v-if="componentType === 'card' && returnCardRender"
            />
            <div 
              v-else-if="componentType === 'table'"
            >
              <dataTable 
                :headers="tableHeaders" 
                :tableData="typeIndex === 1 && !widerView? returnTableData : returnData" 
                :orderClicked="orderClicked"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <PushNotification
      ref="pushNotification"
      id="pushNotification"
      @new-message="onNewMessage"/>
  </div>
</template>
<script>
import card1 from './orderCard1.vue'
import card2 from '../orders/orderCard2.vue'
import dataTable from '../crockeryAndOrders/table'
import AUTH from 'src/services/auth'
import PushNotification from '../../components/notification/pushNotification.vue'
import property from './property'
export default {
  components: {
    card1,
    card2,
    dataTable,
    PushNotification
  },
  data() {
    return {
      tableHeaders: property.tableHeaders,
      navs: property.navs,
      headerElements: property.headerElements,
      data: [],
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
      createdAtMax: '',
      currentDate: new Date(),
      weeklySelected: null,
      isMounted: false,
      editing: false
    }
  },
  mounted() {},
  created() {
    this.retrieveOrders()
    this.retrieveNotification()
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
    },
    returnSelectedDataIndex() {
      return this.selectedDataIndex
    },
    returnTableData() {
      let temp = this.data.filter(el => {
        return this.returnDate(el) === this.returnDate(this.returnSelectedData[this.selectedDataIndex])
      })
      return temp
    },
    returnSelectedData() {
      return this.data.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          this.returnDate(t) === this.returnDate(thing)
        ))
      )
    },
    returnWeeklySelected() {
      return this.weeklySelected
    }
  },
  methods: {
    onNewMessage(message) {
      console.log('NEW CROCKERY: ', message)
    },
    orderClicked(index, orderId) {
      console.log('index: ', index, 'order id: ', orderId)
      if(!this.widerView) {
        this.editing = true
      }
      this.componentType = 'card'
      this.weeklySelected = index
      let tempIndex = this.data.findIndex(x => parseInt(x.order_id) === parseInt(orderId))
      switch(this.data[tempIndex].order_status){
        case 'Pickup':
          this.focusIndex = 0
          break
        case 'ReturnInPerson':
          this.focusIndex = 0
          break
        case 'Processing':
          this.focusIndex = 1
          break
        case 'Complete':
          this.focusIndex = 2
          break
      }
      if(this.widerView){
        this.selectedDataIndex = this.data.findIndex(x => parseInt(x.order_id) === parseInt(orderId))
      }
    },
    onType(event) {
      if(event.target.value === '' && this.searchValue !== null) {
        let date = ''
        if(this.typeIndex === 0) { // today order/s
          date = 'day'
        }else if(this.typeIndex === 1) { // weekly order/s
          date = 'week'
        }else if(this.widerView) { // all orders
          date = 'month'
        }
        this.searchValue = null
        this.getDate(date, this.focusIndex)
        this.retrieveNotification()
      }else if(event.target.value === ''){
        this.searchValue = null
      }else {
        this.searchValue = event.target.value
      }
    },
    retrieveNotification(){
      const { user } = AUTH
      this.APIGetRequest(`get_crockery?Status=20&Status=30&StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}`, response => {
        this.navs[0].count = response.crockery.length
      })
      this.APIGetRequest(`get_crockery?Status=40&Status=45&StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}`, response => {
        this.navs[1].count = response.crockery.length
      })
    },
    searchAPI(status) {
      const {user} = AUTH
      let params = `crockery_search?Keyword=${this.searchValue}&StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}`
      status.forEach(el => {
        params += `&Status=${el}`
      })
      this.APIGetRequest(params, response => {
        this.data = []
        response.crockery.map(el => {
          let orderDetails1 = this.orders.filter(t => {
            return t.id === el.order_id
          })
          el['order_details'] = orderDetails1[0]
          this.data.push(el)
        })
        this.selectData(this.selectedDataIndex, 0)
      })
    },
    convertDate(str) {
      let mnths = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12'
      }
      let date = str.split(' ')

      return [date[3], mnths[date[1]], date[2]].join('-')
    },
    getDate(date, ndx) {
      const { user } = AUTH
      if(date === 'day'){
        var start = new Date()
        start.setHours(0, 0, 0, 0)
        var end = new Date(start.getTime())
        end.setHours(23, 59, 59, 999)
        this.createdAtMin = this.convertDate(String(start))
      } else if(date === 'week') {
        let first = this.currentDate.getDate() - this.currentDate.getDay()
        let firstDay = new Date(this.currentDate.setDate(first))
        let lastDay = new Date(this.currentDate.setDate(this.currentDate.getDate() + 6))
        this.createdAtMin = this.convertDate(String(firstDay))
        this.createdAtMax = this.convertDate(String(lastDay))
      }else{
        console.log('FOCUS INDEX: ', this.focusIndex)
        this.createdAtMin = ''
        this.createdAtMax = ''
      }

      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`orders?StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}`, response => {
        $('#loading').css({'display': 'none'})
        this.orders = response.orders
        if(this.focusIndex === 0){
          console.log('date: ', date)
          if(!this.widerView && this.typeIndex === 0){
            this.retrieveCrockeryByStatus([20, 30], 1)
          }else if(!this.widerView && this.typeIndex === 1){
            this.retrieveCrockeryByStatus([20, 30], 1)
          }else if(this.widerView && this.typeIndex === 2){
            this.retrieveCrockeryByStatus([20, 30, 40, 45, 50], 1)
          }
        }else if(this.focusIndex === 1){
          if(!this.widerView && this.typeIndex === 0){
            this.retrieveCrockeryByStatus([40, 45], 1)
          }else if(!this.widerView && this.typeIndex === 1){
            this.retrieveCrockeryByStatus([40, 45], 1)
          }else if(this.widerView && this.typeIndex === 2){
            this.retrieveCrockeryByStatus([20, 30, 40, 45, 50], 1)
          }
        }else if(this.focusIndex === 2){
          if(!this.widerView && this.typeIndex === 0){
            this.retrieveCrockeryByStatus([50], 1)
          }else if(!this.widerView && this.typeIndex === 1){
            this.retrieveCrockeryByStatus([50], 1)
          }else if(this.widerView && this.typeIndex === 2){
            this.retrieveCrockeryByStatus([20, 30, 40, 45, 50], 1)
          }
        }

      }, error => {
        console.log('Retrieving All Orders ERROR: ', error)
      })
    },
    retrieveCrockeryByStatus(status, index){
      console.log('status: ', status)
      const { user } = AUTH
      if(Array.isArray(status)){
        let query = `get_crockery?StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}`
        status.forEach((item, ndx) => {
          query += `&Status=${item}`
        })
        $('#loading').css({'display': 'block'})
        this.APIGetRequest(query, response => {
          console.log('TESTINGKLKLK: ', response)
          $('#loading').css({'display': 'none'})

          this.data = []
          response.crockery.forEach((el, ndx) => {
            let orderDetails1 = this.orders.filter(t => {
              return t.id === el.order_id
            })
            el['order_details'] = orderDetails1[0]
            this.data.push(el)
          })
        })
      }
    },
    returnDate(el) {
      // let date = new Date(new Date().toLocaleDateString().replaceAll('/', '-'))
      // let yesterday = ('' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() - 1)).slice(-2) + '-' + date.getFullYear()
      // if(!this.headerElements[this.typeIndex].changeDate) {
      //   return new Date(el.created_date_utc).toLocaleTimeString()
      // }else if(new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-') === new Date().toLocaleDateString().replaceAll('/', '-')) {
      //   return 'Today'
      // }else if(new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-') === yesterday) {
      //   return 'Yesterday'
      // }else {
      //   return new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-')
      // }
      let date = new Date(new Date().toLocaleDateString().replaceAll('/', '-'))
      let yesterday = ('' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() - 1)).slice(-2) + '-' + date.getFullYear()
      if(!this.returnHeaderElements[this.typeIndex].changeDate) {
        return new Date(el.created_date_utc).toLocaleTimeString()
      }else if(new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-') === new Date().toLocaleDateString().replaceAll('/', '-')) {
        return 'Today'
      }else if(new Date(el.created_date_utc).toLocaleDateString().replaceAll('/', '-') === yesterday) {
        return 'Yesterday'
      }else {
        let d = new Date(el.created_date_utc)
        let dd = d.getDate()
        let mm = d.getMonth() + 1
        let yy = d.getFullYear()
        if(String(dd).length < 2) {
          dd = '0' + dd
        }
        if(String(mm).length < 2) {
          mm = '0' + mm
        }
        return yy + '-' + mm + '-' + dd
      }
    },
    returnHHMMformat(data) {
      var time = data
      var hours = Number(time.match(/^(\d+)/)[1])
      var minutes = Number(time.match(/:(\d+)/)[1])
      var AMPM = time.match(/\s(.*)$/)[1]
      if(AMPM.toLowerCase() === 'pm' && hours < 12) hours = hours + 12
      if(AMPM.toLowerCase() === 'am' && hours === 12) hours = hours - 12
      var sHours = hours.toString()
      var sMinutes = minutes.toString()
      if(hours < 10) sHours = '0' + sHours
      if(minutes < 10) sMinutes = '0' + sMinutes
      return sHours + ':' + sMinutes
    },
    change(ndx) {
      this.cardRedered = false
      this.focusIndex = ndx
      this.cardRedered = true
      this.selectedDataIndex = 0
      let status = null
      // if(ndx === 0){
      //   this.focusIndex = 0
      //   status = [20, 30]
      //   this.retrieveCrockeryByStatus(status, 0)
      // }else if(ndx === 1){
      //   this.focusIndex = 1
      //   status = [40, 45]
      //   this.retrieveCrockeryByStatus(status, 1)
      // }else{
      //   this.focusIndex = 2
      //   status = [50]
      //   this.retrieveCrockeryByStatus(status, 2)
      // }
      if(this.typeIndex === 0 && !this.widerView) {
        this.getDate('day')
      }else if(this.typeIndex === 1 && !this.widerView) {
        this.getDate('week')
      }else if(this.typeIndex === 2 && this.widerView) {
        this.getDate('month')
      }
    },
    selectData(ndx, popId) {
      if(this.editing) {
        this.componentType = 'table'
        this.editing = false
      }
      this.selectedDataIndex = ndx
    },
    switchComponent(component, ndx) {
      this.selectedDataIndex = 0
      this.widerView = this.returnHeaderElements[ndx].wholeView
      this.typeIndex = ndx
      this.componentType = component
      if(!this.widerView){
        if(ndx === 0) {
          this.getDate('day', this.focusIndex)
        }else if(ndx === 1){
          this.getDate('week', this.focusIndex)
        }
      }else{
        console.log('not: not wider view')
        this.getDate('month', 3)
      }
    },
    retrieveCrockery() {
      const { user } = AUTH
      $('#loading').css({'display': 'block'})
      var start = new Date()
      start.setHours(0, 0, 0, 0)
      var end = new Date(start.getTime())
      end.setHours(23, 59, 59, 999)
      this.createdAtMin = start.toISOString().slice(0, 10)
      this.APIGetRequest(`get_crockery?Status=20&Status=30&StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}`, response => {
        $('#loading').css({'display': 'none'})
        response.crockery.forEach((el, ndx) => {
          if(el.crockery_status.toLowerCase() === 'pickup' || el.crockery_status.toLowerCase() === 'returninperson') {
            let orderDetails1 = this.orders.filter(t => {
              return t.id === el.order_id
            })
            el['order_details'] = orderDetails1[0]
            this.data[0].push(el)
          }
        })
      }, error => {
        console.log('RETRIEVING CROCKERY ERROR: ', error)
      })
    },
    retrieveOrders() {
      const { user } = AUTH
      var start = new Date()
      start.setHours(0, 0, 0, 0)
      var end = new Date(start.getTime())
      end.setHours(23, 59, 59, 999)
      this.createdAtMin = this.convertDate(String(start))
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`orders?StoreId=${user.storeId}&CreatedAtMin=${this.createdAtMin}&CreatedAtMax=${this.createdAtMax}`, response => {
        $('#loading').css({'display': 'none'})
        this.orders = response.orders
        this.getDate('day', null)
      }, error => {
        console.log('Retrieving All Orders ERROR: ', error)
      })
    },
    handleSearchChange(event) {
      const {user} = AUTH
      this.searchValue = event.target.value
      if(this.search !== '' && this.search !== null) {
        if(this.focusIndex === 0){
          if(!this.widerView && this.typeIndex === 0){
            this.searchAPI([20, 30])
          }else if(!this.widerView && this.typeIndex === 1){
            this.searchAPI([20, 30])
          }else if(this.widerView && this.typeIndex === 2){
            this.searchAPI([20, 30, 40, 45, 50])
          }else if(this.widerView && this.typeIndex === 0){
            this.searchAPI([20, 30, 40, 45, 50])
          }
        }else if(this.focusIndex === 1){
          if(!this.widerView && this.typeIndex === 0){
            this.searchAPI([40, 45])
          }else if(!this.widerView && this.typeIndex === 1){
            this.searchAPI([40, 45])
          }else if(this.widerView && this.typeIndex === 2){
            this.searchAPI([20, 30, 40, 45, 50])
          }else if(this.widerView && this.typeIndex === 0){
            this.searchAPI([20, 30, 40, 45, 50])
          }
        }else if(this.focusIndex === 2){
          if(!this.widerView && this.typeIndex === 0){
            this.searchAPI([50])
          }else if(!this.widerView && this.typeIndex === 1){
            this.searchAPI([50])
          }else if(this.widerView && this.typeIndex === 2){
            this.searchAPI([20, 30, 40, 45, 50])
          }else if(this.widerView && this.typeIndex === 0){
            this.searchAPI([20, 30, 40, 45, 50])
          }
        }
      }
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
