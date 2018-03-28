import React, { Component } from 'react'
import _ from 'lodash'
import CommentItem from './comment-item'
import { connect } from 'react-redux'
import { fetchComments, voteComment, deleteComment } from '../actions'

class CommentsList extends Component{   
    componentDidMount(){
         const {post, fetchComments } = this.props         
         fetchComments(post.id, ()=>{}); 
    }

    renderComments(){       
        const { comments, deleteComment, voteComment} = this.props;

        return _.map(comments, (comment)=> {
             return (                
                <li key={comment.id} className="list-group-item">
                    <CommentItem key={comment.id} postCategory={this.props.post.category} comment={comment} deleteComment={deleteComment} voteComment={voteComment} />                  
                </li>
               );   
        })        
    }

  
    render(){
       
        return (      
            <div className=" mt-4 mb-1">               
                <h4 className="bg-light mb-1 mt-1">Comments </h4>                
               
                <ul className="list-group">
                    {this.renderComments()}
                </ul>               

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}
export default connect(mapStateToProps,{ fetchComments, voteComment, deleteComment })(CommentsList)