import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CommentItem extends Component{

    render(){
        const { postCategory, comment, deleteComment, voteComment } = this.props

         return (
        <div className="card">
            <div className="card-body">              
                <small> {this.formatDate(comment.timestamp)} <span>{comment.author}</span> </small>
                <p className="card-text">
                    {comment.body}
                </p>     
                <div className="card-footer"> 
                    <small>
                        Votes:
                        <span className="badge badge-dark p-2 m-2">
                            {comment.voteScore}
                        </span>   
                        <span onClick={() => voteComment(comment.id, 'upVote')} className="fa fa-thumbs-o-up"> Like</span>
                        <span onClick={() => voteComment(comment.id, 'downVote')} className="fa fa-thumbs-down"> Dis-like</span>                                                
                    </small>

                    <div className="float-right">                  
                        <Link to={`/${postCategory}/${comment.parentId}/comments/edit/${comment.id}`} className="card-link btn-sm btn-warning">Edit</Link>
                        <button onClick={() => deleteComment(comment.id)} className="card-link btn-sm btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>  
        )

    }

    formatDate(timestamp) {
        return  new Date(timestamp).toISOString("mmm yyyy").slice(0,10)
    }
   
}

export default CommentItem