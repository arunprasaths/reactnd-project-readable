import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'


class CommentForm extends Component{

    componentDidMount(){           
        if(this.props.comment){
            this.props.initialize(this.props.comment)  
        }            
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

    render(){
        const { handleSubmit, postCategory, postId } = this.props

        return (
             <form onSubmit={handleSubmit} >
                <Field
                    label="Comment"
                    name="body"
                    type="textarea"
                    component={this.renderField}
                />
                <Field
                    label="Submitted By"
                    name="author"
                    type="text"
                    component={this.renderField}
                    />
               <button type="submit" className="btn btn-primary">Submit</button>
               <Link to={`/${postCategory}/${postId}`} className="btn btn-danger">Cancel </Link>
            </form>
        )
    }
}


function validate(values){
     const errors = {};
    //validate the input from 'values'
    if(!values.body){
        errors.body = "Enter some comments";
    }
}

export default reduxForm({
    form: 'CommentForm',
    validate
})(CommentForm)

