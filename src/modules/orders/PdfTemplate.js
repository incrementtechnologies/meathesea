import PDFTemplate from 'pdfmake'
import global from 'src/helpers/global.js'

export default {
  dataContainer: [],
  dataContainerDel: [],
  imageLogo: [],
  priceAdd: [],
  priceAddDel: [],
  renderAddOns(element) {
    let addons = []
    element.product_attributes.forEach((el, ndx) => {
      element.product.attributes.forEach((le, index) => {
        if(le.id === el.id) {
          le.attribute_values.forEach((me, indx) => {
            if(parseInt(el.value) === me.id) {
              addons.push(me)
            }
          })
        }
      })
    })
    return addons
  },
  getItem(data) {
    this.cutlery = data.add_cutlery
    this.address = data.shipping_address.address1 !== null ? (data.shipping_address.address2 !== '' ? data.shipping_address.address2 + ', ' : '') + (data.shipping_address.address1 !== '' ? data.shipping_address.address1 + ', ' : '') + data.shipping_address.city : data.shipping_address.address1
    this.contact_number = data.shipping_address.phone_number
    this.date = new Date(data.created_on_utc).toLocaleDateString().replaceAll('-', '/')
    this.name = data.customer.first_name !== null ? data.customer.first_name : 'No Name'
    this.order_number = data.id
    this.total = data.order_total
    this.currency = global.currency[0].text
    this.purpose = data.order_status
    this.deliveryDate = new Date(data.created_on_utc).toLocaleDateString().replaceAll('-', '/')
    if(data.delivery_time_requested === 'ASAP'){
      this.time = data.local_time_created
    }else{
      this.time = data.delivery_time_requested
    }
    this.deliveryTime = data.order_accept_start_time + '-' + data.order_accept_end_time
    this.subTotal = data.order_total - data.delivery_fee
  },
  getImage(image) {
    this.imageLogo = image
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
    this.dataContainer.length > 0 &&
    this.dataContainer.map((key, index) => {
      let a = []
      let c = []
      key.addOn.map((el, index) => {
        a.push(el.name)
        c.push(el.price_adjustment)
      })
      retrieve.push([
        { text: [{ text: key['product'], fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }, { text: ((key['addOn'].length > 0) ? ('\n+' + (a).join('\n  +')) : ' '), fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }], margin: [0, 0, 0, 0], border: [false, false, false, false] },
        { text: key['quantity'], fontSize: 10, margin: [70, 0, 0, 0], border: [false, false, false, false] },
        { text: [{ text: (this.currency + ' ' + key['price']), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }, { text: ((key['addOn'].length > 0) ? ('\n ' + (c).join('\n')) : ' '), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }], margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }
      ])
    })
    this.dataContainerDel.length > 0 &&
    this.dataContainerDel.map(key => {
      let b = []
      let d = []
      key.addOn.map(el => {
        b.push(el.name)
        d.push(el.price_adjustment)
      })
      retrieveDel.push([
        { text: [{ text: key['product'], fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }, { text: ((key['addOn'].length > 0) ? ('\n+' + (b).join('\n  +')) : ' '), fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }], margin: [0, 0, 0, 0], border: [false, false, false, false] },
        { text: key['quantity'], fontSize: 10, margin: [70, 0, 0, 0], border: [false, false, false, false] },
        { text: [{ text: (this.currency + ' ' + key['price']), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }, { text: ((key['addOn'].length > 0) ? ('\n ' + (d).join('\n')) : ' '), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }], margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }
      ])
    })
    var docDefinition = {
      pageMargins: [20, 20, 20, 20],
      pageSize: {
        width: 300,
        height: 'auto'
      },
      content: [
        {
          image: this.imageLogo,
          fit: [100, 100],
          alignment: 'center'
          // margin: [ 5, 5, 5, 5 ]
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
                  margin: [0, 0, 110, 0],
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
          text: [ { text: 'Cust. Name: ' }, { text: this.name, bold: true } ],
          fontSize: 10,
          style: 'subheader',
          alignment: 'left',
          margin: [0, 7]
        },
        {
          text: [ { text: 'Customer #: ' }, { text: this.contact_number, bold: true } ],
          fontSize: 10,
          style: 'subheader',
          alignment: 'left'
        },
        {
          text: [ { text: 'Address: ' }, { text: this.address, bold: true } ],
          fontSize: 10,
          style: 'subheader',
          alignment: 'left',
          margin: [0, 7]
        },
        {
          text: [ {text: 'Order for: '}, { text: this.purpose, bold: true } ],
          fontSize: 11,
          alignment: 'center'
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
        this.dataContainer.length > 0
        ? {
          text: '________________________________________________'
        }
        : {
        },
        this.dataContainer.length > 0
        ? {
          text: 'RESTAURANT ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true,
          margin: [0, 7, 0, 0],
          border: [false, true, false, false]
        }
        : {
        },
        this.dataContainer.length > 0
        ? {
          style: 'tableExample',
          table: {
            headerRows: 1,
            border: [false, false, false, false],
            widths: ['*', '*', '*'],
            body: retrieve
          }
        }
        : {
        },
        this.dataContainerDel.length > 0
        ? {
          text: '________________________________________________'
        }
        : {

        },
        this.dataContainerDel.length > 0
        ? {
          text: 'DELI-SHOP ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true,
          margin: [0, 7, 0, 0],
          border: [false, true, false, false]
        }
        : {

        },
        this.dataContainerDel.length > 0
        ? {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: retrieveDel
          }
        }
        : {

        },
        {
          text: '________________________________________________'
        },
        this.cutlery === true
        ? {
          text: [ { text: 'Note:', italics: true }, { text: 'ADD CUTLERY' } ],
          alignment: 'left',
          fontSize: 10,
          margin: [0, 5, 0, -5],
          bold: true
        }
        : {
        },
        this.cutlery === true
        ? {
          text: '________________________________________________'
        }
        : {
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
    PDFTemplate.createPdf(docDefinition).print()
  }
}
