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

{/* <button 
  type="button"
  className="link-button" 
  onClick={() => this.setState({showSomething: true})}>
    Press me, I look like a link
</button>

Then use styling to change its appearance to that of a link:

.link-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;
}

.link-button:hover,
.link-button:focus {
text-decoration: none;
} */}

return (<> 
        <a href="#" 
        onClick={()=>{this.setState ({hidden:!this.state.hidden})}}>
                {userForDisplayString}
        </a>

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
