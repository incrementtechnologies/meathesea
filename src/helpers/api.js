import CONFIG from 'src/config'
import Vue from 'vue'
import AUTH from 'src/services/auth'
import ROUTER from 'src/router'
import Axios from 'axios'
Vue.mixin({
  mounted(){

  },
  methods: {
    APIRequest(link, parameter, callback, errorCallback){
      let tokenStringParam = (AUTH.tokenData.token) ? '?token=' + AUTH.tokenData.token : ''
      let request = jQuery.post(CONFIG.API_URL + link + tokenStringParam, parameter, (response) => {
        this.APISuccessRequestHandler(response, callback)
      }).fail((jqXHR) => {
        $('#loading').css({display: 'none'})
        this.APIFailRequestHandler(link, jqXHR, errorCallback)
      })
      return request
    },
    APIGetRequest(link, callback, errorCallback){
      // let tokenStringParam = (AUTH.tokenData.token) ? '?token=' + AUTH.tokenData.token : ''
      console.log('url', CONFIG.API_URL + link)
      // Axios.get(CONFIG.API_URL + link, {
      //   headers: {
      //     'Authorization': CONFIG.authorization,
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }, response => {
      //   console.log('response', response)
      // })
      // jQuery.ajaxSetup({})
      fetch(CONFIG.API_URL + link, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + CONFIG.authorization
        }
      }).then(response => {
        return response.json()
      }).then(response => {
        console.log('response')
      })
      // let request = jQuery.ajax({
      //   method: 'POST',
      //   url: CONFIG.API_URL + 'categories',
      //   beforeSend: function(request) {
      //     request.setRequestHeader('Authorization', 'bearer ' + CONFIG.authorization)
      //   },
      //   headers: {
      //     Authorization: 'bearer ' + CONFIG.authorization
      //   },
      //   contentType: 'application/json',
      //   success: (response) => {
      //     console.log('response', response)
      //     // this.APISuccessRequestHandler(response, callback)
      //   },
      //   error: (jqXHR) => {
      //     this.APIFailRequestHandler(link, jqXHR, errorCallback)
      //   }
      // })
    },
    APIPostRequest(link, parameter, callback, errorCallback){
      // let tokenStringParam = (AUTH.tokenData.token) ? '?token=' + AUTH.tokenData.token : ''
      let request = $.ajax({
        url: CONFIG.API_URL + link,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + CONFIG.authorization
        },
        data: JSON.stringify(parameter),
        success: (response) => {
          this.APISuccessRequestHandler(response, callback)
        },
        error: (jqXHR) => {
          this.APIFailRequestHandler(link, jqXHR, errorCallback)
        }
      })
      return request
    },
    APIAudioRequest(link, parameter, callback, errorCallback){
      let request = jQuery.ajax({
        url: link,
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).fail((jqXHR) => {
        this.APIFailRequestHandler(link, jqXHR, errorCallback)
      })
    },
    APIFormRequest(link, formRef, callback, errorCallback){
      let tokenStringParam = (AUTH.tokenData.token) ? '?token=' + AUTH.tokenData.token : ''
      let formData = new FormData($(formRef)[0])
      $.ajax({
        url: CONFIG.API_URL + link + tokenStringParam,
        type: 'POST',
        data: formData,
        async: false,
        success: (response) => {
          this.APISuccessRequestHandler(response, callback)
        },
        error: (jqXHR) => {
          this.APIFailRequestHandler(link, jqXHR, errorCallback)
        },
        cache: false,
        contentType: false,
        processData: false
      })
    },
    APISuccessRequestHandler(response, callback){
      if(callback){
        callback(response)
      }
    },
    APIFailRequestHandler(link, jqXHR, errorCallback){
      switch(jqXHR.status){
        case 400:
          $('#connectionError').modal('show')
          AUTH.deaunthenticate()
          break
        case 401: // Unauthorized
          if(link === 'authenticate' || 'authenticate/user'){ // if error occured during authentication request
            if(errorCallback){
              errorCallback(jqXHR.responseJSON, jqXHR.status * 1)
            }
          }else{
            ROUTER.push('login')
          }
          break
        default:
          if(errorCallback){
            errorCallback(jqXHR.responseJSON, jqXHR.status * 1)
          }
          $('#connectionError').modal('show')
      }
    }
  }
})
