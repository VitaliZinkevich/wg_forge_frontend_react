import React  from 'react'

export let Statistics = (props)=> {

    // preparing data for stats

    let median = (values)=>{
        values.sort(function(a,b){
        return parseFloat (a.total)- parseFloat (b.total);
      });
    
      if(values.length === 0) return 0
      var half = Math.floor(values.length / 2);
      if (values.length % 2){
      return values[half].total}
      else { 
      return ((parseFloat (values[half - 1].total) + parseFloat (values[half].total)) / 2.0).toFixed(2)}
    }

    let overAllTotal =(props.orders.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat (currentValue.total)}, 0)).toFixed(2)

    let femaleOrders = props.orders.filter ((e)=>{
        let currentUser = props.users.find ((el)=> {return e.user_id ===el.id})
        if (currentUser.gender === 'Female') {
            return true
        } else {
            return false
        }
        })
    
    let avrFemaleCheck= femaleOrders.length === 0 ? 'n/a': (femaleOrders.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat (currentValue.total)}, 0) / femaleOrders.length).toFixed(2)

        
    let maleOrders = props.orders.filter ((e)=>{
    let currentUser = props.users.find ((el)=> {return e.user_id ===el.id})
    if (currentUser.gender === 'Male') {
        return true
    } else {
        return false
    }
    })
    let avrMaleCheck= maleOrders.length === 0 ? 'n/a': ( maleOrders.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat (currentValue.total)}, 0).toFixed(2) / maleOrders.length).toFixed(2) 
    
       // console.log('RENDER STATS' )

    return      <><tr>
                        <td colSpan='4'>Orders Count</td>
                        <td colSpan='3'>{props.orders.length === 0 ? 'n/a': props.orders.length}</td>
                    </tr>
                    <tr>
                        <td colSpan='4'>Orders Total</td>
                        <td colSpan='3'>{props.selectedCurrency === 'USD'? '$': 
                            props.selectedCurrency === 'EUR' ? '€' : props.selectedCurrency}  {props.orders.length === 0 ? 'n/a':overAllTotal}</td>
                    </tr>
                    <tr>
                        <td colSpan='4'>Median Value</td>
                        <td colSpan='3'>{props.selectedCurrency === 'USD'? '$': 
                            props.selectedCurrency === 'EUR' ? '€' : props.selectedCurrency} {props.orders.length === 0 ? 'n/a':median(props.orders)}</td>
                    </tr>
                    <tr>
                        <td colSpan='4'>Average Check</td>
                        <td colSpan='3'>{props.selectedCurrency === 'USD'? '$': 
                            props.selectedCurrency === 'EUR' ? '€' : props.selectedCurrency} {props.orders.length === 0 ? 'n/a':(overAllTotal/props.orders.length).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan='4'>Average Check (Female)</td>
                        <td colSpan='3'>{props.selectedCurrency === 'USD'? '$': 
                            props.selectedCurrency === 'EUR' ? '€' : props.selectedCurrency} {props.orders.length === 0 ? 'n/a':avrFemaleCheck}</td>
                    </tr>
                    <tr key='stat6'>
                        <td colSpan='4'>Average Check (Male)</td>
                        <td colSpan='3'>{props.selectedCurrency === 'USD'? '$': 
                            props.selectedCurrency === 'EUR' ? '€' : props.selectedCurrency} {props.orders.length === 0 ? 'n/a':avrMaleCheck}</td>
                    </tr></> 
  }
