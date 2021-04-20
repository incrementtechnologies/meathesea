<template>
<div>
  <button class="btn btn-outline-primary addBtn" style="float: right; margin-right: 77px" v-if="$route.name === 'menuItems'  && add === false" @click="$emit('showAddForm', true), isEdit = true, add = true">
    <b>add new</b></button>
  <div>
    <br><br>
  </div>
	<div class="contents">
		<div class="clearfix">
			<CategoryList :type="'menu'"  :data="categories"/>
			<div class="column content">
				<ProductList v-if="!isEdit" :data="products" @showAddForm="isEdit = true" @updateAvailability="updateAvailability"/>
        <EditProduct ref="products" :updateError="updateError" :hasUpdate="hasUpdate" :bundleProducts="bundleProducts" :categoryId="category" v-if="isEdit" :errorMessage="errorMessage" :isError="isError" :category1="category1" :category2="category2" :data=" add === true ? null : data" @onSave="update($event)" :bundle="bundled"/>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import ProductList from 'modules/generic/products/ProductList.vue'
import EditProduct from 'modules/generic/products/EditProduct.vue'
import CategoryList from 'modules/generic/products/CategoryList.vue'
import axios from 'axios'
import AUTH from 'src/services/auth'
import LoginHeaderVue from '../frame/LoginHeader.vue'
export default {
  data() {
    return {
      newCategory1: null,
      newCategory2: null,
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
      updateError: false
    }
  },
  watch: {
    $route(to, from){
      console.log(to)
      this.isEdit = false
    }
  },
  mounted() {
    this.retrieveCategories()
    this.retrieveCategory1()
    this.retrieveCategory2()
    this.retrieve()
  },
  components: {
    ProductList,
    CategoryList,
    EditProduct
  },
  methods: {
    retrieve() {
      this.APIGetRequest(`/products_restaurant?StoreId=${this.user.user.userID}`, response => {
        if(response.products.length > 0) {
          response.products.forEach(item => {
            item['name'] = item.Name
          })
          this.bundleProducts = response.products
        }
      })
    },
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
      this.APIGetRequest(`/get_restaurant_categories?storeId=${user.userID}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.categories.length > 0) {
          this.categories = response.categories
          this.category = response.categories[0].id
          console.log(response.categories[0].id, 'kkkl')
          console.log(this.categories, 'kkkhhhhhl')
          if(this.firstRetrieve === true) {
            console.log(this.categories[0].id)
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
          this.products = []
          $('#loading').css({'display': 'none'})
        }
      })
    },
    retrieveOneProduct(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products/${id}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.products.length > 0) {
          this.data = response.products[0]
          response.products[0].add_on_category_1.forEach(element => {
            element['text'] = element.name
          })
          response.products[0].add_on_category_2.forEach(element => {
            element['text'] = element.name
          })
          // this.detail = response.products[0].full_description.replace('&lt;p&gt;', '')
          console.log('here', this.data)
        } else {
          this.data = null
        }
      })
    },
    update(product){
      console.log('[here in list.menu]')
      var temp, temp1, timeStart, timeEnd
      if(product.available_start_date_time_utc === null && product.available_end_date_time_utc === null){
        console.log(product.available_end_date_time_utc)
        temp = ''
        temp1 = ''
        timeStart = ''
        timeEnd = ''
      }else{
        if(product.available_start_date_time_utc === 'object' && product.available_end_date_time_utc === 'object'){
          console.log('object')
          timeStart = product.available_start_date_time_utc
          timeEnd = product.available_end_date_time_utc
        }else if(product.available_end_date_time_utc === String && product.available_start_date_time_utc === String){
          console.log('string')
          console.log(product.available_start_date_time_utc)
          temp = product.available_start_date_time_utc.replace(':', '')
          temp1 = product.available_end_date_time_utc.replace(':', '')
          timeStart = Number(temp)
          timeEnd = Number(temp1)
        }else{
          console.log('hh and mm')
          temp = product.available_start_date_time_utc.HH + ':' + product.available_start_date_time_utc.mm
          temp1 = product.available_end_date_time_utc.HH + ':' + product.available_end_date_time_utc.mm
          let time = temp.replace(':', '')
          let time1 = temp1.replace(':', '')
          timeStart = Number(time)
          timeEnd = Number(time1)
          console.log(product.available_start_date_time_utc.HH, product.available_end_date_time_utc.HH)
          console.log(time, time1)
        }
      }
      let Prod = null
      if(product.name === null || product.name === '' || product.categoryId === null || product.categoryId === '' || product.full_description === null || product.full_description === '' || product.price === null || product.categoryId === '' || product.old_price === null || product.old_price === '' || product.CategoriesTags === null || product.CategoriesTags === '' || product.CategoryTags === null || product.CategoryTags === '') {
        this.updateError = true
        return
      }
      if(product.available_start_date_time_utc < product.available_end_date_time_utc || (timeStart > 859 || timeEnd < 1659)){
        this.isError = false
        console.log('false mn gud', timeStart, timeEnd)
      }else{
        console.log('true mn gud', timeEnd, timeStart)
        this.isError = true
        return
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
                  attribute_values: product.sample.map((el, index) => {
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
                  attribute_values: product.newCategories.map((el, index) => {
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
                  product_attribute_id: 12,  // category 2
                  attribute_control_type_name: 'DropdownList',
                  attribute_values: product.bundleProduct.map((el, index) => {
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
                if(this.bundle){
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
                  attribute_values: product.CategoryTags.map((el, index) => {
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
                  attribute_values: product.CategoriesTags.map((el, index) => {
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
                  product_attribute_id: 12,  // category 2
                  attribute_control_type_name: 'DropdownList',
                  attribute_values: product.bundleProduct.map((el, index) => {
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
                if(this.bundle){
                  return [11, 12].includes(el.product_attribute_id)
                } else {
                  return [10, 11].includes(el.product_attribute_id)
                }
              })
            }
          }
        }
        if(product.uploaded_image !== null && product.uploaded_image !== undefined){
          console.log('test')
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
              console.log('test ', this.hasUpdate)
              $('#loading').css({'display': 'none'})
              this.APIGetRequest(`/products?CategoryId=${this.category}`, response => {
                $('#loading').css({'display': 'none'})
                if(response.products.length > 0) {
                  this.products = response.products
                  this.back()
                }
              })
            })
          })
        }else{
          $('#loading').css({'display': 'block'})
          this.APIPutRequest(`products/${product.id}`, Prod, response => {
            this.hasUpdate = true
            console.log('test ', this.hasUpdate)
            console.log('[response1]', response)
            $('#loading').css({'display': 'none'})
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
    // save(id) {
    //   $('#loading').css({'display': 'block'})
    //   this.APIPutRequest(`products/${id.id}`, response => {
    //     $('#loading').css({'display': 'none'})
    //     console.log(response)
        // if(response.products.length > 0) {
        //   this.data = response.products[0]
        //   // this.detail = response.products[0].full_description.replace('&lt;p&gt;', '')
        //   console.log('here', this.data)
        // } else {
        //   this.data = null
        // }
    //   })
    // }
    updateAvailability(item){
      let parameter = {
        product: {
          Id: item.id,
          published: !item.published
        }
      }
      $('#loading').css({'display': 'block'})
      this.APIPutRequest(`products/${item.id}`, parameter, response => {
        console.log('[response]', response)
        console.log('save')
        $('#loading').css({'display': 'none'})
        this.retrieveProducts(this.category)
        console.log('test success')
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
