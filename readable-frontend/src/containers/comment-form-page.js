import React, { Component } from 'react'
import CommentForm from '../components/comment-form'
import { connect } from 'react-redux'
import { addComment } from '../actions/commentActions'

class CommentFormPage extends Component {

    submit = (values) => {
        if(!values.id){
            values.parentId = this.props.parentId
           
            this.props.addComment(values, () => {
                values = {};//reset
            });
        }        
    }

    render(){
        return(   
            <div>   
                <CommentForm onSubmit={this.submit} />
            </div>
        )
    }
}


export default connect(null, { addComment })(CommentFormPage)