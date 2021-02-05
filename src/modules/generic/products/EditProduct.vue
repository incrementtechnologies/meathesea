<template>
  <div class="container2" v-if="data">
    <div class="row">
      <div class="columns">
        <i class="fas fa-arrow-alt-circle-left fa-3x" style="margin-left: 0px; margin-right: 0px; margin-top: 1%; color: #0064B1;" @click="back()"></i>
      </div>
      <div class="column">
        <img :src="data ? data.images[0].src : ''" width="150px" height="142px">
      </div>
      <div class="main">
        <p class="name" style="margin-left: 0%;"><b>{{bundle ? 'BUNDLE IMAGE' : 'PRODUCT IMAGE'}}</b><button class="pull-right buttons"><i class="fas fa-trash"></i> Remove</button></p>
        <button class="buttons">Change picture</button>
        <p class="name" style="margin-left: 0%; margin-top: 3%;"><b>{{bundle ? 'BUNDLE TITLE' : 'PRODUCT TITLE'}}</b></p>
        <input type="text" class="col-sm-12 form-control form-control-custom" v-model="data.localized_names[0].localized_name" placeholder="Type product title here...">
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE DESCRIPTION' : 'PRODUCT DESCRIPTION'}}</b></p>
        <textarea class="form-control col-sm-12" rows="20" style="height: 10%;" v-model="data.full_description" placeholder="Type product description here..."></textarea>
        <div class="row" style="margin-top: 3%;">
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>{{bundle === true ? 'BUNDLE PRICE' : 'REGULAR PRICE'}}</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="data.price" placeholder="Input Regular Price">
          </div>
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="data.special_price" placeholder="Input Special Offer Price">
          </div>
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE ITEMS' : 'ADD-ON CATEGORY 1'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 32%">LIMIT CHOICE TO: 1</b></p>
        <vue-tags-input
          v-model="category"
          :tags="CategoryTags"
          :validation="validation"
          :autocomplete-items="filteredCategory"
          placeholder="Add Category"
          @tags-changed="newTags => CategoryTags = newTags"
        />
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'ADD-ON CATEGORY' : 'ADD-ON CATEGORY 2'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 32%">LIMIT CHOICE TO: -</b></p>
        <vue-tags-input
          v-model="categories"
          :tags="CategoriesTags"
          :validation="validation"
          :autocomplete-items="filteredItems"
          placeholder="Add Another Category"
          @tags-changed="newTags => CategoriesTags = newTags"
        />
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
        <input type="radio" value="allDay" v-model="setTime" class="all">
        <label for="allDay" style="width:40%">All Day</label>
        <input type="radio" value="setTime" v-model="setTime" class="all">
        <label for="setTime" style="width:40%">Set Time</label>
        <div v-if="setTime === 'setTime'" class="pull-right" style="padding-right: 5%; margin-top: 1%;">
          <label for="appt-time"><b>From: </b></label>
          <input id="appt-time" type="time" v-model="data.available_start_date_time_utc" name="appt-time" step="2">&nbsp;-
          <label for="appt-time"><b>Until: </b></label>
          <input id="appt-time" type="time" v-model="data.available_end_date_time_utc" name="appt-time" step="2">
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 5%"><b>{{bundle ? 'BUNDLE AVAILABILITY (LOCATION)' : 'PRODUCT AVAILABILITY (LOCATION)'}}</b></p>
        <input type="radio" value="loc" v-model="setLocation" class="in">
        <label for="loc" class="on">88 Queens Road W</label>
        <input type="radio" value="location" v-model="setLocation" class="in">
        <label for="location" class="on">Location 2</label>
        <input type="radio" value="allLocations" v-model="setLocation" class="in">
        <label for="allLocations" class="on">All Locations</label>
        <div style="bottom: 0; margin-left: 10%; margin-top: 15%; margin-right: 10%;">
          <button class="buttonCommon pull-left" style="background-color: #B7F6D9; border-color: #B7F6D9;" @click="onSave(data.id)">SAVE</button>
          <button class="buttonCommon pull-right" @click="cancel()">DISCARD</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@media (max-width: 1400px) {
  .main{
    margin-left: 20px !important;
    margin-top: 21px !important;
    width: 90% !important;
  }
  .fas fa-trash{
    margin-top: -161px !important;
    margin-right: 3px !important;
  }
  .buttonCommon{
    background-color: rgb(183, 246, 217);
    border-color: rgb(183, 246, 217);
    margin-top: 20px !important;
    margin-left: 90px !important;
  }
  .column{
    margin-left: 12%;
    width: 15%;
  }
}
.column{
  width: 5%;
}
.columns{
  width: 10%;
}
.main{
  margin-left: 12%;
  width: 70%;
}
.fa-arrow-alt-circle-left:before {
    content: "\f359";
    margin-left: 30px;
}
.vue-tags-input[data-v-61d92e31] {
  /* max-width: 491px; */
  max-width: none !important;
  position: relative;
  background-color: #fff;
  width: 100% !important;
}
.buttonCommon {
  height: 64px;
  width: 243px;
  font-size: 18px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  bottom: 0;
}
.all {
  width: 30px;
}
.in {
  float: left;
  width: 30px;
  clear: left;
  line-height: 18px;
  margin-top: 5px;
  vertical-align: top;
}
.on {
  display: inline-block;
  margin-top: 0%;
  float: left;
  vertical-align: middle;
}
.buttons {
  top: 296px;
  left: 1028px;
  width: 144px;
  height: 31px;
  text-align: center;
  font: normal normal 600 19px/23px Barlow;
  letter-spacing: 0px;
  color: #0064B1;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #0064B1;
  border-radius: 7px;
  opacity: 1;
}
* {
  box-sizing: border-box;
}
.name{
	margin-left: 20px;
}
.container2{
  width: 100%;
  border: 1px solid #c9c9c9;
  padding: 20px 10px 10px 10px;
  /* margin-top: 2% */
}
.vue-tags-input .ti-new-tag-input {
  background: transparent;
  color: #495057;
  font-size: 1rem;
}
.vue-tags-input .ti-input {
  padding: 2px 10px;
  transition: border-bottom 200ms ease;
}
.vue-tags-input.ti-focus .ti-input {
  border: 1px solid skyblue;
}
.vue-tags-input .ti-item.ti-selected-item {
  background: #0064B1;
  color: white;
}
.vue-tags-input .ti-tag {
  position: relative;
  background: #0064B1 !important;
  color: white;
}
.cont{
  margin-top: 2%
}
.fas{
  cursor: pointer;
}
</style>
<script>
import VueTagsInput from '@johmun/vue-tags-input'
export default {
  props: ['bundle', 'data'],
  data(){
    return {
      checked: true,
      setTime: null,
      clickSetTime: false,
      setLocation: null,
      category: '',
      categories: '',
      CategoryTags: [],
      CategoriesTags: [],
      autocompleteCategory: [{
        text: 'Rare'
      }, {
        text: 'Medium Rare'
      }, {
        text: 'Medium'
      }, {
        text: 'Medium Well Done'
      }, {
        text: 'Well Done'
      }],
      autocompleteItems: [{
        text: 'Side Salad'
      }, {
        text: 'Side Fries'
      }, {
        text: 'Side Dish'
      }, {
        text: 'Side Pasta'
      }, {
        text: 'Side Desserts'
      }],
      validation: [{
        classes: 'no-numbers',
        rule: /^([^0-9]*)$/
      }, {
        classes: 'avoid-item',
        rule: /^(?!Cannot).*$/,
        disableAdd: true
      }, {
        classes: 'no-braces',
        rule: ({ text }) => text.indexOf('{') !== -1 || text.indexOf('}') !== -1
      }]
    }
  },
  components: {
    VueTagsInput
  },
  mounted(){
  },
  computed: {
    filteredCategory() {
      return this.autocompleteCategory.filter(i => {
        return i.text.toLowerCase().indexOf(this.category.toLowerCase()) !== -1
      })
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.categories.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    back() {
      this.$parent.isEdit = false
    },
    cancel(){
      this.$parent.isEdit = false
    },
    onSave(id){
      this.$emit('onSave', {id: id})
      // this.id = null
      // this.cancel()
    }
  }
}
</script>
