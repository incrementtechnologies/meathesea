export default {
  headerElements: [
    {
      text: 'TODAY',
      style: 'border: 1px solid #0064B1; color: #0064B1;',
      type: 'button',
      componentTocall: 'card',
      focusedBackground: '#FFFACA',
      focusedColor: '#0064B1',
      unfocusedColor: '#000000',
      wholeView: false,
      shorterView: true,
      column: '20%',
      changeDate: false
    },
    {
      text: 'THIS WEEK',
      style: 'border: 1px solid #0064B1; color: #000000;',
      type: 'button',
      componentTocall: 'table',
      focusedBackground: '#FFFACA',
      focusedColor: '#0064B1',
      unfocusedColor: '#000000',
      wholeView: false,
      shorterView: true,
      column: '20%',
      changeDate: true
    },
    {
      text: 'ALL OUTSTANDING',
      style: 'border: 1px solid #BE0000; color: #BE0000;',
      type: 'button',
      componentTocall: 'table',
      focusedBackground: '#BE0000',
      focusedColor: '#FFFFFF',
      unfocusedColor: '#BE0000',
      wholeView: true,
      shorterView: true,
      column: '20%',
      wholeViewColumn: '20%',
      changeDate: false
    },
    {
      text: 'Search',
      style: 'border: 1px solid #707070; background-color: #FFFFFF; color: #000000;',
      type: 'input',
      componentTocall: 'table',
      wholeView: true,
      shorterView: true,
      column: '40%',
      focusedBackground: '#0064B1',
      wholeViewColumn: '70%',
      changeDate: false
    }
  ],
  tableHeaders: [
    {text: 'Order date/time', key: 'created_date_utc'},
    {text: 'Order number', key: 'order_id'},
    {text: 'Order Status', key: 'crockery_status'},
    {text: 'Plate returned', key: 'returned'},
    {text: 'Total Sales', key: 'order_total'}
  ],
  navs: [
    {name: 'NEW', isNotification: true, notificationColor: '#FF0045', notificationTextColor: '#FFFFFF', background: '#B7F6D9', color: '#0064B1', count: 0},
    {name: 'IN PROGRESS', isNotification: true, notificationColor: '#F3E4A7', notificationTextColor: '#0064B1', background: '#FFBF51', color: '#0064B1', count: 0},
    {name: 'RETURNED', background: '#E1E1E1', color: '#878787', count: 0}
  ]
}
