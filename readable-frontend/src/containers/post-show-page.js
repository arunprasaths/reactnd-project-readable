import React, { Component } from 'react'
import { fetchPost, deletePost, votePost, fetchComments } from '../actions'

import CommentFormPage from './comment-form-page'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostDetail from '../components/post-detail'
import CommentsList from '../components/comment-list'

class PostShow extends Component{
   
    state = {
        commentCount: 0
    }
    componentDidMount(){     
         const { id } =  this.props.match.params;
         this.props.fetchPost(id);        
    }   

    onDeleteClick(){
        const { id } =  this.props.match.params;        
        // this case not advisable to use "this.props.post.id"        
        this.props.deletePost(id,() => { this.props.history.push('/')  });
    }

  
    render(){
        const { post, votePost } = this.props
        
        if(!post){
            return <div>Loading.. </div>
        }
       
        return(
            <div className="col-10 m-auto">
                <Link to="/" >Back To Home</Link>                
                               
                <PostDetail post={post} votePost={votePost} deletePost={this.onDeleteClick.bind(this)} />           
                              
                <CommentsList post={post} />                 
               
                <CommentFormPage parentId={post.id}  />                

            </div>
        )
    }
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
   return { 
       post : posts[ownProps.match.params.id]         
     }
}

export default connect(mapStateToProps,{ fetchPost, deletePost, votePost, fetchComments })(PostShow)