import React, { PureComponent } from 'react'
//User Info component

import UserInfo from './UserInfo'


export default class TableRow extends PureComponent {
  render() {
    return (
      <tr id={`order_${this.props.id}`}>
        <td>{this.props.transactionId}</td>

        <td className="user_data">
        <UserInfo
        userId={this.props.userInfo}
        /></td>

        <td>{this.props.orderDate}</td>
        <td>{this.props.orderAmount}</td>
        <td>{this.props.cardNumber}</td>
        <td>{this.props.cardType}</td>
        <td>{this.props.location}</td>
      </tr>
    )
  }
}
