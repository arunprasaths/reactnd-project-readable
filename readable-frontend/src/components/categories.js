import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'


class Categories extends Component{
    
    componentDidMount(){
        this.props.fetchCategories()
    }
    
    renderCategories(){
       const { categories } = this.props
      
       return _.map(categories, category =>
        {
             return (
                <li key={category.path} className="nav-item">
                    <Link className="nav-link" to={`/${category.path}`}> 
                        {category.name}
                    </Link>
                </li>             
            )   
       });
    }

    render(){  
        return(
            <div className="mt-5 pt-1">
                <small>Filter By Category:</small>
                <ul className="nav flex-column">  
                       <li className="nav-item">
                            <Link to="/" className="nav-link active">All</Link>
                        </li>             
                     {this.renderCategories()}                          
                </ul>
            </div>
        );        
    }
}

const mapStateToProps = (state) => ({categories: state.categories})

export default connect(mapStateToProps, { fetchCategories })(Categories)