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
				<ProductList v-if="!isEdit" :data="products" @showAddForm="isEdit = true"/>
        <EditProduct ref="products" :categoryId="category" v-if="isEdit" :errorMessage="errorMessage" :isError="isError" :category1="category1" :category2="category2" :data=" add === true ? null : data" @onSave="update($event)" :bundle="bundled"/>
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
      errorMessage: null
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
      $('#loading').css({'display': 'block'})
      this.APIGetRequest('/get_restaurant_categories?storeId=1', response => {
        $('#loading').css({'display': 'none'})
        if(response.categories.length > 0) {
          this.categories = response.categories
          this.category = response.categories[0].id
          console.log(response.categories[0].id, 'kkkl')
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
      let temp = product.available_start_date_time_utc.replace(':', '')
      let temp1 = product.available_end_date_time_utc.replace(':', '')
      let timeStart = Number(temp)
      let timeEnd = Number(temp1)
      let Prod = null
      if(product.name === null || product.name === '' || product.categoryId === null || product.categoryId === '' || product.full_description === null || product.full_description === '' || product.price === null || product.categoryId === '' || product.old_price === null || product.old_price === '' || product.CategoriesTags === null || product.CategoriesTags === '' || product.CategoryTags === null || product.CategoryTags === '') {
        // console.log('error !!!')
        this.errorMessage = 'Please complete all required fields!'
        $('#incrementAlert').modal('show')
        return
      }
      if(product.available_start_date_time_utc < product.available_end_date_time_utc && (timeStart > 859 || timeEnd < 1659)){
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
              add_on_category_1: product.add_on_category_1.map(el => {
                let temp = {}
                temp.id = el.id
                temp.name = el.name
                return temp
              }),
              add_on_category_2: product.add_on_category_2.map(el => {
                let temp = {}
                temp.id = el.id
                temp.name = el.name
                return temp
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
              add_on_category_1: product.add_on_category_1.map(el => {
                let temp = {}
                temp.id = el.id
                temp.name = el.name
                return temp
              }),
              add_on_category_2: product.add_on_category_2.map(el => {
                let temp = {}
                temp.id = el.id
                temp.name = el.name
                return temp
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
            console.log('update happens')
            $('#loading').css({'display': 'block'})
            this.APIPutRequest(`products/${product.id}`, Prod, response => {
              $('#loading').css({'display': 'none'})
              console.log('[response]', response)
              console.log('retrieve happens')
              $('#loading').css({'display': 'block'})
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
            console.log('[response]', response)
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
    }
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
