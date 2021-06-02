<template>
  <div class="container2" style="width:100%">
    <div class="row" style="margin-left:0px !important;position:relative;width:100%">
      <div class="column" style="position:relative;width: 30%;margin-left:0px !important">
        <div v-if="data">
          <i class="fas fa-arrow-alt-circle-left fa-3x" style="float:left !important;margin-left:0 !important;margin-top: 1%; color: #0064B1;" @click="back()"></i>
          <img style="margin-left: 2%" v-if="data.images.length > 0 && encodedImage === null" :src="data.images.length > 0 ? data.images.length > 0 && data.images[0].src : '#'" width="100px" height="98px">
          <div v-else-if="encodedImage">
            <img :src='encodedImage' style="margin-left: 2%" width="100px" height="98px"> 
          </div>
          <div v-else>
            <i style="color:gray;margin-left: 2%" class="far fa-image fa-10x"></i>
          </div>
        </div>
        <div v-else>
          <i class="fas fa-arrow-alt-circle-left fa-3x" style="float:left !important;margin-left:0 !important;margin-top: 1%; color: #0064B1;" @click="back()"></i>
          <div v-if="encodedImage">
            <img :src='encodedImage' style="margin-left: 2%" width="100px" height="98px"> 
          </div>
          <div v-else>
            <i style="color:gray;margin-left: 2%" class="far fa-image fa-10x"></i>
          </div>
        </div>
      </div>
      <div class="column" style="width:70%; position:relative;margin-left:0px !important">
        <div>
          <p style="float:left;margin-left:0 !important" class="name"><b>{{bundle ? 'BUNDLE IMAGE' : 'PRODUCT IMAGE'}}</b></p>
        </div>
        <div v-if="data">
          <button class="pull-right buttons" style="margin-left:40px !important" @click="del(data)"><i style="color:black;margin-right: 2%" class="fas fa-trash"></i> Remove</button>
        </div>
        <div v-else></div>
        <div v-if="data" style="margin-top:5%;margin-left:0px !important;positon:flex;">
          <button class="buttons" @click="chooseFile()" >Change picture</button>
          <input type="file" id="choose_file" accept="image/*" hidden @change="selectFile($event)"/>
        </div>
        <div v-else style="margin-top:5%;margin-left:0px !important;positon:flex;">
          <button class="buttons" @click="chooseFile()" >Add picture</button>
          <input type="file" id="choose_file" accept="image/*" hidden @change="selectFile($event)"/>
        </div>
        <div v-if="data" style="margin-left:0 !important">
          <p class="name" style="margin-left:0 !important;margin-top:7%;"><b>{{bundle ? 'BUNDLE TITLE' : 'PRODUCT TITLE'}}</b></p>
            <input type="text" style="margin-top:10%;width: 100%" class="col-sm-12 form-control form-control-custom" v-model="data.name" placeholder="Type product title here...">
        </div>
        <div v-else>
          <p class="name" style="margin-top: 3%;"><b>{{bundle ? 'BUNDLE TITLE' : 'PRODUCT TITLE'}}</b></p>
          <input type="text" class="col-sm-12 form-control form-control-custom" v-model="name" placeholder="Type product title here..." required>
        </div>
      </div>
    </div>
      <div class="row" style="margin-top:2%;height:40%;width:70%;position:relative;margin-left:30% !important">
        <div class="column" style="width:100%;margin-left:0 !important">
          <div v-if="data">
            <p class="name" style="margin-left:0%; margin-top: 3%;width:100%"><b>{{bundle ? 'BUNDLE DESCRIPTION' : 'PRODUCT DESCRIPTION'}}</b></p>
            <textarea class="form-control col-sm-12" rows="20" style="height:100px;" v-model="data.full_description" placeholder="Type product description here..."></textarea>
          </div>
          <div v-else>
            <p class="name" style="margin-left:0%; margin-top: 3%"><b>{{bundle ? 'BUNDLE DESCRIPTION' : 'PRODUCT DESCRIPTION'}}</b></p>
            <textarea class="form-control col-sm-12" rows="20" style="height:100px;" v-model="full_description" placeholder="Type product description here..."></textarea>
          </div>
        </div>
        <div v-if="data" class="column" style="width:100%;display:flex;flex-direction:row;flex-wrap:wrap;margin-left:0 !important">
          <div style="width:40%;margin-right:84px !important">
            <p class="name" style="margin-left:0 !important"><b>{{bundle === true ? 'BUNDLE PRICE' : 'REGULAR PRICE'}}</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="data.price" placeholder="Input Regular Price">
          </div>
          <div style="width:40%">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="data.old_price" placeholder="Input Special Offer Price">
          </div>
        </div>
        <div v-else class="column" style="width:100%;display:flex;flex-direction:row;flex-wrap:wrap;margin-left:0 !important">
          <div style="width:40%;margin-right:84px !important">
            <p class="name" style="margin-left: 0%;"><b>{{bundle === true ? 'BUNDLE PRICE' : 'REGULAR PRICE'}}</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="price" placeholder="Input Regular Price">
            <div v-if="price === null">
              <h6></h6>
            </div>
            <div v-else-if="price < 1">
              <div v-show="price < 1">
                <h6 style="color:red">Invalid price</h6>
              </div>
            </div>
          </div>
          <div style="width:40%">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="old_price" placeholder="Input Special Offer Price">
          </div>       
        </div>
      <div v-if="data" style="margin-left: 0%; margin-top: 3%;width:96%">
        <p class="name" style="margin-left: 0%; margin-top: 3%;width:96%"><b>{{bundle ? 'BUNDLE ITEMS' : 'ADD-ON CATEGORY 1'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left:25%">{{bundle ? 'LIMIT CHOICE TO: -' : 'LIMIT CHOICE TO: 1'}}</b></p>
        <div style="width:100%">
          <vue-tags-input
            v-model="category"
            :tags="bundle ? ((data.attributes.length > 0) ? (data.attributes[1].attribute_values != undefined ? data.attributes[1].attribute_values : []) : []) : (data.attributes.length > 0 ? (data.attributes[0].attribute_values != undefined ? data.attributes[0].attribute_values : []) : [])"
            :autocomplete-items="filteredCategory"
            placeholder="Add Category"
            @tags-changed="newTags => bundle ? data.attributes[1].attribute_values = newTags : data.attributes[0].attribute_values = newTags"
          />
          <div v-if="bundle === false">
            <div v-show="errorProductCategory">
              <h6 style="color:red; margin-left: 2">Choose only 1 Category</h6>
            </div>
          </div>
          <div v-else>
            <div v-show="errorNoBundleCategory">
              <h6 style="color:red; margin-left: 2">Please choose a bundle</h6>
            </div>
          </div>
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 3%;width:96%"><b>{{bundle ? 'ADD-ON CATEGORY' : 'ADD-ON CATEGORY 2'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 25%">{{bundle ? 'LIMIT CHOICE TO: 1' : 'LIMIT CHOICE TO: -'}}</b></p>
        <div style="width:100%">
          <vue-tags-input
            v-model="categories"
            :tags="bundle ? ((data.attributes.length > 0) ? (data.attributes[0].attribute_values != undefined ? data.attributes[0].attribute_values : []) : []) : (data.attributes.length > 0 ? (data.attributes[1].attribute_values != undefined ? data.attributes[1].attribute_values : []) : [])"
            :autocomplete-items="filteredItems"
            placeholder="Add Another Category"
            @tags-changed="newTags => bundle ? data.attributes[0].attribute_values = newTags : data.attributes[1].attribute_values = newTags"
          />
          <div v-if="bundle === true">
            <div v-show="errorBundleCategory">
              <h6 style="color:red; margin-left: 2">Choose only 1 Category</h6>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="margin-left: 0%; margin-top: 3%;width:96%">
        <p class="name" style="margin-left: 0%; margin-top: 3%;width:96%"><b>{{bundle ? 'BUNDLE ITEMS' : 'ADD-ON CATEGORY 1'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left:25%">{{bundle ? 'LIMIT CHOICE TO: -' : 'LIMIT CHOICE TO: 1'}}</b></p>
        <div style="width:100%">
          <vue-tags-input
            v-model="category"
            :tags="bundle ? newBundle : sample"
            :autocomplete-items="filteredCategory"
            placeholder="Add Category"
            @tags-changed="newTags => bundle ? newBundle = newTags : sample = newTags"
          />
          <div v-if="bundle === false">
            <div v-show="errorProductCategory">
              <h6 style="color:red; margin-left: 2">Choose only 1 Category</h6>
            </div>
          </div>
          <div v-else>
            <div v-show="errorNoBundleCategory">
              <h6 style="color:red; margin-left: 2">Please choose a bundle</h6>
            </div>
          </div>
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 3%;width:96%"><b>{{bundle ? 'ADD-ON CATEGORY' : 'ADD-ON CATEGORY 2'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 25%">{{bundle ? 'LIMIT CHOICE TO: 1' : 'LIMIT CHOICE TO: -'}}</b></p>
        <div style="width:100%">
          <vue-tags-input
            v-model="categories"
            :tags="newCategories"
            :autocomplete-items="filteredItems"
            placeholder="Add Another Category"
            @tags-changed="newTags => newCategories = newTags"
          />
          <div v-if="bundle === true">
            <div v-show="errorBundleCategory">
              <h6 style="color:red; margin-left: 2">Choose only 1 Category</h6>
            </div>
          </div>
        </div>
      </div>
        <div v-if="data" class="row" style="margin-left: 0% !important;width: 100%">
          <p class="name" style="margin-left: 0%; margin-top: 3%; width: 100%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
          <label style="width:40%" class="radio">
            <input @click="isShow = true" type="radio" name="setTime" id="all" :checked="(data.available_start_date_time_utc != null || data.available_end_date_time_utc == null) ? true : false">
            All Day
          </label>
          <label style="width:40%" class="radio">
            <input @click="isShow = false, all_day = false" type="radio" name="setTime" id="all" :checked="(data.available_start_date_time_utc != null || data.available_end_date_time_utc != null) ? true : false">
            Set Time
          </label>
          <div v-if="!isShow" style="margin-left:30%">
            <vue-timepicker  v-model="data.available_start_date_time_utc"></vue-timepicker>
            <span> - </span>
            <vue-timepicker v-model="data.available_end_date_time_utc"></vue-timepicker>
            <div v-show="isErrorTimeStart">
              <h6 style="color:red; margin-left: 2">Invalid availability time!</h6>
            </div>
            <div v-show="isErrorTimeEnd">
              <h6 style="color:red; margin-left: 2">Invalid availability time!</h6>
            </div>
          </div>     
        </div>
        <div v-else class="row" style="margin-left: 0% !important;width: 100%">
          <p class="name" style="margin-left: 0%; margin-top: 3%;width: 100%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
          <label style="width:40%" class="radio">
          <input @click="show(), time_from = null, time_until = null" type="radio" name="setTime" id="all" :checked="all_day">
          All Day
          </label>
          <label style="width:40%" class="radio">
          <input @click="isShow = true, all_day = false" type="radio" name="setTime" id="all" :checked="(time_from != null || time_until != null) ? true : false">
          Set Time
          </label>
          <div v-show="isShow === true" style="margin-left:30%">
            <vue-timepicker v-model="time_from" placeholder="from"></vue-timepicker>
            <span> - </span>
            <vue-timepicker v-model="time_until" placeholder="until"></vue-timepicker>
            <div v-if="isErrorTimeStart === true">
              <div v-show="isErrorTimeStart === true">
                <h6 style="color:red; margin-left: 2">Invalid availability time!</h6>
              </div>
            </div>
            <div v-if="isErrorTimeEnd === true">
              <div v-show="isErrorTimeEnd === true">
                <h6 style="color:red; margin-left: 2">Invalid availability time!</h6>
              </div>
            </div>
            <div v-else>
              <h6></h6>
            </div>
          </div>
        </div>
        <div class="row" style="width:100%;margin-left:0 !important">
          <div class="column" style="width:100%;margin-left:0px !important">
            <p class="name" style="margin-left: 0%; margin-top: 2%"><b>{{bundle ? 'BUNDLE AVAILABILITY (LOCATION)' : 'PRODUCT AVAILABILITY (LOCATION)'}}</b></p>
            <input type="radio" name="loc" class="in" checked="checked">
            <label for="loc" class="on">{{store}}</label>
          </div>
        </div>
      </div>
      <div class="row" style="justify-content: center">
        <button class="buttonCommon pull-left" style="background-color: #B7F6D9; border-color: #B7F6D9;height:50px;width:120px" @click.prevent="onSave(data)">SAVE</button>
        <button class="buttonCommon pull-right" style="margin-left:5px !important;height:50px;width:120px" @click="cancel()">DISCARD</button>
      </div>
      <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content text-center">
          <span @click="closeModal()" class="close">&times;</span>
          <p>Added Successfully.</p>
          <center>
            <button style="width: 30%;" type="button" @click="closeModal()" class="btn btn-success">OK</button>
          </center>
        </div>
      </div>
      <div id="updateModal" class="modal" v-if="hasUpdateWatch">
        <!-- Modal content -->
        <div class="modal-content">
          <span @click="closeUpdateModal()" class="close">&times;</span>
          <p>Updated successfully.</p>
          <center>
            <button style="width: 30%;" type="button" @click="closeUpdateModal()" class="btn btn-success">OK</button>
          </center>
        </div>
      </div>
      <div id="errorModal" class="modal" v-if="hasUpdateErrorWatch">
        <!-- Modal content -->
        <div class="modal-content">
          <span @click="closeErrorModal()" class="close">&times;</span>
          <p style="color: red">Please fill up all empty fields.</p>
          <center>
            <button style="width: 30%;" type="button" @click="closeErrorModal()" class="btn btn-danger">Close</button>
          </center>
        </div>
      </div>
      <div id="errorModal" class="modal" v-if="hasNoUpdateErrorWatch">
        <!-- Modal content -->
        <div class="modal-content">
          <span @click="closeErrorModal()" class="close">&times;</span>
          <p style="color: red">Nothing was Updated.</p>
          <center>
            <button style="width: 30%;" type="button" @click="closeErrorModal()" class="btn btn-danger">Close</button>
          </center>
        </div>
      </div>
      <div id="other" class="modal" v-if="dontExistWatch">
        <!-- Modal content -->
        <div class="modal-content">
          <span @click="closeOtherModal()" class="close">&times;</span>
          <p style="color: red">Please select existing category.</p>
          <center>
            <button style="width: 30%;" type="button" @click="closeOtherModal()" class="btn btn-danger">Close</button>
          </center>
        </div>
      </div>
      <div id="image" class="modal" v-if="imageFakeWatch">
        <!-- Modal content -->
        <div class="modal-content">
          <span @click="closeImageModal()" class="close">&times;</span>
          <p style="color: red">Please upload photo with extension ' bmp , gif, png , jpg , jpeg '</p>
          <center>
            <button style="width: 30%;" type="button" @click="closeImageModal()" class="btn btn-danger">Close</button>
          </center>
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
import axios from 'axios'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import ErrorModal from '../../../components/increment/generic/modal/Alert.vue'
import config from 'src/config'
export default {
  props: ['bundle', 'data', 'category1', 'category2', 'categoryId', 'isErrorTimeStart', 'isErrorTimeEnd', 'errorMessage', 'bundleProducts', 'hasUpdate', 'updateError', 'noUpdateError', 'dontExist', 'imageDontExist', 'errorProductCategory', 'errorBundleCategory', 'errorNoBundleCategory'],
  data(){
    return {
      newBundle: [],
      newDataCategory: [],
      newCategories: [],
      sample: [],
      updateTimeError: false,
      isSuccess: false,
      encodedImage: null,
      all_day: true,
      time_from: null,
      time_until: null,
      isShow: false,
      images: null,
      setTime: null,
      name: null,
      store: null,
      full_description: null,
      price: null,
      old_price: null,
      available_start_date_time_utc: null,
      available_end_date_time_utc: null,
      clickSetTime: false,
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
      }]
    }
  },
  components: {
    VueTagsInput,
    Confirmation,
    VueTimepicker,
    ErrorModal
  },
  mounted(){
    this.isErrorTimeEnd = false
    this.isErrorTimeStart = false
    this.retrieveStore()
    if(this.category1 !== null){
      this.category1.forEach(element => {
        element['text'] = element.name
        this.autocompleteCategory.push(element)
        this.CategoryTags.push(element)
      })
    }
    if(this.category2 !== null){
      this.category2.forEach(element => {
        element['text'] = element.name
        this.autocompleteItems.push(element)
        this.CategoriesTags.push(element)
      })
    }
    if(this.bundle === true){
      this.bundleProducts.forEach(element => {
        element['text'] = element.Name
        this.autocompleteCategory.push(element)
      })
    }
    if(this.hasUpdate === true){
      let modal = document.getElementById('updateModal')
      modal.style.display = 'block'
    }
  },
  computed: {
    filteredCategory() {
      if(this.bundle === true) {
        return this.autocompleteCategory.filter(i => {
          return i.name.toLowerCase().indexOf(this.category.toLowerCase()) !== -1
        })
      }else {
        return this.autocompleteCategory.filter(i => {
          return i.name.toLowerCase().indexOf(this.category.toLowerCase()) !== -1
        })
      }
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.name.toLowerCase().indexOf(this.categories.toLowerCase()) !== -1
      })
    },
    hasUpdateWatch(){
      if(this.hasUpdate === true){
        let modal = document.getElementById('updateModal')
        modal.style.display = 'block'
        return true
      }
      return true
    },
    hasUpdateErrorWatch(){
      if(this.updateError === true){
        let modal = document.getElementById('errorModal')
        modal.style.display = 'block'
        return true
      }
      return true
    },
    hasNoUpdateErrorWatch(){
      if(this.noUpdateError === true){
        let modal = document.getElementById('errorModal')
        modal.style.display = 'block'
        return true
      }
      return true
    },
    dontExistWatch(){
      if(this.dontExist === true){
        let modal = document.getElementById('other')
        modal.style.display = 'block'
        return true
      }
      return true
    },
    imageFakeWatch(){
      if(this.imageDontExist === true){
        let modal = document.getElementById('image')
        modal.style.display = 'block'
        return true
      }
      return true
    }
  },
  methods: {
    retrieveStore() {
      this.APIGetRequest('stores', response => {
        this.store = response.stores[0].name
      })
    },
    show() {
      this.all_day = true
      this.isShow = false
    },
    addProduct() {
      const { user } = AUTH
      let parameter = null
      let modal = document.getElementById('myModal')
      let errorModal = document.getElementById('errorModal')
      let other = document.getElementById('other')
      if(this.name === null || this.name === '' || this.categoryId === null || this.categoryId === '' || this.full_description === null || this.full_description === '' || this.price === null || this.categoryId === '' || this.CategoriesTags === null || this.CategoriesTags === '' || this.CategoryTags === null || this.CategoryTags === '') {
        errorModal.style.display = 'block'
        return
      }
      let bun = null
      if(this.newBundle.length >= 1){
        this.newBundle.map(ele => {
          bun = ele.id
        })
      }
      if(this.bundle === true && this.newBundle.length >= 1 && (bun === null || bun === undefined)){
        other.style.display = 'block'
        return
      }
      let a = null
      if(this.sample.length >= 1){
        this.sample.map(ele => {
          a = ele.id
        })
      }
      if(this.sample.length >= 1 && (a === null || a === undefined)){
        other.style.display = 'block'
        return
      }
      let b = null
      if(this.newCategories.length >= 1 && this.bundle === false){
        this.newCategories.map(el => {
          b = el.id
        })
      }
      if(b === undefined && this.newCategories.length >= 1 && this.bundle === false){
        other.style.display = 'block'
        return
      }
      if(this.all_day === false){
        if(parseInt(this.time_from.HH) > 8 && parseInt(this.time_from.HH) <= 17){
          this.isErrorTimeStart = false
        }else{
          this.isErrorTimeStart = true
          this.isErrorTimeEnd = false
          return
        }
        if(this.all_day === false && (parseInt(this.time_until.HH) === 18) && (parseInt(this.time_until.mm) === 0)){
          this.isErrorTimeEnd = false
        }else if((parseInt(this.time_until.HH) === parseInt(this.time_from.HH)) && (parseInt(this.time_until.mm) > parseInt(this.time_from.mm))){
          this.isErrorTimeEnd = false
        }else if(this.all_day === false && (parseInt(this.time_until.HH) === 18 ? parseInt(this.time_until.mm) === 0 : parseInt(this.time_until.HH) < 18) && parseInt(this.time_until.HH) > parseInt(this.time_from.HH)){
          this.isErrorTimeEnd = false
        }else {
          this.isErrorTimeEnd = true
          return
        }
      }
      if(this.bundle === true){
        if(this.newCategories.length > 1){
          this.errorBundleCategory = true
          return
        }else{
          this.errorBundleCategory = false
        }
      }
      if(this.bundle === false){
        if(this.sample.length > 1){
          this.errorProductCategory = true
          return
        }else{
          this.errorProductCategory = false
        }
        if(this.old_price === null || this.old_price === ''){
          this.old_price = 0
        }
      }else{
        if(this.newBundle.length === 0){
          this.errorNoBundleCategory = true
          return
        }else{
          this.errorNoBundleCategory = false
        }
      }
      if(this.all_day === true){
        parameter = {
          category_id: this.categoryId,
          store_ids: [user.storeId],
          name: this.name,
          full_description: this.full_description,
          price: this.price,
          old_price: this.old_price,
          attributes: [
            {
              product_attribute_id: 10, // category 1,
              attribute_control_type_name: 'DropdownList',
              attribute_values: this.sample.map((el, index) => {
                let temp = {}
                temp.name = el.name
                temp.display_order = index + 1
                temp.quantity = 1
                temp.price_adjustment = 0
                temp.weight_adjustment = 0
                temp.cost = 0
                temp.type = 'Simple'
                temp.type_id = 0
                temp.associated_product_id = 0
                return temp
              })
            },
            {
              product_attribute_id: 11,  // category 2
              attribute_control_type_name: 'Checkboxes',
              attribute_values: this.newCategories.map((el, index) => {
                let temp = {}
                temp.name = el.name
                temp.display_order = index + 1
                temp.quantity = 1
                temp.price_adjustment = el.price_adjustment
                temp.weight_adjustment = 0
                temp.cost = 0
                temp.type = 'Simple'
                temp.type_id = 0
                temp.associated_product_id = 0
                return temp
              })
            },
            {
              product_attribute_id: 12,  // bundle
              attribute_control_type_name: 'DropdownList',
              attribute_values: this.newBundle.map((el, index) => {
                let temp = {}
                temp.name = el.name
                temp.display_order = index + 1
                temp.quantity = 1
                temp.price_adjustment = 0
                temp.weight_adjustment = 0
                temp.cost = 0
                temp.type = 'Simple'
                temp.type_id = 0
                temp.associated_product_id = 0
                return temp
              })
            }
          ],
          available_start_date_time_utc: '',
          available_end_date_time_utc: '',
          published: false
        }
      }else{
        parameter = {
          category_id: this.categoryId,
          store_ids: [user.storeId],
          name: this.name,
          full_description: this.full_description,
          price: this.price,
          old_price: this.old_price,
          attributes: [
            {
              product_attribute_id: 10, // category 1,
              attribute_control_type_name: 'DropdownList',
              attribute_values: this.sample.map((el, index) => {
                let temp = {}
                temp.name = el.name
                temp.display_order = index + 1
                temp.quantity = 1
                temp.price_adjustment = 0
                temp.weight_adjustment = 0
                temp.cost = 0
                temp.type = 'Simple'
                temp.type_id = 0
                temp.associated_product_id = 0
                return temp
              })
            },
            {
              product_attribute_id: 11,  // category 2
              attribute_control_type_name: 'Checkboxes',
              attribute_values: this.CategoriesTags.map((el, index) => {
                let temp = {}
                temp.name = el.name
                temp.display_order = index + 1
                temp.quantity = 1
                temp.price_adjustment = el.price_adjustment
                temp.weight_adjustment = 0
                temp.cost = 0
                temp.type = 'Simple'
                temp.type_id = 0
                temp.associated_product_id = 0
                return temp
              })
            },
            {
              product_attribute_id: 12,  // bundle
              attribute_control_type_name: 'DropdownList',
              attribute_values: this.newBundle.map((el, index) => {
                let temp = {}
                temp.name = el.name
                temp.display_order = index + 1
                temp.quantity = 1
                temp.price_adjustment = 0
                temp.weight_adjustment = 0
                temp.cost = 0
                temp.type = 'Simple'
                temp.type_id = 0
                temp.associated_product_id = 0
                return temp
              })
            }
          ],
          available_start_date_time_utc: this.time_from.HH + ':' + this.time_from.mm,
          available_end_date_time_utc: this.time_until.HH + ':' + this.time_until.mm,
          published: false
        }
      }
      if(this.bundle === true) {
        parameter.attributes.splice(0, 1)
      } else {
        parameter.attributes.splice(2, 1)
      }
      if(this.images !== null){
        let formData = new FormData()
        formData.append('photo', this.images)
        $('#loading').css({'display': 'block'})
        axios.post(`${config.BACKEND_URL}/upload_photo`, formData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
            }
          }
        ).then(response => {
          parameter['images'] = [
            {
              src: response.data,
              // attachment: null,
              position: 0
            }
          ]
          this.isSuccess = true
          this.APIPostRequest(`products`, {product: parameter}, res => {
            if(this.isSuccess === true) {
              modal.style.display = 'block'
            }
            $('#loading').css({'display': 'none'})
            this.APIGetRequest(`/products?CategoryId=${this.categoryId}`, response => {
              if(response.products.length > 0) {
                this.$parent.products = response.products
              }
            })
          })
          // if(res.errors){
          //   this.imageFakeWatch()
          // }
          $('#loading').css({'display': 'none'})
        })
      }else{
        this.isSuccess = true
        this.APIPostRequest(`products`, {product: parameter}, res => {
          $('#loading').css({'display': 'block'})
          this.APIGetRequest(`/products?CategoryId=${this.categoryId}`, response => {
            if(this.isSuccess === true) {
              modal.style.display = 'block'
            }
            $('#loading').css({'display': 'none'})
            if(response.products.length > 0) {
              this.$parent.products = response.products
              this.errorMessage = 'Product added successfully!'
              $('#incrementAlert').modal('show')
            }
          })
        })
        $('#loading').css({'display': 'none'})
      }
    },
    remove(data){
      $('#loading').css({'display': 'block'})
      this.APIDeleteRequest(`products/${data.id}`, {}, response => {
        $('#loading').css({'display': 'none'})
        this.back()
        $('#loading').css({'display': 'block'})
        this.APIGetRequest(`/products?CategoryId=${data.category_id}`, response => {
          $('#loading').css({'display': 'none'})
          // if(response.products.length > 0) {
          this.$parent.products = response.products
          // }
        })
      })
    },
    del(id) {
      this.$refs.prod.show(id)
    },
    back() {
      this.$parent.isEdit = false
      this.$parent.add = false
    },
    cancel(){
      this.$parent.isEdit = false
    },
    onSave(data){
      if(data) {
        data['all_day'] = this.all_day
        data['CategoryTags'] = this.CategoryTags
        data['CategoriesTags'] = this.CategoriesTags
        data['bundleProduct'] = this.bundleProduct
        data['uploaded_image'] = this.images
        this.$emit('onSave', data)
      } else {
        this.addProduct()
      }
    },
    chooseFile(){
      $('#choose_file')[0].click()
    },
    selectFile(event){
      this.images = event.target.files[0]
      const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp']
      const isValidExtension = validExtensions.indexOf(this.images.type, validExtensions) > -1
      let image = event.target.files[0].name
      // this.encodedImage = btoa(image);
      if(isValidExtension === true){
        const reader = new FileReader()
        reader.onloadend = (e) => {
          this.encodedImage = e.target.result
        }
        reader.readAsDataURL(event.target.files[0])
      }else{
        this.imageDontExist = true
      }
    },
    timeError(){
      if(this.$parent.isError === true){
        this.updateTimeError = true
      }
    },
    closeModal() {
      let modal = document.getElementById('myModal')
      let span = document.getElementsByClassName('close')[0]
      modal.style.display = 'none'
      this.$parent.isEdit = false
      this.$parent.add = false
      this.$parent.hasUpdate = false
    },
    closeErrorModal() {
      let modal = document.getElementById('errorModal')
      let span = document.getElementsByClassName('close')[0]
      modal.style.display = 'none'
      this.$parent.updateError = false
      this.$parent.noUpdateError = false
      this.$parent.dontExist = false
      this.$parent.imageDontExist = false
    },
    closeOtherModal() {
      let modal = document.getElementById('other')
      modal.style.display = 'none'
      this.$parent.dontExist = false
    },
    closeImageModal() {
      let modal = document.getElementById('image')
      modal.style.display = 'none'
      this.$parent.imageDontExist = false
    },
    closeUpdateModal() {
      let modal = document.getElementById('updateModal')
      let span = document.getElementsByClassName('close')[0]
      modal.style.display = 'none'
      this.$parent.isEdit = false
      this.$parent.add = false
      this.$parent.hasUpdate = false
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
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 20%;
  min-height: 140px;
  margin-top: 8%;
  text-align: center;
  color: green;
  font-weight: bold;
  }
/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-left: 90%
}
.close:hover,
.close:focus {
  color: red;
  text-decoration: none;
  cursor: pointer;
}
</style>
