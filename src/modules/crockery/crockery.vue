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
                      <b :style="'color :' + nav.notificationTextColor">{{data[focusIndex].length}}</b>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body initialHeight p-0">
                <div
                  class="col-sm-12 mt-3 crockeriesContainer"
                  v-for="(el, ndx) in data[focusIndex]" 
                  :key="ndx + 'body'" 
                  :id="String(ndx) + navs[focusIndex]"
                  :style="'background-color: ' + navs[focusIndex].background"
                  @click='selectData(ndx, String(ndx) + navs[focusIndex])'
                >
                  <div 
                    class="d-flex justify-content-between crockeries"
                    :style="(selectedDataIndex === ndx) ? 'background-color: ' + navs[focusIndex].background : '; background-color: white;'"
                  >
                    <div v-if="!headerElements[typeIndex].changeDate && !headerElements[typeIndex].changeDate">{{el.order_number}}</div>
                    <div>
                      {{
                        returnDate(el)
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
                <center><i class="fas fa-arrow-alt-circle-left smallerView" @click="widerView = !widerView"></i></center>
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
                >
              </div>
            </div>
          </div>
          <div class="card-body p-0 initialHeight tableArea">
            <card1 :data="data[focusIndex][selectedDataIndex]" v-if="componentType === 'card'"/>
            <!-- <card2 :data="data[focusIndex][selectedDataIndex]" v-if="componentType === 'card' && $route.path === '/orders'"/> -->
            <div 
              v-else-if="componentType === 'table'"
            >
              <dataTable :headers="tableHeaders" :tableData="data[focusIndex]"/>
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
export default {
  components: {
    card1,
    card2,
    dataTable
  },
  data() {
    return {
      tableHeaders: [
        {text: 'Order date/time', key: 'date'},
        {text: 'Order number', key: 'order_number'},
        {text: 'Order Status', key: 'order_status'},
        {text: 'Plate returned', key: 'returned'}
      ],
      navs: [
        {name: 'NEW', isNotification: true, notificationColor: '#FF0045', notificationTextColor: '#FFFFFF', background: '#B7F6D9', color: '#0064B1'},
        {name: 'IN PROGRESS', isNotification: true, notificationColor: '#F3E4A7', notificationTextColor: '#0064B1', background: '#FFBF51', color: '#0064B1'},
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
        [
          {
            id: 1,
            order_number: 123,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'pending',
            returned: 'Yes'
          },
          {
            id: 2,
            order_number: 234,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'pending',
            returned: 'Yes'
          },
          {
            id: 3,
            order_number: 345,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'pending',
            returned: 'Yes'
          }
        ],
        [
          {
            id: 1,
            order_number: 754,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'processing',
            returned: 'Yes'
          },
          {
            id: 2,
            order_number: 567,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'processing',
            returned: 'Yes'
          },
          {
            id: 3,
            order_number: 231,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'processing',
            returned: 'Yes'
          }
        ],
        [
          {
            id: 1,
            order_number: 342,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2020-10-03T05:32:01.883953',
            order_status: 'complete',
            returned: 'Yes'
          },
          {
            id: 2,
            order_number: 125,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2021-01-14T05:32:01.883953',
            order_status: 'complete',
            returned: 'Yes'
          },
          {
            id: 3,
            order_number: 515,
            pickup_time: 'ASAP',
            full_name: 'John Doe',
            contact_number: '+639123456789',
            address: 'Center Stage Tower 1(108 Hollywood road, Central) Floor 1, unit C',
            date: '2021-01-13T05:32:01.883953',
            order_status: 'complete',
            returned: 'Yes'
          }
        ]
      ],
      focusStyle: 'border-left: 1px solid #707070; border-right: 1px solid #707070; background-color: white;',
      unfocusStyle: 'border: 1px solid #707070; border-bottom: 1px solid #707070; border-top: none; background-color: #E1E1E1;',
      focusIndex: 0,
      selectedDataIndex: 0,
      typeIndex: 0,
      componentType: 'card',
      widerView: false
    }
  },
  mounted() {},
  watch: {
    data: function(_new, old) {
      return this.data
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
    }
  },
  methods: {
    returnDate(el) {
      let date = new Date(new Date().toLocaleDateString().replaceAll('/', '-'))
      let yesterday = ('' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() - 1)).slice(-2) + '-' + date.getFullYear()
      if(!this.headerElements[this.typeIndex].changeDate) {
        return new Date(el.date).toLocaleTimeString()
      }else if(new Date(el.date).toLocaleDateString().replaceAll('/', '-') === new Date().toLocaleDateString().replaceAll('/', '-')) {
        return 'Today'
      }else if(new Date(el.date).toLocaleDateString().replaceAll('/', '-') === yesterday) {
        return 'Yesterday'
      }else {
        return new Date(el.date).toLocaleDateString().replaceAll('/', '-')
      }
    },
    change(ndx) {
      this.focusIndex = ndx
    },
    selectData(ndx, popId) {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::show::popover', popId)
      this.selectedDataIndex = ndx
    },
    switchComponent(component, ndx) {
      this.widerView = this.headerElements[ndx].wholeView
      this.typeIndex = ndx
      this.componentType = component
    }
  }
}
</script>
<style scoped>
.tableArea {
  border: none;
  min-height: calc(80vh - 5px) !important;
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
