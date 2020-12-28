const express = require('express')
const app = express()
const router = express.Router()
const Transaction = require('../models/Transaction')

router.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find({})
    res.send(transactions)
})

router.post('/transaction', async (req, res) => {
    const newTransaction = new Transaction(req.body)
    await newTransaction.save()
    res.send("The transaction was saved")
})

router.delete('/transaction/:id', async (req, res) => {
    await Transaction.findByIdAndRemove(req.params.id)
    res.send("The transaction was deleted ")
})

module.exports = router