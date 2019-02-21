import React, { Component } from 'react'

//http req
import axios from 'axios'

// data for app
import orders from '../data/orders'
import users from '../data/users'


//table row component
import TableRow from './TableRow'
import {Statistics} from './Statistics'


export default class Table extends Component {

  constructor() {
    super();
    this.state={
      sortedTh:null,
      search: '',
      rates:{},
      selectedCurrency: 'USD'
    }
  }

componentDidMount (){
  axios.get('https://api.exchangeratesapi.io/latest'
  )
  .then(response=> {
    this.setState ({rates: response.data.rates}) 
  })
  .catch(error=> {
    console.log('Error on load rates '+ error);
  })
}

// handle currency input 

handleSelectInput=(e)=>{
this.setState({selectedCurrency: e.target.value})
}

//handleSearchInput
handleSearchInput=(e)=>{
e.preventDefault()
this.setState({search:e.target.value.toLowerCase()})
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
// make copy
let ordersCopy = orders.map ((element)=>  {return {...element}})
let usersCopy = users.map ((element)=>  {return {...element}})

// set another currency if need to
// prepare options for select
let options = Object.keys(this.state.rates).map ((elem)=>{
  return <option key={elem} value={elem}>{elem}</option>
})
options.unshift(<option key={'EUR'} value={'EUR'}>{'EUR'}</option>)

// convert currency 
if (this.state.selectedCurrency === 'USD') {

} else {
  let usdToEur = this.state.rates.USD
  let rate = 1
  if (this.state.selectedCurrency === 'EUR') {
    // nothing to do, already got eur exchange rate
  } else {
    rate = this.state.rates[this.state.selectedCurrency]
  }

  ordersCopy=ordersCopy.map ((elem)=>{
    return elem = {...elem, total : (elem.total/usdToEur*rate).toFixed(2)}
  })
}



// search if need to
if (this.state.search === '') {
// no need to search
}
else {
ordersCopy = ordersCopy.filter ((elem)=>{

  
  let transaction_id = elem.transaction_id.indexOf (this.state.search)
  let total = elem.total.toString().indexOf (this.state.search)
  let card_type = elem.card_type.indexOf (this.state.search)
  let order_country = elem.order_country.toLowerCase().indexOf (this.state.search)
  let order_ip = elem.order_ip.indexOf (this.state.search)
  let first_name = -1
  let last_name = -1

  usersCopy.forEach ((e)=>{
    if (elem.user_id === e.id) {
      first_name = e.first_name.toLowerCase().indexOf(this.state.search.toLowerCase())
      last_name = e.last_name.toLowerCase().indexOf(this.state.search.toLowerCase())
    }
  })

  if (first_name !== -1 || last_name !== -1 ||transaction_id !== -1 || total !== -1 || card_type !== -1 || order_country !== -1 || order_ip !== -1) {
    return true
  } else {
    return false
  }
})
}


// sort if need to
//['Transaction ID','User Info','Order Date','Order Amount','Card Number','Card Type','Location']

if (this.state.sortedTh === 'Transaction ID') {
  ordersCopy = ordersCopy.sort ((a,b)=>{
    if (a.transaction_id < b.transaction_id) return -1;
    else if (a.transaction_id > b.transaction_id) return 1;
    return 0;
  })

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

  
} 

if (this.state.sortedTh === 'Order Date' ) {
  ordersCopy = ordersCopy.sort ((a,b)=> {return parseInt (a.created_at)- parseInt (b.created_at)})
  
}

if (this.state.sortedTh ==='Order Amount'){
  ordersCopy = ordersCopy.sort ((a,b)=> {return a.total-b.total})
  
}

if (this.state.sortedTh ==='Card Type'){
   ordersCopy = ordersCopy.sort ((a,b)=>{
    if (a.card_type < b.card_type) return -1;
    else if (a.card_type > b.card_type) return 1;
    return 0;
  })
  
}

if (this.state.sortedTh ==='Location'){
  ordersCopy = ordersCopy.sort ((a,b)=>{
   if (a.order_country < b.order_country) return -1;
   else if (a.order_country > b.order_country) return 1;
   if (a.order_ip < b.order_ip) return -1;
   else if (a.order_ip > b.order_ip) return 1;
   return 0;
 })
 
}

// preparing table headers

let thHeadStrings = ['Transaction ID','User Info','Order Date','Order Amount','Card Number','Card Type','Location']

let tableHeadres = thHeadStrings.map ((elem)=> { return <th 
key={elem}

>
{elem === 'Card Number' ? elem : <button 
className='link-button'
onClick={(e)=>{this.sortColumn(e)}} 
id={elem}
>
{elem}
</button>} 
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
let orderAmmountString = `${this.state.selectedCurrency === 'USD'? '$': 
this.state.selectedCurrency === 'EUR' ? '€' : this.state.selectedCurrency} ${element.total}`

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

orderDisplay.push (<Statistics key='statistics'
  orders={ordersCopy}
  users={usersCopy}

  selectedCurrency={this.state.selectedCurrency}
  />)

// empty order array message

if (orderDisplay.length === 1 ) {
  orderDisplay.unshift (<tr key='Nothing found'>
    <td colSpan='7'>Nothing found</td>
</tr>)
}


//console.log('RENDER TABLE')
return (
<div className='ml-5 mr-5 mt-5'>
  <table className='table table-striped'>

    <thead>
    <tr>
    <th colSpan='1'>Select currency:</th>
    <th colSpan='2'><select 
    value={this.state.selectedCurrency}
    onChange={(e)=>{this.handleSelectInput(e)}}
    >
    {options}

    </select>
    </th>

    <th colSpan='2'>Search (case insensitive):</th>
    <th colSpan='2'><input
    onChange={(e)=>{this.handleSearchInput(e)}}
    type="text" 
    id="search"/>
    
    </th>
    </tr>
    <tr>
      {tableHeadres}
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
