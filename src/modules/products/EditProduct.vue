<template>
  <div class="container2">
    <div class="row">
      <div class="column col-.5">
        <i class="fas fa-arrow-alt-circle-left fa-3x" style="margin-left: 20px; margin-right: 20px; margin-top: 1%; color: #0064B1;" @click="back()"></i>
      </div>
      <div class="column col-2.5">
        <img :src="require('assets/img/sample.png')" alt="Girl in a jacket" width="185px" height="142px">
      </div>
      <div class="col-9">
        <p class="name" style="margin-left: 0%;"><b>PRODUCT IMAGE</b><button class="pull-right buttons"><i class="fas fa-trash"></i> Remove</button></p>
        <button class="buttons">Change picture</button>
        <p class="name" style="margin-left: 0%; margin-top: 3%;"><b>PRODUCT TITLE</b></p>
        <input type="text" class="col-sm-12">
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>PRODUCT DESCRIPTION</b></p>
        <textarea name="" id="" cols="30" rows="10" class="col-sm-12" style="height: 10%;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</textarea>
        <div class="row" style="margin-top: 3%;">
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>REGULAR PRICE</b></p>
            <input type="number" class="w-100">
          </div>
          <div class="col-6">
            <p class="name" style="margin-left: 0%;"><b>SPECIAL OFFER PRICE</b></p>
            <input type="number" class="w-100">
          </div>
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>ADD-ON CATEGORY 1</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 32%">LIMIT CHOICE TO: 1</b></p>
        <input class="col-sm-12" data-role="tagsinput">
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>ADD-ON CATEGORY 2</b>&nbsp;&nbsp;&nbsp;<b style="margin-left: 32%">LIMIT CHOICE TO: -</b></p>
        <input class="col-sm-12" data-role="tagsinput">
        <p class="name" style="margin-left: 0%; margin-top: 3%"><b>PRODUCT AVAILABILITY (TIME)</b></p>
        <input type="radio" value="allDay" v-model="setTime" class="all">
        <label for="allDay" style="width:45%">All Day</label>
        <input type="radio" value="setTime" v-model="setTime" class="all">
        <label for="setTime" style="width:45%">Set Time</label>
        <div v-if="setTime === 'setTime'" class="pull-right" style="padding-right: 5%; margin-top: 1%;">
          <label for="appt-time"><b>From: </b></label>
          <input id="appt-time" type="time" name="appt-time" step="2">&nbsp;-
          <label for="appt-time"><b>Until: </b></label>
          <input id="appt-time" type="time" name="appt-time" step="2">
        </div>
        <p class="name" style="margin-left: 0%; margin-top: 5%"><b>PRODUCT AVAILABILITY (LOCATION)</b></p>
        <input type="radio" value="loc" v-model="setLocation" class="in">
        <label for="loc" class="on">88 Queens Road W</label>
        <input type="radio" value="location" v-model="setLocation" class="in">
        <label for="location" class="on">Location 2</label>
        <input type="radio" value="allLocations" v-model="setLocation" class="in">
        <label for="allLocations" class="on">All Locations</label>
        <div style="bottom: 0; margin-left: 20%; margin-top: 15%; margin-right: 20%;">
          <button class="buttonCommon pull-left" style="background-color: #B7F6D9; border-color: #B7F6D9;">SAVE</button>
          <button class="buttonCommon pull-right">DISCARD</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
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
  width: 90%;
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
      setTime: null,
      clickSetTime: false,
      setLocation: null
    }
  },
  mounted(){
  },
  methods: {
    back() {
      this.$parent.isEdit = false
    }
  }
}
</script>
