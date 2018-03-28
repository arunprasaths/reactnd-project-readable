import React from 'react'
import {Link} from 'react-router-dom'
import { formatDate } from '../utils/common'

export default function PostItem({post, deletePost, votePost}) {
    
    return (
        <div className="card box-shadow">
            <div className="card-body">
                <div className="card-title">
                    <strong className="d-inline-block mb-2 text-primary">{post.category}</strong>
             
                    <h3 className="mb-0">
                        <Link className="text-dark" to={`/${post.category}/${post.id}`}>
                            {post.title}
                        </Link>
                    </h3>
                </div>
                <div className="mb-1 text-muted">
                    <small>{post.author}</small>
                    <small>{formatDate(post.timestamp)}</small> 
                </div>

                <p className="card-text">{post.body} </p>

                <div className="card-footer">
                    <small>
                        Votes:
                        <span className="badge badge-dark p-2 m-2">
                            {post.voteScore}
                        </span>   
                        <span onClick={() => votePost(post.id, 'upVote')} className="fa fa-thumbs-o-up"> Like</span>
                        <span onClick={() => votePost(post.id, 'downVote')} className="fa fa-thumbs-down"> Dis-like</span>                         
                        <i className="fa fa-comment p-1 mt-1"> {post.commentCount} comments</i>
                    </small>
                   
                    <div className="float-right">
                        <Link to={`posts/edit/${post.id}`} className="btn btn-sm btn-primary">Edit</Link>
                        <button
                            onClick={() => deletePost(post.id, () => {})}
                            className="btn btn-sm btn-secondary ml-1">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}