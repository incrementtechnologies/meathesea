<template>
  <div class="container2">
    <div class="row">
      <div class="columns">
        <i class="fas fa-arrow-alt-circle-left fa-3x" style="margin-left: 0px; margin-right: 0px; margin-top: 1%; color: #0064B1;" @click="back()"></i>
      </div>
      <div class="column" v-if="data">
        <img :src="data !== null ? data.images.length > 0 && data.images[0].src : ''" width="150px" height="142px">
      </div>
      <div class="main">
        <p class="name" style="margin-left: 0%;" @click="del(data)"><b>{{bundle ? 'BUNDLE IMAGE' : 'PRODUCT IMAGE'}}</b><button class="pull-right buttons"><i class="fas fa-trash"></i> Remove</button></p>
        <input type="file" @change="onFileChange" name="picture" class="form-control-file" id="picture">
        <button class="buttons" @click="submit()">Change picture</button>
        <div v-if="data">
          <p class="name" style="margin-left: 0%; margin-top: 3%;"><b>{{bundle ? 'BUNDLE TITLE1' : 'PRODUCT TITLE'}}</b></p>
          <input type="text" class="col-sm-12 form-control form-control-custom" v-model="data.name" placeholder="Type product title here...">
        </div>
       <div v-else>
          <p class="name" style="margin-left: 0%; margin-top: 3%;"><b>{{bundle ? 'BUNDLE TITLE1' : 'PRODUCT TITLE'}}</b></p>
          <input type="text" class="col-sm-12 form-control form-control-custom" v-model="name" placeholder="Type product title here...">
        </div>
        <div v-if="data">
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE DESCRIPTION' : 'PRODUCT DESCRIPTION'}}</b></p>
        <textarea class="form-control col-sm-12" rows="20" style="height: 10%;" v-model="data.full_description" placeholder="Type product description here..."></textarea>
        </div>
        <div v-else>
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE DESCRIPTION' : 'PRODUCT DESCRIPTION'}}</b></p>
        <textarea class="form-control col-sm-12" rows="20" style="height: 10%;" v-model="full_description" placeholder="Type product description here..."></textarea>
        </div>
        <div v-if="data">
        <div class="row" style="margin-top: 3%;">
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>{{bundle === true ? 'BUNDLE PRICE' : 'REGULAR PRICE'}}</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="data.price" placeholder="Input Regular Price">
          </div>
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="data.old_price" placeholder="Input Special Offer Price">
          </div>
        </div>
        </div>
        <div v-else>
        <div class="row" style="margin-top: 3%;">
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>{{bundle === true ? 'BUNDLE PRICE' : 'REGULAR PRICE'}}</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="price" placeholder="Input Regular Price">
          </div>
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="old_price" placeholder="Input Special Offer Price">
          </div>
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
        <div v-if="data">
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
          <label style="width:40%" class="radio">
            <input type="radio" name="setTime" id="all" :checked="(data.available_start_date_time_utc != null || data.available_end_date_time_utc == null) ? true : false">
            All Day
          </label>
          <label style="width:40%" class="radio">
            <input type="radio" name="setTime" id="all" :checked="(data.available_start_date_time_utc != null || data.available_end_date_time_utc != null) ? true : false">
            Set Time
          </label>
          <div v-if="(data.available_start_date_time_utc != null || data.available_end_date_time_utc != null) === true ? showSetTime === true : showSetTime === false" class="pull-right" style="padding-right: 5%; margin-top: 1%;">
            <label for="appt-time"><b>From: </b></label>
            <input id="appt-time" type="time" v-model="data.available_start_date_time_utc" name="appt-time" step="2">&nbsp;-
            <label for="appt-time"><b>Until: </b></label>
            <input id="appt-time" type="time" v-model="data.available_end_date_time_utc" name="appt-time" step="2">
            </div>
          </div>
          <div v-else>
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
          <label style="width:40%" class="radio">
            <input type="radio" name="setTime" id="all" :checked="(available_start_date_time_utc == null || available_end_date_time_utc == null) ? true : false">
            All Day
          </label>
          <label style="width:40%" class="radio">
            <input type="radio" name="setTime" id="all" :checked="(available_start_date_time_utc != null || available_end_date_time_utc != null) ? true : false">
            Set Time
          </label>
          <div v-if="available_start_date_time_utc != null || available_end_date_time_utc != null" class="pull-right" style="padding-right: 5%; margin-top: 1%;">
            <label for="appt-time"><b>From: </b></label>
            <input id="appt-time" type="time" v-model="available_start_date_time_utc" name="appt-time" step="2">&nbsp;-
            <label for="appt-time"><b>Until: </b></label>
            <input id="appt-time" type="time" v-model="available_end_date_time_utc" name="appt-time" step="2">
            </div>
          </div>
        <p class="name" style="margin-left: 0%; margin-top: 5%"><b>{{bundle ? 'BUNDLE AVAILABILITY (LOCATION)' : 'PRODUCT AVAILABILITY (LOCATION)'}}</b></p>
        <input type="radio" value="loc" v-model="setLocation" class="in">
        <label for="loc" class="on">88 Queens Road W</label>
        <input type="radio" value="location" v-model="setLocation" class="in">
        <label for="location" class="on">Location 2</label>
        <input type="radio" value="allLocations" v-model="setLocation" class="in">
        <label for="allLocations" class="on">All Locations</label>
        <div style="bottom: 0; margin-left: 10%; margin-top: 15%; margin-right: 10%;">
          <button class="buttonCommon pull-left" style="background-color: #B7F6D9; border-color: #B7F6D9;" @click="onSave(data)">SAVE</button>
          <button class="buttonCommon pull-right" @click="cancel()">DISCARD</button>
        </div>
      </div>
    </div>
    <Confirmation
    ref="prod"
    :title="'Confirmation Message'"
    :message="'Are you sure you want to delete this product?'"
    @onConfirm="remove(data)"
    ></Confirmation>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import VueTagsInput from '@johmun/vue-tags-input'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
export default {
  props: ['bundle', 'data', 'category1', 'category2', 'categoryId'],
  data(){
    return {
      setTime: null,
      name: null,
      full_description: null,
      price: null,
      old_price: null,
      available_start_date_time_utc: null,
      available_end_date_time_utc: null,
      clickSetTime: false,
      setLocation: null,
      category: '',
      categories: '',
      CategoryTags: [],
      CategoriesTags: [],
      autocompleteCategory: [],
      showSetTime: false,
      autocompleteItems: [],
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
      }],
      formField: [{
        picture: null
      }]
    }
  },
  components: {
    VueTagsInput,
    Confirmation
  },
  mounted(){
    // if(this.category1 !== null){
    //   this.category1.forEach(element => {
    //     element['text'] = element.name
    //     this.autocompleteCategory.push(element)
    //     this.CategoryTags.push(element)
    //     console.log('category', this.CategoryTags)
    //   })
    // }
    // if(this.category2 !== null){
    //   this.category2.forEach(element => {
    //     element['text'] = element.name
    //     this.autocompleteItems.push(element)
    //     this.CategoriesTags.push(element)
    //   })
    // }
  },
  computed: {
    filteredCategory() {
      return this.autocompleteCategory.filter(i => {
        return i.name.toLowerCase().indexOf(this.category.toLowerCase()) !== -1
      })
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.name.toLowerCase().indexOf(this.categories.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    addProduct() {
      const { user } = AUTH
      console.log(this.categoryId, 'tjasdijahidaisfd')
      let parameter = {
        category_id: this.categoryId,
        store_ids: [user.userID],
        name: this.name,
        full_description: this.full_description,
        price: this.price,
        old_price: this.old_price,
        available_start_date_time_utc: this.available_start_date_time_utc,
        available_end_date_time_utc: this.available_end_date_time_utc
      }
      $('#loading').css({'display': 'block'})
      this.APIPostRequest(`products`, {product: parameter}, response => {
        $('#loading').css({'display': 'none'})
        console.log(this.$parent)
        this.$parent.add = false
        this.$parent.isEdit = false
      })
    },
    onFileChange(event){
      console.log('[events]', event)
      this.formField.picture = event.target.files[0]
      console.log('[evenddddts]', this.formField.picture)
    },
    submit(){
      let formData = new FormData()
      formData.append('picture', this.formField.picture)
    },
    remove(data){
      $('#loading').css({'display': 'block'})
      this.APIDeleteRequest(`products/${data.id}`, {}, response => {
        $('#loading').css({'display': 'none'})
        this.back()
      })
    },
    del(id) {
      this.$refs.prod.show(id)
    },
    back() {
      this.$parent.isEdit = false
    },
    cancel(){
      this.$parent.isEdit = false
    },
    onSave(data){
      if(data) {
        this.$emit('onSave', data)
      } else {
        this.addProduct()
      }
    }
  }
}
</script>

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
#all {
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
img{
  image-rendering: -webkit-optimize-contrast
}
</style>
