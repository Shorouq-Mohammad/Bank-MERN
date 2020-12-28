import React, { Component } from 'react'
import Transactions from './Transactions'

export default class Categories extends Component {
    constructor(){
        super()
        this.state = {
            isHovering: -1 // the id of category that is hovered
        }
    }

    findCategories = () =>{
        const categories = {} 
        for(let transaction of this.props.transactions){
          const category = transaction.category.toLowerCase()
          if(categories[category]){
            categories[category].sum += transaction.amount
            categories[category].transactions.push(transaction)
          }else{
            categories[category] = {sum: transaction.amount, transactions: [transaction]}
          }
        }
        return Object.entries(categories)
    }
    
    handleMouseHover = (event) => this.setState({ isHovering: event.target.id})
    
    render() {
        const categories = this.findCategories()
        return (
            <div>
                <div className="categoryInfo headerCategory" >
                    <span className="categoryName">Category Name</span>
                    <span className="categoryName">Sum</span>
                </div>
                {categories.map((c, i)=> (
                    <div className="category" id={i} onMouseEnter={this.handleMouseHover} key={i}>
                        <div className="categoryInfo" id={i}>
                            <span className="categoryName" id={i}>{c[0]}</span>
                            <span className="categoryName" id={i}>{c[1].sum}</span>
                        </div>
                        {this.state.isHovering == i && <Transactions transactions={c[1].transactions} key={i} category="true" />}
                    </div>
                ))}
            </div>
        )
    }
}
