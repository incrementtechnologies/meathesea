<template>
  <div>
    <div class="container2">
      <div class="row">
        <div class="column col-3">
          <i class="fas fa-arrow-alt-circle-left" style="font-size: 2em; margin-left: 20px; margin-right: 20px;" @click="back()"></i>
          <img :src="require('assets/img/sample.png')" alt="Girl in a jacket" width="100" height="100">
        </div>
        <div class="col-9">
          <p class="name" style="margin-left: 0%;"><b>PRODUCT IMAGE</b></p>
          <button>Change picture</button>
          <p class="name" style="margin-left: 0%; margin-top: 3%;"><b>PRODUCT TITLE</b></p>
          <input type="text" class="col-sm-12">
          <p class="name" style="margin-left: 0%; margin-top: 3%"><b>PRODUCT DESCRIPTION</b></p>
          <textarea name="" id="" cols="30" rows="10" class="col-sm-12" style="height: 10%;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</textarea>
          <div class="row" style="margin-top: 3%;">
            <div class="col-6">
              <p class="name" style="margin-left: 0%;"><b>REGULAR PRICE</b></p>
              <input type="text" class="w-100">
            </div>
            <div class="col-6">
              <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
              <input type="text" class="w-100">
            </div>
          </div>
          <p class="name" style="margin-left: 0%; margin-top: 3%"><b>ADD-ON CATEGORY 1</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 32%">LIMIT CHOICE TO: 1</b></p>
          <textarea name="" id="" cols="30" rows="10" class="col-sm-12" style="height: 10%;">Multiple manual adding of Category</textarea>
          <p class="name" style="margin-left: 0%; margin-top: 3%"><b>ADD-ON CATEGORY 2</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 32%">LIMIT CHOICE TO: -</b></p>
          <textarea name="" id="" cols="30" rows="10" class="col-sm-12" style="height: 10%;">Multiple manual adding of Category</textarea>
          <p class="name" style="margin-left: 0%; margin-top: 3%"><b>PRODUCT AVAILABILITY (TIME)</b></p>
          <label value="allDay"  style="width:47%">
          <input type="radio" v-model="setTime" name="time" checked="" > All Day </label>
          <label value="setTime" style="width:46%">
          <input type="radio" v-model="setTime" name="time"> Set Time </label>
          <div class="mt-3">Selected: <strong>{{ setTime }}</strong></div>
        </div>
        <div class="column available">
          <div class="right">
            <button><i class="fas fa-trash"></i> Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
button {
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
.available {
  flex-grow: 1;
}
.right{
  float: right;
  margin-right: 25px;
}
.column {
  float: left;
}
.name{
	margin-left: 20px;
}
.container2{
  width: 80%;
  border: 1px solid #c9c9c9;
  padding: 20px 10px 10px 10px;
}
</style>
<script>
export default {
  data(){
    return {
      selectedImage: null,
      checked: true,
      setTime: null
    }
  },
  methods: {
    back() {
      this.$parent.isEdit = false
    },
    selectImage(url){
      this.selectedImage = url
    }
  }
}
</script>
