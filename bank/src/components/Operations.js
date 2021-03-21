import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export default class Operations extends Component {
    constructor(){
        super()
        this.state={
            amount: 0,
            vendor: "",
            category: "",
            date: moment().format("YYYY-MM-DD"),
            open: false,
            message: "",
            redirect: false
        }
    }
    
    handleChange = (event) => this.setState({[event.target.id]: event.target.value})

    createTransaction = (event) => {
        let {amount, vendor, category, date} = this.state
        const errors = []
        if(amount < 0){
            errors.push("please put only positive numbers")
        }
        amount = event.target.id === "deposit" ? amount : amount * -1 
        if(! vendor.length || ! category.length){
            errors.push("You left one of the inputs empty") 
        }
        if(amount < 0 && this.props.balance + amount < 500){
            errors.push("Insufficient Funds")
        }
        if(errors.length === 0){
            const newTransaction = {amount, vendor, category, date}
            this.props.createTransaction(newTransaction)
            this.setState({redirect: true})
        }else{
            this.setState({
                open: true,
                message: errors.toString()
            })
        }
    }

    handleClose = (event) =>  this.setState({open: false});
   
    render() {
        const {open, message, amount, vendor, category, date, redirect} = this.state
        return (
            <div>
                <div id="form">
                    <p>Add A Transaction</p>
                    <input type="number" name="amount" id="amount" onChange={this.handleChange} value={amount} placeholder="Amount" />
                    <input type="text" name="vendor" id="vendor" onChange={this.handleChange} value={vendor} placeholder="Vendor"/>
                    <input type="text" name="category" id="category" onChange={this.handleChange} value={category} placeholder="Category"/>
                    <input type="date" name="date" id="date" onChange={this.handleChange} value={date} />
                    <button id="deposit" onClick={this.createTransaction}>Deposit</button>
                    <button id="withdraw" onClick={this.createTransaction}>Withdraw</button>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                    <MuiAlert onClose={this.handleClose} severity="error" elevation={6} variant="filled">{message}</MuiAlert>
                </Snackbar>
                {redirect && <Redirect to="/transactions" />}
            </div>
        )
    }
}
