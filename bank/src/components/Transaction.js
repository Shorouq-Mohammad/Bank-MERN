import React, { Component } from 'react'
import moment from 'moment';

export default class Transaction extends Component {
    deleteTranscript = (event) => {
        this.props.deleteTranscript(event.target.id)
    }

    render() {
        let {amount, vendor, category, _id, date} = this.props.transaction
        const fromCategory = this.props.category
        const color = amount > 0 ? "green" : "red"
        date = moment(date).format("DD/MM/YYYY")
        return (
            <tr className={color} >
                <td>{amount}</td>
                <td>{vendor}</td>
                <td>{category}</td>
                <td>{date}</td>
                {!fromCategory && <td><i className="fas fa-trash-alt" onClick={this.deleteTranscript} id={_id}></i></td>}
            </tr>
        )
    }
}
