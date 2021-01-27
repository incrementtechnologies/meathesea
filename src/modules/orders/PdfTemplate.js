import PDFTemplate from 'pdfmake'

export default {
  dataContainer: [],
  dataContainerDel: [],
  encode: function (url) {
    return new Promise((resolve) => {
      // URL.createObjectURL('src/assets/img/meatthesealogo_black_and_white.png')
      var img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function () {
        // URL.revokeObjectURL(url)
        var canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        var dataURL = canvas.toDataURL('image/png')
        resolve(dataURL)
      }
      img.src = url
    })
  },
  // readImage(url, callback) {
  //   var request = new
  //     XMLHttpRequest()
  //   request.onload = function () {
  //     var file = new FileReader()
  //     file.onloadend = function () {
  //       callback(file.result)
  //     }
  //     file.readAsDataURL(request.response)
  //   }
  //   request.open('GET', url)
  //   request.responseType = 'blob'
  //   request.send()
  // },
  getItem(data) {
    let sub = []
    this.address = data.shipping_address.address1 !== null ? data.shipping_address.address1 : data.shipping_address.address1
    this.contact_number = data.shipping_address.phone_number
    this.date = data.created_on_utc
    this.name = data.customer.first_name + ' ' + data.customer.last_name
    this.order_number = data.id
    this.total = data.order_total
    this.currency = data.customer_currency_code
    this.purpose = 'Delivery'
    this.deliveryTime = '9:15'
    this.deliveryDate = '01/05/2021'
    this.time = '9:00' // data.created_on_utc
    data.order_items.forEach(element => {
      sub.push(element.product.price * element.quantity)
    })
    this.subTotal = sub.reduce(function (a, b) {
      return a + b
    }, 0)
    // this.logo = data.order_items[0].product.images[0].src
    this.logo = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
    // this.readImage(this.logo, function (base64) {
      // console.info(base64)
    // })
    this.encode(this.logo).then(res => {
      this.pdfLogo = res // this is the logo
    })
  },
  getData(retrieve) {
    this.dataContainer = retrieve
  },
  getDel(retrieveDel) {
    this.dataContainerDel = retrieveDel
  },
  template() {
    var retrieve = []
    var retrieveDel = []
    retrieve.push(
      [
        {
          text: 'Item',
          margin: [0, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Qty',
          margin: [70, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Amount',
          decoration: 'underline',
          bold: true,
          border: [false, false, false, false],
          margin: [0, 0, 20, 0],
          fontSize: 10,
          alignment: 'right'
        }
      ]
    )
    retrieveDel.push(
      [
        {
          text: 'Item',
          margin: [0, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Qty',
          margin: [70, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Amount',
          decoration: 'underline',
          bold: true,
          border: [false, false, false, false],
          margin: [0, 0, 20, 0],
          fontSize: 10,
          alignment: 'right'
        }
      ]
    )
    this.dataContainer.map(key => {
      retrieve.push([
        { text: key.product.name, fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] },
        { text: key.quantity, fontSize: 10, margin: [70, 0, 0, 0], border: [false, false, false, false] },
        { text: (this.currency + ' ' + key.product.price), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }
        // { text: (key.price * key.qty), fontSize: 10, margin: [0, 0, 0, 10] }
      ])
    })
    this.dataContainerDel.map(key => {
      retrieveDel.push([
        { text: key.product.name, fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] },
        { text: key.quantity, fontSize: 10, margin: [70, 0, 0, 0], border: [false, false, false, false] },
        { text: (this.currency + ' ' + key.product.price), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }
        // { text: (key.price * key.qty), fontSize: 10, margin: [0, 0, 0, 10] }
      ])
    })
    var docDefinition = {
      pageMargins: [20, 30, 20, 20],
      pageSize: {
        width: 300,
        height: 'auto'
      },
      content: [
        {
          image: this.logo,
          fit: [100, 100],
          alignment: 'center'
        },
        {
          text: 'Meat The Sea',
          fontSize: 15,
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  text: '#' + this.order_number,
                  border: [false, false, false, true]
                },
                {
                  text: ' ',
                  margin: [0, 0, 21, 0],
                  border: [false, false, false, true]
                },
                {
                  text: this.date,
                  border: [false, false, false, true]
                },
                {
                  text: this.time,
                  border: [false, false, false, true],
                  alignment: 'right'
                }
              ]
            ]
          }
        },
        {
          text: 'Cust. Name: ' + this.name,
          fontSize: 10,
          style: 'subheader',
          alignment: 'left',
          margin: [0, 7]
        },
        {
          text: 'Customer #: ' + this.contact_number,
          fontSize: 10,
          style: 'subheader',
          alignment: 'left'
        },
        {
          text: 'Address: ' + this.address,
          fontSize: 10,
          style: 'subheader',
          alignment: 'left',
          margin: [0, 7]
        },
        {
          text: 'Order for: ' + this.purpose,
          fontSize: 11,
          alignment: 'center',
          bold: true
        },
        {
          text: 'Delivery Time:\n\n',
          fontSize: 11,
          alignment: 'center',
          margin: [0, 7, 0, 0]
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [{
                    text: '',
                    border: [false, false, false, false]
                  },
                  {
                    text: this.deliveryDate + '\n' + this.deliveryTime,
                    alignment: 'center',
                    bold: true
                  },
                  {
                    text: '',
                    border: [false, false, false, false]
                  }]
                ]
              }
            },
            { width: '*', text: '' }
          ]
        },
        {
          text: '________________________________________________'
        },
        {
          text: 'RESTAURANT ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true,
          margin: [0, 7, 0, 0],
          border: [false, true, false, false]
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            border: [false, false, false, false],
            widths: ['*', '*', '*'],
            body: retrieve
          }
        },
        {
          text: '________________________________________________'
        },
        {
          text: 'DELI-SHOP ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true,
          margin: [0, 7, 0, 0],
          border: [false, true, false, false]
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: retrieveDel
          }
        },
        {
          text: '________________________________________________'
        },
        {
          text: 'Note: ADD CUTLERY',
          alignment: 'left',
          fontSize: 10,
          margin: [0, 5, 0, -5],
          bold: true
        },
        {
          text: '________________________________________________'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              [
                {
                  text: 'Subtotal',
                  margin: [0, 10, 0, 0],
                  fontSize: 11,
                  border: [false, false, false, false]
                },
                {
                  text: this.currency + ' ' + this.subTotal + '\n',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 10, 0, 0],
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'VAT',
                  fontSize: 11,
                  border: [false, false, false, false]
                },
                {
                  text: '-----',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'Total',
                  fontSize: 11,
                  bold: true,
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                },
                {
                  text: this.currency + ' ' + this.total + '\n',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                }
              ]
            ]
          }
        }
      ]
    }
    PDFTemplate.createPdf(docDefinition).open()
  }
}
