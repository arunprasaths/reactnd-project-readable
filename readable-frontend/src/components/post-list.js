import React from 'react'
import _ from 'lodash'
import PostItem from './post-item'

export default function PostList({posts, deletePost, votePost}){

    const renderPosts = () =>{        
        //this.props.posts - is an object 
        //- so we cannot use javascript map() - applicable for array only
       return _.map(posts, post =>
            {
               return (
                <li key={post.id} className="list-group-item">
                    <PostItem key={post.id} post={post} deletePost={deletePost} votePost={votePost} />                  
                </li>
               );
            }); 
    }

    return (
        <div>             
              <ul className="list-group">
                {renderPosts()}
              </ul>    
        </div>
    )
}