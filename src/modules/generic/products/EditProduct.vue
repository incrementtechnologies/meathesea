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
        <div>
          <button class="pull-right buttons" style="margin-left:40px !important" @click="del(data)"><i style="color:black;margin-right: 2%" class="fas fa-trash"></i> Remove</button>
        </div>
        <div style="margin-top:5%;margin-left:0px !important;positon:flex;">
          <button class="buttons" @click="chooseFile()" >Change picture</button>
          <input type="file" id="choose_file" accept="image/*" hidden @change="selectFile($event)"/>
        </div>
        <div v-if="data">
          <p class="name" style="float:left;margin-left:0 !important;margin-top:7%;"><b>{{bundle ? 'BUNDLE TITLE1' : 'PRODUCT TITLE'}}</b></p>
            <input type="text" style="margin-top:10%;width: 100%" class="col-sm-12 form-control form-control-custom" v-model="data.name" placeholder="Type product title here...">
        </div>
        <div v-else>
          <p class="name" style="margin-top: 3%;"><b>{{bundle ? 'BUNDLE TITLE1' : 'PRODUCT TITLE'}}</b></p>
          <input type="text" class="col-sm-12 form-control form-control-custom" v-model="name" placeholder="Type product title here...">
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
          </div>
          <div style="width:40%">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100 form-control form-control-custom" v-model="old_price" placeholder="Input Special Offer Price"> 
          </div>       
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 3%;width:96%"><b>{{bundle ? 'BUNDLE ITEMS' : 'ADD-ON CATEGORY 1'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left:25%">LIMIT CHOICE TO: 1</b></p>
        <div style="width:100%">
          <vue-tags-input
            v-model="category"
            :tags="CategoryTags"
            :validation="validation"
            :autocomplete-items="filteredCategory"
            placeholder="Add Category"
            @tags-changed="newTags => CategoryTags = newTags"
          />
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 3%;width:96%"><b>{{bundle ? 'ADD-ON CATEGORY' : 'ADD-ON CATEGORY 2'}}</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 25%">LIMIT CHOICE TO: -</b></p>
        <div style="width:100%">
          <vue-tags-input
            v-model="categories"
            :tags="CategoriesTags"
            :validation="validation"
            :autocomplete-items="filteredItems"
            placeholder="Add Another Category"
            @tags-changed="newTags => CategoriesTags = newTags"
          />
        </div>  
        <div v-if="data" class="row" style="margin-left: 0% !important;width: 100%">
          <p class="name" style="margin-left: 0%; margin-top: 3%; width: 100%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
          <label style="width:40%" class="radio">
            <input @click="isShow = true" type="radio" name="setTime" id="all" :checked="(data.available_start_date_time_utc != null || data.available_end_date_time_utc == null) ? true : false">
            All Day
          </label>
          <label style="width:40%" class="radio">
            <input @click="isShow = false" type="radio" name="setTime" id="all" :checked="(data.available_start_date_time_utc != null || data.available_end_date_time_utc != null) ? true : false">
            Set Time
          </label>
          <div v-if="!isShow" style="margin-left:30%">
            <vue-timepicker  v-model="data.available_start_date_time_utc"></vue-timepicker>
            <span> - </span>
            <vue-timepicker v-model="data.available_end_date_time_utc"></vue-timepicker>
          </div>     
        </div>
        <div v-else class="row" style="margin-left: 0% !important;width: 100%">
          <p class="name" style="margin-left: 0%; margin-top: 3%;width: 100%"><b>{{bundle ? 'BUNDLE AVAILABILITY (TIME)' : 'PRODUCT AVAILABILITY (TIME)'}}</b></p>
          <label style="width:40%" class="radio">
          <input @click="show()" type="radio" name="setTime" id="all" :checked="all_day">
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
          </div>
        </div>
        <div v-if="data" class="row" style="width:100%;margin-left:0 !important">
          <div class="column" style="width:100%;margin-left:0px !important">
            <p class="name" style="margin-left: 0%; margin-top: 2%"><b>{{bundle ? 'BUNDLE AVAILABILITY (LOCATION)' : 'PRODUCT AVAILABILITY (LOCATION)'}}</b></p>
            <input type="radio" value="loc" v-model="setLocation" class="in">
            <label for="loc" class="on">88 Queens Road W</label>
            <input type="radio" value="location" v-model="setLocation" class="in">
            <label for="location" class="on">Location 2</label>
            <input type="radio" value="allLocations" v-model="setLocation" class="in">
            <label for="allLocations" class="on">All Locations</label>
          </div>
        </div>
        <div v-else class="row" style="width:100%">
          <div class="column" style="width:100%;margin-left:0px !important">
          <p class="name" style="margin-left: 0%;margin-top:2%"><b>{{bundle ? 'BUNDLE AVAILABILITY (LOCATION)' : 'PRODUCT AVAILABILITY (LOCATION)'}}</b></p>
            <input type="radio" value="loc" v-model="setLocation" class="in">
            <label for="loc" class="on">88 Queens Road W</label>
            <input type="radio" value="location" v-model="setLocation" class="in">
            <label for="location" class="on">Location 2</label>
            <input type="radio" value="allLocations" v-model="setLocation" class="in">
            <label for="allLocations" class="on">All Locations</label>
          </div>
        </div>
      </div>
      <div class="row" style="justify-content: center">
        <button class="buttonCommon pull-left" style="background-color: #B7F6D9; border-color: #B7F6D9;height:50px;width:120px" @click.prevent="onSave(data)">SAVE</button>
        <button class="buttonCommon pull-right" style="margin-left:5px !important;height:50px;width:120px" @click="cancel()">DISCARD</button>
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
export default {
  props: ['bundle', 'data', 'category1', 'category2', 'categoryId'],
  data(){
    return {
      encodedImage: null,
      all_day: false,
      time_from: null,
      time_until: null,
      isShow: false,
      images: null,
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
      }]
    }
  },
  components: {
    VueTagsInput,
    Confirmation,
    VueTimepicker
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
    show() {
      this.all_day = true
      this.isShow = false
    },
    addProduct() {
      // console.log(this.all_day, 'kjhjk')
      const { user } = AUTH
      let parameter = null
      if(this.all_day === true){
        parameter = {
          category_id: this.categoryId,
          store_ids: [user.userID],
          name: this.name,
          full_description: this.full_description,
          price: this.price,
          old_price: this.old_price,
          available_start_date_time_utc: '',
          available_end_date_time_utc: ''
        }
      }else{
        parameter = {
          category_id: this.categoryId,
          store_ids: [user.userID],
          name: this.name,
          full_description: this.full_description,
          price: this.price,
          old_price: this.old_price,
          available_start_date_time_utc: this.time_from.HH + ':' + this.time_from.mm,
          available_end_date_time_utc: this.time_until.HH + ':' + this.time_until.mm
        }
      }
      console.log(parameter)
      if(this.images !== null){
        let formData = new FormData()
        formData.append('photo', this.images)
        $('#loading').css({'display': 'block'})
        axios.post(`https://mtsbackenddev.azurewebsites.net/api/upload_photo`, formData,
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
          this.APIPostRequest(`products`, {product: parameter}, res => {
            console.log(res)
            this.$parent.add = false
            this.$parent.isEdit = false
            $('#loading').css({'display': 'block'})
            this.APIGetRequest(`/products?CategoryId=${this.categoryId}`, response => {
              $('#loading').css({'display': 'none'})
              if(response.products.length > 0) {
                console.log('test', this.$parent.product)
                this.$parent.products = response.products
              }
            })
          })
          $('#loading').css({'display': 'none'})
          console.log('images', this.images)
        })
      }else{
        this.APIPostRequest(`products`, {product: parameter}, res => {
          console.log(res)
          this.$parent.add = false
          this.$parent.isEdit = false
          $('#loading').css({'display': 'block'})
          this.APIGetRequest(`/products?CategoryId=${this.categoryId}`, response => {
            $('#loading').css({'display': 'none'})
            if(response.products.length > 0) {
              console.log('test', this.$parent.product)
              this.$parent.products = response.products
            }
          })
        })
        $('#loading').css({'display': 'none'})
        console.log('images', this.images)
      }
    },
    remove(data){
      console.log(data.category_id)
      $('#loading').css({'display': 'block'})
      this.APIDeleteRequest(`products/${data.id}`, {}, response => {
        $('#loading').css({'display': 'none'})
        $('#loading').css({'display': 'block'})
        this.back()
        this.APIGetRequest(`/products?CategoryId=${data.category_id}`, response => {
          $('#loading').css({'display': 'none'})
          if(response.products.length > 0) {
            console.log('test', this.$parent.product)
            this.$parent.products = response.products
          }
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
      // console.log(event.target.files[0].name)
      this.images = event.target.files[0]
      let image = event.target.files[0].name
      // this.encodedImage = btoa(image);
      console.log(this.images)
      const reader = new FileReader()
      reader.onloadend = (e) => {
        this.encodedImage = e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
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
