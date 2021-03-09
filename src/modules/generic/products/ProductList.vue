<template>
  <div>
    <div class="container2" v-for="(item, i) in data" :key="i">
      <div class="row mt-2">
        <div class="column">
          <i class="fas fa-edit" style="font-size: 2em; margin-left: 40px; margin-right: 20px; margin-top: 10px" @click="retrieve(item)"></i>
        </div>
        <div class="column">
          <!-- <img :src="item.images[0].src" class="images" width="80" height="55"> -->
        </div>
        <div class="column" style="margin-top: 15px">
          <p class="name">{{item.name}}</p>
        </div>
        <div class="column available" style="margin-top: 10px">
          <div class="right">
            <h5 class="a">AVAILABLE: </h5>
            <label class="switch">
              <input type="checkbox" :checked="!item.visible_individually">
              <!-- <p style="position:absolute; z-index:9999"></p> -->
              <span class="slider round">
              </span>
            </label>
          </div>
        </div>
      </div>
    </div><br>
  </div>
</template>
<style lang="css" scoped>
* {
  box-sizing: border-box;
}
img{
  image-rendering: -webkit-optimize-contrast
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.images {
  image-rendering: -webkit-optimize-contrast;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.addBtn{
  float:right;
  width: 150px;
}

.slider {
  position: absolute;
  cursor: pointer;
  border: 1px solid #B2AFAF;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  -webkit-transition: .4s;
  transition: .4s;
}
.available {
  flex-grow: 1;
}
.right{
  float: right;
  margin-right: 25px;
}
.slider:before{
  position: absolute;
  font-family: "FontAwesome";
  content: "\f00c";
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center;
  font-weight: normal;
  font-size: 18px;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #7ABC87;
  -webkit-transition: .4s;
  transition: .4s;
  color: #ffffff;
}

input:checked + .slider {
  background-color: #ffffff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ffffff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  background-color: #ffffff;
  border: 1px solid #B2AFAF;
  content: "";
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.column {
  float: left;
}
.content {
  width: 70%;
}
.active {
  background-color:  #ffe1a6;
}
.a {
  display: inline;
	float: left;
  margin-right: 10px;
}
.name{
	margin-left: 20px;
}

.column1{
	float: left;
  width: 50%;
  height: 300px;
}
.container2{
  padding: 0px;
  width: 100%;
  border: 1px solid #c9c9c9;
  /* padding: 20px 10px 10px 10px; */
	height: 70px;
}
.fas{
  cursor: pointer;
}
</style>
<script>
export default {
  props: ['data'],
  data(){
    return {
    }
  },
  methods: {
    retrieve(item) {
      console.log('[item]', item)
      this.$parent.retrieveOneProduct(item.id)
      this.$parent.isEdit = true
    }
  }
}
</script>
