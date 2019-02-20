import React, { PureComponent } from 'react'
//User Info component

import UserInfo from './UserInfo'


export default class TableRow extends PureComponent {
  render() {
    return (
      <tr  id={`order_${this.props.id}`}>
        <td style={{width: '250px'}}>{this.props.transactionId}</td>

        <td  className="user_data text-left">
        <UserInfo
        userId={this.props.userInfo}
        users={this.props.users}
        /></td>

        <td>{this.props.orderDate}</td>
        <td >{this.props.orderAmount}</td>
        <td>{this.props.cardNumber}</td>
        <td>{this.props.cardType}</td>
        <td>{this.props.location}</td>
      </tr>
    )
  }
}
