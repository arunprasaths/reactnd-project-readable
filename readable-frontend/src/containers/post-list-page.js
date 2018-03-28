import React, { Component } from 'react'
import PostList from '../components/post-list'
import Header from '../components/header'
import Categories from '../components/categories'
import { fetchPosts, deletePost, votePost } from '../actions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

class PostListPage extends Component{

    componentDidMount(){
        this.props.fetchPosts()
    }

    state = {
        sortBy: 'timestamp',
        sortOrder : 'desc'       
    }

    SortBy = (val) => {
       this.setState({
           sortBy : val
       })
    }

    SortOrder = (val) => {
        this.setState({
            sortOrder : val
        })       
    }
        
    render(){
        let { posts } = this.props
        const {deletePost, votePost ,filtercategory } = this.props

        if(filtercategory){          
            posts = _.filter(posts, {'category': filtercategory})
        }

        //appy sorting and ordering
        posts = _.orderBy(posts, [this.state.sortBy], [this.state.sortOrder] );

        return (
            <div className="row justify-content-md-center">
                <div className="col-lg-10 col-lg-push-1 col-md-12">                                           
                    <Header />                                            
                    <div className="row m-auto">
                        <div className="col-2">
                            <Categories />                  
                        </div>
                        <div className="col-8">     
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group form-inline">
                                        <label htmlFor="sortby">SortBy:</label>
                                        <select defaultValue='timestamp' onChange={event => this.SortBy(event.target.value)} className="form-control" id="sortby">
                                            <option value='voteScore'>Votes</option>
                                            <option value='timestamp'>Date</option>
                                        </select>
                                    </div>
                                </div> 
                                <div className="col-4">
                                    <div className="btn-group" role="group" aria-label="Sort Order">
                                        <button onClick={()=> this.SortOrder('asc')} type="button" className="btn btn-secondary">ASC</button>
                                        <button onClick={()=> this.SortOrder('desc')} type="button" className="btn btn-secondary active">DESC</button>                                    
                                    </div>
                                </div>                               
                                <div className="col-4">
                                    <div className="text-xs-right">
                                        <Link className="btn btn-danger" 
                                            to="/posts/new" >Add Post </Link>                  
                                    </div>
                                </div>
                            </div>
                            
                            
                            <PostList posts={posts} deletePost={deletePost} votePost={votePost} />
                        </div>      
                    </div>         
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
   
    const { category } = ownProps.match.params

    return {
        posts: _.filter(state.posts, post => !post.deleted),
        filtercategory: category
    }
}

export default connect(mapStateToProps, { fetchPosts, deletePost, votePost })(PostListPage)