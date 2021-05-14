<template>
<div>
  <button class="btn btn-outline-primary addBtn" style="float: right; margin-right: 77px" v-if="add === false" @click="$emit('showAddForm', true), isEdit = true, add = true">
    <b>add new</b></button>
  <div>
    <br><br>
  </div>
	<div class="contents">
		<div class="clearfix">
			<CategoryList :type="'menu'"  :data="categories"/>
			<div class="column content">
				<ProductList v-if="!isEdit" :data="products" @showAddForm="isEdit = true" @updateAvailability="updateAvailability"/>
        <EditProduct ref="products" :errorProductCategory="errorProductCategory" :errorBundleCategory="errorBundleCategory" :updateError="updateError" :noUpdateError="noUpdateError" :hasUpdate="hasUpdate" :bundleProducts="bundleProducts" :categoryId="category" v-if="isEdit" :errorMessage="errorMessage" :isErrorTimeEnd="isErrorTimeEnd" :isErrorTimeStart="isErrorTimeStart" :category1="category1" :category2="category2" :data=" add === true ? null : data" @onSave="update($event)" :bundle="bundled"/>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import ProductList from 'modules/generic/products/ProductList.vue'
import EditProduct from 'modules/generic/products/EditProduct.vue'
import CategoryList from 'modules/generic/products/CategoryList.vue'
import AUTH from 'src/services/auth'
import axios from 'axios'
export default {
  data() {
    return {
      category1: null,
      category2: null,
      isActive: false,
      hasError: false,
      isEdit: false,
      data: null,
      detail: null,
      bundled: false,
      categories: [],
      products: null,
      firstRetrieve: true,
      category: null,
      add: false,
      photo: null,
      isError: false,
      errorMessage: null,
      bundleProducts: [],
      user: AUTH,
      hasUpdate: false,
      updateError: false,
      noUpdateError: false,
      errorBundleCategory: false,
      errorProductCategory: false,
      isErrorTimeStart: false,
      isErrorTimeEnd: false
    }
  },
  watch: {
    $route(to, from){
      this.isEdit = false
    }
  },
  mounted() {
    this.retrieveCategories()
    this.retrieveCategory1()
    this.retrieveCategory2()
  },
  components: {
    ProductList,
    CategoryList,
    EditProduct
  },
  methods: {
    redirectEdit(){
      this.isEdit = false
      // e.currentTarget.classList.add('active')
    },
    setActive(id) {
      this.isEdit = false
      let active = document.getElementsByClassName('list')
      for (var i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace('active', '')
      }
      active[id].classList.add('active')
    },
    retrieveCategories() {
      const {user} = AUTH
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/get_deli_shop_categories?storeId=${user.storeId}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.categories.length > 0) {
          this.categories = response.categories
          this.category = response.categories[0].id
          if(this.firstRetrieve === true) {
            this.retrieveProducts(this.categories[0].id)
            this.firstRetrieve = false
          }
        }
      })
    },
    retrieveProducts(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products?CategoryId=${id}`, response => {
        if(response.products.length > 0) {
          this.products = response.products
          $('#loading').css({'display': 'none'})
        } else {
          $('#loading').css({'display': 'none'})
        }
      })
    },
    retrieveOneProduct(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products/${id}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.products.length > 0) {
          response.products[0].attributes.forEach(element => {
            element.attribute_values.forEach(item => {
              item['text'] = item.name
            })
          })
          this.data = response.products[0]
          // response.products[0].attributes[0].attribute_values.forEach(element => {
          //   element['text'] = element.name
          // })
          // response.products[0].attributes[1 ].attribute_values.forEach(element => {
          //   element['text'] = element.name
          // })
          // this.data = response.products[0]
        } else {
          this.data = null
        }
      })
    },
    update(product){
      var temp, temp1, timeStart, timeEnd, startTime, endTime, newtimeStart, newtimeEnd
      if(product.available_start_date_time_utc === null && product.available_end_date_time_utc === null || product.available_start_date_time_utc === '' && product.available_end_date_time_utc === ''){
        newtimeStart = ''
        newtimeEnd = ''
        startTime = ''
        endTime = ''
        timeStart = ''
        timeEnd = ''
      }else if(product.available_start_date_time_utc.HH !== undefined && product.available_start_date_time_utc.mm !== undefined && product.available_start_date_time_utc.HH !== null && product.available_start_date_time_utc.mm !== null && product.available_end_date_time_utc.HH !== '' && product.available_end_date_time_utc.mm !== ''){
        startTime = product.available_start_date_time_utc.HH
        endTime = product.available_end_date_time_utc.HH
        if(startTime > 8){
          this.isErrorTimeStart = false
        }else{
          this.isErrorTimeStart = true
          return
        }
        if(startTime < endTime && endTime < 17){
          this.isErrorTimeEnd = false
        }else{
          this.isErrorTimeEnd = true
          return
        }
      }else if(product.available_start_date_time_utc !== null && product.available_end_date_time_utc !== null && product.available_start_date_time_utc !== '' && product.available_end_date_time_utc !== ''){
        newtimeStart = product.available_start_date_time_utc.split('T')
        newtimeEnd = product.available_end_date_time_utc.split('T')
        startTime = product.available_start_date_time_utc.split(':')
        endTime = product.available_end_date_time_utc.split(':')
        timeStart = product.available_start_date_time_utc.split('')
        timeEnd = product.available_end_date_time_utc.split('')
        // console.log(timeStart.length, timeEnd.length)
        // console.log(timeStart.length, timeEnd.length)
        // console.log(timeStart.length, timeEnd.length)
        if(timeStart.length === 5 && timeEnd.length === 5){
          if(parseInt(startTime) > 8){
            this.isErrorTimeStart = false
          }else{
            this.isErrorTimeStart = true
            return
          }
          if(parseInt(endTime) > parseInt(startTime) && parseInt(endTime) < 17){
            this.isErrorTimeEnd = false
          }else{
            this.isErrorTimeEnd = true
            return
          }
        }else if(timeStart.length > 5 && timeEnd.length === 5){
          if(parseInt(endTime) < 17){
            this.isErrorTimeEnd = false
          }else{
            this.isErrorTimeEnd = true
            return
          }
          if(parseInt(endTime) > parseInt(newtimeStart[1])){
            this.isErrorTimeEnd = false
          }else{
            this.isErrorTimeEnd = true
            return
          }
        }else if(timeStart.length === 5 && timeEnd.length > 5){
          if(parseInt(startTime) > 8){
            this.isErrorTimeStart = false
          }else{
            this.isErrorTimeStart = true
            return
          }
          if(parseInt(startTime) < parseInt(newtimeEnd[1])){
            this.isErrorTimeStart = false
          }else{
            this.isErrorTimeStart = true
            return
          }
        }else{
          this.isErrorTimeStart = false
          this.isErrorTimeEnd = false
        }
      }
      let Prod = null
      if(product.name === this.data.name && product.categoryId === this.data.category_id && product.full_description === this.data.full_description && product.price === this.data.price && product.old_price === this.data.old_price && product.CategoriesTags === this.data.CategoriesTags && product.CategoryTags === this.data.CategoryTags && (product.available_start_date_time_utc === this.data.available_start_date_time_utc && product.available_end_date_time_utc === this.data.available_end_date_time_utc)){
        this.noUpdateError = true
        return
      }
      if(product.name === null || product.name === '' || product.categoryId === null || product.categoryId === '' || product.full_description === null || product.full_description === '' || product.price === null || product.categoryId === '' || product.old_price === null || product.old_price === '' || product.CategoriesTags === null || product.CategoriesTags === '' || product.CategoryTags === null || product.CategoryTags === '') {
        this.updateError = true
        return
      }
      if(this.bundled === true){
        if(product.attributes[0].attribute_values.length > 1){
          this.errorBundleCategory = true
          return
        }else{
          this.errorBundleCategory = false
        }
      }
      if(this.bundled === false){
        if(product.attributes[0].attribute_values.length > 1){
          this.errorProductCategory = true
          return
        }else{
          this.errorProductCategory = false
        }
      }
      if(product !== null){
        if(product.available_start_date_time_utc !== null && product.available_end_date_time_utc !== null && product.available_start_date_time_utc !== undefined && product.available_end_date_time_utc !== undefined){
          Prod = {
            product: {
              Id: product.id,
              name: product.name,
              full_description: product.full_description,
              price: product.price,
              old_price: product.old_price,
              available_start_date_time_utc: product.available_start_date_time_utc.HH ? product.available_start_date_time_utc.HH + ':' + product.available_start_date_time_utc.mm : product.available_start_date_time_utc,
              available_end_date_time_utc: product.available_end_date_time_utc.HH ? product.available_end_date_time_utc.HH + ':' + product.available_end_date_time_utc.mm : product.available_end_date_time_utc,
              attributes: [
                {
                  product_attribute_id: 10, // category 1,
                  attribute_control_type_name: 'DropdownList',
                  attribute_values: product.attributes[0].attribute_values.map((el, index) => {
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
                  attribute_values: product.attributes[(this.bundled ? 0 : 1)].attribute_values.map((el, index) => {
                    let temp = {}
                    temp.name = el.name
                    temp.display_order = index + 1
                    temp.price_adjustment = el.price_adjustment
                    temp.quantity = 1
                    // temp.price_adjustment = 0
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
                  attribute_values: product.attributes[1].attribute_values.map((el, index) => {
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
              ].filter(el => {
                if(this.bundled){
                  return [11, 12].includes(el.product_attribute_id)
                } else {
                  return [10, 11].includes(el.product_attribute_id)
                }
              })
            }
          }
        }else{
          Prod = {
            product: {
              Id: product.id,
              name: product.name,
              full_description: product.full_description,
              price: product.price,
              old_price: product.old_price,
              available_start_date_time_utc: null,
              available_end_date_time_utc: null,
              attributes: [
                {
                  product_attribute_id: 10, // category 1,
                  attribute_control_type_name: 'DropdownList',
                  attribute_values: product.attributes[0].attribute_values.map((el, index) => {
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
                  attribute_control_type_name: 'DropdownList',
                  attribute_values: product.attributes[(this.bundled ? 0 : 1)].attribute_values.map((el, index) => {
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
                  attribute_values: product.attributes[1].attribute_values.map((el, index) => {
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
              ].filter(el => {
                if(this.bundled){
                  return [11, 12].includes(el.product_attribute_id)
                } else {
                  return [10, 11].includes(el.product_attribute_id)
                }
              })
            }
          }
        }
        if(product.uploaded_image !== null && product.uploaded_image !== undefined){
          let formData = new FormData()
          formData.append('photo', product.uploaded_image)
          $('#loading').css({'display': 'block'})
          axios.post(`https://mtsbackenddev.azurewebsites.net/api/upload_photo`, formData,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
              }
            }
          ).then(response => {
            Prod['product']['images'] = [
              {
                src: response.data,
                // attachment: null,
                position: 0
              }
            ]
            $('#loading').css({'display': 'block'})
            this.APIPutRequest(`products/${product.id}`, Prod, response => {
              this.hasUpdate = true
              $('#loading').css({'display': 'none'})
              this.APIGetRequest(`/products?CategoryId=${this.category}`, response => {
                $('#loading').css({'display': 'none'})
                if(response.products.length > 0) {
                  this.products = response.products
                }
            // $('#loading').css({'display': 'block'})
            // this.APIPutRequest(`products/${product.id}`, Prod, response => {
            //   this.hasUpdate = true
            //   $('#loading').css({'display': 'none'})
            //   this.APIGetRequest(`/products?CategoryId=${this.category}`, response => {
            //     $('#loading').css({'display': 'none'})
            //     if(response.products.length > 0) {
            //       this.products = response.products
            //       this.back()
            //     }
              })
            })
          })
        }else{
          $('#loading').css({'display': 'block'})
          this.APIPutRequest(`products/${product.id}`, Prod, response => {
            this.hasUpdate = true
            $('#loading').css({'display': 'none'})
            this.APIGetRequest(`/products?CategoryId=${this.category}`, response => {
              $('#loading').css({'display': 'none'})
              if(response.products.length > 0) {
                this.products = response.products
              }
            })
            // this.hasUpdate = true
            // $('#loading').css({'display': 'none'})
          })
        }
      }
    },
    back() {
      this.isEdit = false
      this.add = false
    },
    retrieveCategory1(){
      this.APIGetRequest(`get_addOnCategory_1`, response => {
        this.category1 = response.add_on_category
      })
    },
    retrieveCategory2(){
      this.APIGetRequest(`get_addOnCategory_2`, response => {
        this.category2 = response.add_on_category
      })
    },
    updateAvailability(item){
      let parameter = {
        product: {
          Id: item.id,
          published: !item.published
        }
      }
      $('#loading').css({'display': 'block'})
      this.APIPutRequest(`products/${item.id}`, parameter, response => {
        $('#loading').css({'display': 'none'})
        this.retrieveProducts(this.category)
      })
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.column {
  float: left;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.menu {
  width: 25%;
  /* margin-top: 1.3%; */
}
.content {
  width: 70%;
}
.contents {
  /* margin-top: -20px; */
  margin-bottom: 2%;
}
.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.active {
  background-color:  #ffe1a6;
}
.menu li {
  padding: 8px;
	border: 1px solid #cccccc;
  padding-top: 15px;
  height: 51px;
}
.content{
	margin: 0% 3% 3% 0%;
}
.column1{
	float: left;
  width: 50%;
  height: 300px;
}
</style>
