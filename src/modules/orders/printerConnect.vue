<template>
  <div class="modal fade" id="selectLocationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">Printer Information</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Oops! </b>{{errorMessage}}</label>
          </span>
          <div>
              <p class="name" style="margin-top: 3%;">Printer Address</p>
              <input class="form-control" type="text" v-model="printer_address" onkeydown="javascript: return Number(event.key)" placeholder="Input Printer Address" required>
          </div>
          <div>
              <p class="name" style="margin-top: 3%;">Printer Port</p>
              <input class="form-control" type="number" v-model="printer_port" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))" placeholder="Input Printer Port" required>
          </div>
          <br>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="validate()">Connect</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background: $primary !important;
}

.form-control{
  min-height: 45px !important;
  overflow-y: hidden;
}
.input-group{
  margin-bottom: 10px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}
.invalid-inputs{
  border: solid 1px #ff0000 !important;
}
.float-left{
  float: left !important;
}
.modal-dialog{
  width: 25%;
}
</style>
<script>
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  mounted(){
    if (localStorage.getItem('printer_address')) {
      this.printer_address = localStorage.getItem('printer_address')
    }else{
      this.printer_address = null
    }
    if (localStorage.getItem('printer_port')) {
      this.printer_port = localStorage.getItem('printer_port')
    }else{
      this.printer_port = null
    }
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      printer_address: null,
      printer_port: 0,
      id: null
    }
  },
  components: {
  },
  methods: {
    hideModal(){
      $('#selectLocationModal').modal('hide')
    },
    show(){
      $('#selectLocationModal').modal('show')
      this.errorMessage = null
    },
    validate(){
      if(this.printer_port === null || this.printer_port === ''){
        this.errorMessage = 'Please input the printer port.'
      }else if(this.printer_address === null || this.printer_address === ''){
        this.errorMessage = 'Please input the printer address.'
      }else if(this.printer_address.split('.').length !== 4){
        this.errorMessage = 'Please input valid printer address'
      }else if(!/^(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)$/.test(this.printer_address)){
        this.errorMessage = 'Please input valid printer address'
      }else if(this.printer_port.length !== 4){
        this.errorMessage = 'Please input valid printer port'
      }else{
        this.submit()
      }
    },
    submit(){
      localStorage.setItem('printer_address', this.printer_address)
      localStorage.setItem('printer_port', this.printer_port)
      this.hideModal()
      this.onConfirm()
    },
    onConfirm(){
      this.$emit('onConfirm', {id: this.id})
      this.id = null
    }
  }
}
</script>
