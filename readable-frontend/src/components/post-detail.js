import React, { Component } from 'react'
import { formatDate } from '../utils/common'
import { Link } from 'react-router-dom'

class PostDetail extends Component{
    
    render(){
        const { post, votePost, deletePost } = this.props
        
        let commentCount = Object.keys(this.props.comments).length
        
        return(            
             <div className="card p-100">
                     <div className="card-title m-t-10">
                            <h4>{post.title}</h4>            
                            <div className="card-subtitle">
                                <h3 className="badge badge-primary">{post.category} </h3>    
                            </div>               
                            <small className="text-success">Author: {post.author}</small>
                            <small className="text-warning">Modified on: {formatDate(post.timestamp)}</small> 
                     </div>
                    <div className="card-body">                      
                        <p className="card-text">
                            {post.body}
                        </p>                        
                    </div>
                    <div className="card-footer">
                        <small>
                            Votes:
                            <span className="badge badge-dark p-2 m-2">
                                {post.voteScore}
                            </span>   
                            <span onClick={() => votePost(post.id, 'upVote')} className="fa fa-thumbs-o-up"> Like</span>
                            <span onClick={() => votePost(post.id, 'downVote')} className="fa fa-thumbs-down"> Dis-like</span>                         
                            <i className="fa fa-comment p-1 mt-1"> {commentCount} comments</i>
                        </small>                    
                        <div className="float-right">
                            <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary">Edit</Link>
                            <button type="button"
                                className="btn btn-sm btn-danger floar-right"
                                onClick={deletePost}
                                >Delete Post</button>
                        </div>
                    </div>
                </div>     
        )
    }    
}

export default PostDetail