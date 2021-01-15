<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-5" v-if="!widerView">
        <div class="row">
          <div class="col-sm-12 mt-5 p-0">
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
      <div :class="'mt-5 p-0 ' + ((widerView) ? 'col-sm-12': 'col-sm-7')">
        <div class="card infoCard">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-1" v-if="widerView">
                <i class="fas fa-arrow-alt-circle-left smallerView" @click="widerView = !widerView"></i>
              </div>
              <div
                v-for="(el, ndx) in headerElements"
                :key="String(ndx) + el.text"
                :class="((!widerView) ? el.column : el.wholeViewColumn) + ' elWrapper'"
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
          <div class="card-body p-0">
            <card1 :data="data[focusIndex][selectedDataIndex]" v-if="componentType === 'card' && $route.path === '/crockery'"/>
            <card2 :data="data[focusIndex][selectedDataIndex]" v-if="componentType === 'card' && $route.path === '/orders'"/>
            <dataTable v-else-if="componentType === 'table'" :headers="tableHeaders" :tableData="data[focusIndex]"/>
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
export default {
  props: ['tableHeaders', 'navs', 'elements', 'data', 'cardType'],
  components: {
    card1,
    card2,
    dataTable
  },
  data() {
    return {
      focusStyle: 'border-left: 1px solid #707070; border-right: 1px solid #707070; background-color: white;',
      unfocusStyle: 'border: 1px solid #707070; border-bottom: 1px solid #707070; border-top: none; background-color: #E1E1E1;',
      focusIndex: 0,
      selectedDataIndex: 0,
      typeIndex: 0,
      componentType: 'card',
      widerView: false,
      headerElements: []
    }
  },
  // beforeMount() {
  //   console.log(this.$route.path + 'header elements ', this.elements)
  // },
  mounted() {
    this.focusIndex = 0
    this.selectedDataIndex = 0
    this.typeIndex = 0
    this.widerView = false
    this.componentType = 'card'
    this.headerElements = this.elements
    // this.filterHeaderElements(this.headerElements)
    console.log(this.$route.path + 'header elements ', this.elements)
  },
  watch: {
    data: function(val) {
      return val
    },
    tableHeaders: function(val) {
      return val
    },
    navs: function(val) {
      return val
    },
    cardType: function(val) {
      return val
    },
    headerElements: function(val) {
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
    filterHeaderElements(data) {
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
      this.headerElements = a
    },
    returnDate(el) {
      let date = new Date(new Date().toLocaleDateString().replaceAll('/', '-'))
      let yesterday = ('' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() - 1)).slice(-2) + '-' + date.getFullYear()
      if(this.headerElements[this.typeIndex] !== undefined && !this.headerElements[this.typeIndex].changeDate) {
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
      console.log(this.headerElements)
      this.widerView = this.headerElements[ndx].wholeView
      this.typeIndex = ndx
      this.componentType = component
    }
  }
}
</script>
<style scoped>
.initialHeight {
  min-height: calc(100vh - 95px - 8rem) !important;
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
  cursor: default;
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
  cursor: default;
  font-size: 48px;
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
