import React, { Component } from 'react'

// data for app
import orders from '../data/orders'



//table row component
import TableRow from './TableRow'



export default class Table extends Component {




render() {
// prepare for immutable work with data

// loop thru data with creating array for display

let orderDisplay = orders.map ((element)=>{

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


//money forma, USD
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
 
    />
  )
})

    return (
<div>
  <table>
    <thead>
        <tr>
            <th>Transaction ID</th>
            <th>User Info</th>
            <th>Order Date</th>
            <th>Order Amount</th>
            <th>Card Number</th>
            <th>Card Type</th>
            <th>Location</th>
        </tr>
    </thead>
    <tbody>

     {orderDisplay}

    </tbody>
  </table>
</div>
    )
  }
}
