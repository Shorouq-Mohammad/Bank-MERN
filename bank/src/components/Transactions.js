import React, { Component } from 'react'
import Transaction from './Transaction'
import Select from 'react-select'
import moment from 'moment'

export default class transactions extends Component {
    constructor(){
        super()
        this.state = {
            optionSelected : {}
        }
    }

    handleSearch = (event)=> this.setState({optionSelected : event ? event.value : {}})
        
    filterMonths = (transactions) => {
        const monthsObj = {}
        for(let transaction of transactions){
            const monthYear = (moment(transaction.date).month()+1)+"/"+moment(transaction.date).year()
            monthsObj[monthYear] = transaction.date
        }
        const monthsArr = []
        for(let key of Object.keys(monthsObj)){
            const option = {label: key, value: moment(monthsObj[key]).format("MM/YYYY")}
            monthsArr.push(option)
        }
        return monthsArr
    }

    dynamicSearch = (array) => array.filter(a => moment(a.date).format("MM/YYYY") === this.state.optionSelected)

    render() {
        let { transactions, deleteTranscript, category} = this.props
        const options = this.filterMonths(transactions)
        const filteredTransactions = this.dynamicSearch(transactions)
        transactions = filteredTransactions.length ? filteredTransactions : transactions
        return (
            <div>
                {!category && <Select options={options} onChange={this.handleSearch} isClearable="true" id="selectMonth"/>} 
                <table>
                    {!category && (<thead>
                        <tr>
                            <th>Amount</th>
                            <th>Vendor</th>
                            <th>Category</th>
                            <th>date</th>
                            <th></th>
                        </tr>
                    </thead>)}
                    <tbody>
                        {transactions.map(t => <Transaction transaction={t} key={t._id} deleteTranscript={deleteTranscript} category={category}/>)}  
                    </tbody>
                </table>
            </div>
        )
    }
}
