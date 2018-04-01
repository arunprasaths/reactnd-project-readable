import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComment, updateComment } from '../actions/commentActions';
import CommentForm from '../components/comment-form'

class CommentEditPage extends Component {
   
    componentDidMount() {       
        this.props.fetchComment(this.props.match.params.id);      
    }
    
    renderField(field){
        const { meta: {touched, error} } = field
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    {...field.input} 
                    className="form-control"                  
                    type={field.type}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    
    submit = (values) => {
        
        const {category,postId} = this.props.match.params

        this.props.updateComment(values, () => {
            this.props.history.push(`/${category}/${postId}`)
        })
    }
    
    render() {

        const { comment } = this.props;
        const {category,postId} = this.props.match.params
        
        return (
             <CommentForm  onSubmit={this.submit} postCategory={category} postId={postId} comment={comment}  />   
        );
    }
}


function mapStateToProps(state, ownProps) {    
    return { comment: state.comments[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchComment, updateComment})(CommentEditPage)