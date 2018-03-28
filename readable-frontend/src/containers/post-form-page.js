import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost, savePost, fetchPost, updatePost, fetchCategories } from '../actions'
import PostForm from '../components/post-form'


class PostFormPage extends Component{

    componentDidMount(){
        this.props.fetchCategories();

        const { id } = this.props.match.params;
        if(id){
            this.props.fetchPost(id);
        }else {
            this.props.createPost();
        }        
    }

    submit = (post) => {
        if(!post.id){
            this.props.savePost(post, () => {
                this.props.history.push('/')
            });
        }
        else{
            return this.props.updatePost(post, () =>{
                this.props.history.push('/')
            })
        }      
    }

    render(){
        return (
            <div>                
                <PostForm post={this.props.post}
                           categories={this.props.categories} 
                           onSubmit={this.submit} />
            </div>
        )
    }
}


function mapStateToProps(state, ownProps){
    return {
        post: state.posts[ownProps.match.params.id],
        categories: state.categories
    }
}
export default connect(mapStateToProps,{  createPost, savePost, fetchPost, updatePost, fetchCategories  })(PostFormPage)