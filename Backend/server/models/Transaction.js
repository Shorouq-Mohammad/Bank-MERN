const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount: Number,
    category: String,
    vendor: String,
    date: Date
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction
