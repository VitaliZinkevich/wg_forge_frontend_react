import React, { Component } from 'react'

// data for app
import orders from '../data/orders'
import users from '../data/users'


//table row component
import TableRow from './TableRow'
import {Statistics} from './Statistics'


export default class Table extends Component {

state={
  sortedTh:null,
}

// sort by column
sortColumn=(e)=>{

if (this.state.sortedTh === null) {
  this.setState({sortedTh: e.target.id})
} else {
  if (this.state.sortedTh === e.target.id) {
    this.setState({sortedTh: null})
  } else {
    this.setState({sortedTh: e.target.id})
  }
}


}

render() {
// prepare for immutable work with data
let ordersCopy = orders.map ((element)=>  {return {...element}})
let usersCopy = users.map ((element)=>  {return {...element}})

// sort if need to
//['Transaction ID','User Info','Order Date','Order Amount','Card Number','Card Type','Location']
let sorted = false
if (this.state.sortedTh === 'Transaction ID') {
  ordersCopy = ordersCopy.sort ((a,b)=>{
    if (a.transaction_id < b.transaction_id) return -1;
    else if (a.transaction_id > b.transaction_id) return 1;
    return 0;
  })
  sorted = true
} 

if (this.state.sortedTh === 'User Info') {
   ordersCopy = ordersCopy.sort ((a,b)=>{
    let aReal = usersCopy.find (e=>e.id === a.user_id)
    let bReal = usersCopy.find (e=>e.id === b.user_id)
    if (aReal.first_name  < bReal.first_name ) return -1;
    else if (aReal.first_name  > bReal.first_name ) return 1;
    if (aReal.last_name < bReal.last_name) return -1;
    else if (aReal.last_name > bReal.last_name) return 1;
    return 0;
  
  })

  sorted = true
} 

if (this.state.sortedTh === 'Order Date' ) {
  ordersCopy = ordersCopy.sort ((a,b)=> {return parseInt (a.created_at)- parseInt (b.created_at)})
  sorted = true
}

if (this.state.sortedTh ==='Order Amount'){
  ordersCopy = ordersCopy.sort ((a,b)=> {return a.total-b.total})
  sorted = true
}

if (this.state.sortedTh ==='Card Type'){
   ordersCopy = ordersCopy.sort ((a,b)=>{
    if (a.card_type < b.card_type) return -1;
    else if (a.card_type > b.card_type) return 1;
    return 0;
  })
  sorted = true
}

if (this.state.sortedTh ==='Location'){
  ordersCopy = ordersCopy.sort ((a,b)=>{
   if (a.order_country < b.order_country) return -1;
   else if (a.order_country > b.order_country) return 1;
   if (a.order_ip < b.order_ip) return -1;
   else if (a.order_ip > b.order_ip) return 1;
   return 0;
 })
 sorted = true
}

if (sorted === false) {
  ordersCopy = orders
}

// preparing table headers

let thHeadStrings = ['Transaction ID','User Info','Order Date','Order Amount','Card Number','Card Type','Location']

let tableHeadres = thHeadStrings.map ((elem)=> { return <th 
key={elem}

>
{elem === 'Card Number' ? elem : <a 
href="#" 
onClick={(e)=>{this.sortColumn(e)}} 
id={elem}
>
{elem}
</a>} 
{this.state.sortedTh === elem ? <span>&#8595;</span> : null}
</th>})

// loop thru data with creating array for display tbody
let orderDisplay = ordersCopy.map ((element)=>{

// data transform for display
// card number 	35********3797
let cardNumber = element.card_number.slice(0,2)+'********'+element.card_number.slice(-4) 

//DD/MM/YYYY hh:mm:ss
let orderDate = new Date (element.created_at*1000) 
let orderDateString =   ('0' + orderDate.getDate()).slice(-2)+'/'+
                        ('0' + orderDate.getMonth()+1).slice(-2) + '/'+
                        (orderDate.getFullYear()) + ', '+
                        ('0' + orderDate.getHours()).slice(-2)+':'+
                        ('0' + orderDate.getMinutes()).slice(-2)+':'+
                        ('0' + orderDate.getSeconds()).slice(-2)


//money form, USD
let orderAmmountString = `$${element.total}`

//%order_country% (%order_ip%)
let location = `${element.order_country} (${element.order_ip})` 

  return (
    <TableRow
    key={element.id}
    
    id={element.id}
    transactionId={element.transaction_id}
    userInfo={element.user_id}
    orderDate={orderDateString}
    orderAmount={orderAmmountString}
    cardNumber={cardNumber}
    cardType={element.card_type}
    location={location}
    
    users={usersCopy}
    />
  )
})

    return (
<div className='ml5 mr5 mt5'>
  <table className='table table-striped'>

    <thead>
      <tr>
        {tableHeadres}
      </tr>
    </thead>

    <tbody>
        {orderDisplay}
        <Statistics
        orders={ordersCopy}
        />
    </tbody>

  </table>
</div>
    )
  }
}
