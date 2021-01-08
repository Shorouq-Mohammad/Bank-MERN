import React, { Component } from 'react'
import './App.css'
import Operations from './components/Operations'
import Transactions from './components/Transactions'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Categories from './components/Categories';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      transactions: []      
    }
  }
  
  componentDidMount = async () => {
    const transactions = await axios.get("http://localhost:4200/transactions")
    this.setState({ transactions: transactions.data })
  }
  
  componentDidUpdate = async () => {
    const transactions = await axios.get("http://localhost:4200/transactions")
    this.setState({ transactions: transactions.data })
  }

  deleteTranscript = async (id) => await axios.delete(`http://localhost:4200/transaction/${id}`)
    
  getBalance = () => {
    let balance = 0
    const { transactions } = this.state
    if(transactions.length > 0){
      for(let transaction of transactions){
        balance += transaction.amount
      }
    }
    return balance
  }

  createTransaction = async (newTransaction) => await axios.post("http://localhost:4200/transaction", newTransaction)
  
  displayPage = () => {
    const transactions = this.state.transactions
    return (
      <div>
        <Route path="/transactions" render={() => <Transactions transactions={transactions} deleteTranscript={this.deleteTranscript} />} />
        <Route path="/operations" render={() => <Operations createTransaction={this.createTransaction} balance={this.getBalance()}/>} />           
        <Route path="/categories" render={() => <Categories transactions={transactions} />} />           
      </div>
    )
  }

  render() {
    return (
      <Router>
        <div id="main-links">
          <ul id="navbar">
            <li><Link to='/transactions'>Transactions</Link></li>
            <li><Link to='/operations'>Operations</Link></li>
            <li><Link to='/categories'>Categories</Link></li>
            <li id="nothing"></li>
            <li id="balance">Balance: {this.getBalance()}$</li>
          </ul>
        </div>
        {this.state.transactions.length > 0 ? this.displayPage() : <Route path="/operations" render={() => <Operations createTransaction={this.createTransaction} balance={this.getBalance()}/>} /> }
        <Redirect from='/' to='/transactions'/>
      </Router>
    )
  }
}
