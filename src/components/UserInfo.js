import React, { PureComponent } from 'react'

// app data
import companies from '../data/companies'




export default class UserInfo extends PureComponent {
    
    state={
        hidden: true,
    }
  
    render() { 


//find user
let exactUser = this.props.users.find ((e)=>{
    return e.id === this.props.userId
})

// prepare string with user first and last name
let userForDisplayString = exactUser.gender === 'Male' ?  `Mr. ${exactUser.first_name} ${exactUser.last_name}` :  `Mrs. ${exactUser.first_name} ${exactUser.last_name}`

// prepare B-day string
let bDate = new Date (exactUser.birthday*1000) 
let bDayString =   ('0' + bDate.getDate()).slice(-2)+'/'+
                   ('0' + bDate.getMonth()+1).slice(-2) + '/'+
                   (bDate.getFullYear())
                       


// prepare company detailes if provided

// user have company at all conditional display depends on it
let gotCompany 
let companyData

if (exactUser.company_id === null) {
    gotCompany = false
} else {
    gotCompany = true
    companyData = companies.find(e=>e.id === exactUser.company_id)
}

// The href attribute requires a valid value to be accessible. 
// Provide a valid, navigable address as the href value. 
// If you cannot provide a valid href, but still need the element to 
// resemble a link, use a button and change it with appropriate styles. 
// Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
// and reloading page when clicked at a tag with href  #
//console.log('RENDER USER DETAILES DATA' )
return (<> 
        <button 
        type="button" 
        className='link-button' 
        onClick={()=>{this.setState ({hidden:!this.state.hidden})}}>
                {userForDisplayString}
        </button>

        <div className={this.state.hidden === true? 'user-details d-none': 'user-details'}  >
                <p>Birthday: {bDayString}</p>
                <p><img src={exactUser.avatar} alt ={userForDisplayString + 'avatar'} width="100px"/></p>
                {gotCompany === true ? (<>
                <p>Company: <a title={companyData.url} rel="noopener noreferrer" target='_blank' href={companyData.url} >{companyData.title}</a></p>
                <p>Industry: {companyData.industry} / {companyData.sector}</p>
                </>):<p>Have not connected company</p>}    
        </div>
       </>
    )
  }
}
