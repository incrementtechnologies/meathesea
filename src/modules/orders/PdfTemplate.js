import PDFTemplate from 'pdfmake'

export default {
  getItem(data) {
    this.address = data.address
    this.contact_number = data.contact_number
    this.date = '01-03-21'
    this.full_name = data.full_name
    this.order_number = data.order_number
    this.order_status = data.order_status
    this.pickup_time = data.pickup_time
    this.returned = data.returned
    this.process = 'Delivery'
  },
  // getData(data) {
  //   this.dataContainer = data
  // },
  template() {
    var data = []
    data.push(
      [
        { text: 'Qty', fontSize: 10, bold: true },
        { text: 'Product', fontSize: 10, bold: true, alignment: 'center' },
        { text: 'Price', fontSize: 10, bold: true },
        { text: 'Total', fontSize: 10, bold: true }
      ]
    )
    // this.dataContainer.map(key => {
    //   data.push([
    //     { text: key.qty, fontSize: 10, margin: [0, 0, 0, 10] },
    //     { text: key.title, fontSize: 10, margin: [0, 0, 0, 10] },
    //     { text: key.price, fontSize: 10, margin: [0, 0, 0, 10] },
    //     { text: (key.price * key.qty), fontSize: 10, margin: [0, 0, 0, 10] }
    //   ])
    // })
    var docDefinition = {
      pageMargins: [ 20, 30, 20, 20 ],
      pageSize: {
        width: 300,
        height: 'auto'
      },
      content: [
        {
          text: 'Image',
          fontSize: 10,
          style: 'header',
          alignment: 'center',
          bold: true
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
            headerRows: 1,
            body: [
              [{text: '#' + this.order_number, style: 'tableHeader'},
              {text: '', style: 'tableHeader'},
              {text: this.date, style: 'tableHeader'},
              {text: this.pickup_time, style: 'tableHeader', border: [false, false, false, true]}],
              ['Order for:' + this.process, '', '', 'Time:' + this.date]
            ]
          },
          layout: 'headerLineOnly'
        },
        {
          text: 'DELI-SHOP ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ '*', '*', '*' ],
            body: [
              [
                {
                  text: 'Item',
                  margin: [0, 10, 0, 0],
                  fontSize: 10,
                  bold: true,
                  border: [false, true, false, false]
                },
                {
                  text: 'Qty',
                  margin: [0, 10, 0, 0],
                  fontSize: 10,
                  bold: true,
                  border: [false, true, false, false]
                },
                {
                  text: 'Amount',
                  bold: true,
                  margin: [0, 10, 0, 0],
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, true, false, false]
                }
              ]
              // [
              //   {
              //     text: 'Tax',
              //     bold: true,
              //     fontSize: 10,
              //     border: [false, false, false, false]
              //   },
              //   {
              //     text: this.tax + '\n',
              //     bold: true,
              //     fontSize: 10,
              //     alignment: 'right',
              //     border: [false, false, false, false]
              //   }
              // ],
              // [
              //   {
              //     text: 'Delivery Fee',
              //     bold: true,
              //     fontSize: 10,
              //     border: [false, false, false, false]
              //   },
              //   {
              //     text: this.deliveryFee + '\n',
              //     bold: true,
              //     fontSize: 10,
              //     alignment: 'right',
              //     border: [false, false, false, false]
              //   }
              // ],
              // [
              //   {
              //     text: 'Discount',
              //     bold: true,
              //     fontSize: 10,
              //     border: [false, false, false, true],
              //     margin: [0, 0, 0, 10]
              //   },
              //   {
              //     text: this.discount + '\n',
              //     bold: true,
              //     fontSize: 10,
              //     alignment: 'right',
              //     margin: [0, 0, 0, 10],
              //     border: [false, false, false, true]
              //   }
              // ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ '*', '*' ],
            body: [
              [
                {
                  text: 'Total',
                  bold: true,
                  margin: [0, 10, 0, 0],
                  fontSize: 11,
                  border: [false, true, false, false]
                },
                {
                  text: this.total + '\n',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 10, 0, 0],
                  alignment: 'right',
                  border: [false, true, false, false]
                }
              ],
              [
                {
                  text: 'Cash',
                  fontSize: 11,
                  bold: true,
                  border: [false, false, false, false]
                },
                {
                  text: this.money + '\n',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'Change',
                  fontSize: 11,
                  bold: true,
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                },
                {
                  text: this.changed + '\n',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                }
              ]
            ]
          }
        },
        {
          text: '********************Thank You!********************\n\n',
          fontSize: 11,
          alignment: 'center',
          bold: true
        },
        {
          text: this.dates,
          fontSize: 11,
          alignment: 'center'
        }
      ]
    }
    PDFTemplate.createPdf(docDefinition).open()
  }
}
