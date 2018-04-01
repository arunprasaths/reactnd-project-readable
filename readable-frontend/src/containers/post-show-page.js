import React, { Component } from 'react'
import { fetchPost, deletePost, votePost } from '../actions/postActions'
import { fetchComments } from '../actions/commentActions'

import CommentFormPage from './comment-form-page'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostDetail from '../components/post-detail'
import CommentsList from '../components/comment-list'
import NotFound from '../components/NotFound'

class PostShow extends Component{
  
    constructor(){
       super()
       this.onDeleteClick = this.onDeleteClick.bind(this)
    }

    componentDidMount(){     
      
        const { id } =  this.props.match.params;
         this.props.fetchPost(id);   
         
         this.props.fetchComments(id, ()=>{           
         })
    }   

    onDeleteClick(){
        const { id } =  this.props.match.params;        
        // this case not advisable to use "this.props.post.id"        
        this.props.deletePost(id,() => { this.props.history.push('/')  });
    }

  
    render(){
        const { post, votePost, comments } = this.props
        
        if(!post){
            return <NotFound />
        }
       
        return(
            <div className="col-10 m-auto">
                <Link to="/" >Back To Home</Link>                
                               
                <PostDetail comments={comments} post={post} votePost={votePost} deletePost={this.onDeleteClick} />           
                              
                <CommentsList comments={comments} post={post} />                 
               
                <CommentFormPage parentId={post.id}  />                

            </div>
        )
    }
}

const mapStateToProps = ({ posts, comments }, ownProps) => {

  //  console.log('mapStateToProps - PostShow', comments)
   return { 
       post : posts[ownProps.match.params.id],
       comments: comments         
     }
}

export default connect(mapStateToProps,{ fetchPost, deletePost, votePost, fetchComments })(PostShow)