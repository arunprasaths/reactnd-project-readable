import React, { Component } from 'react'
import { Field , reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

class PostForm extends Component{
    componentDidMount(){       
        if(this.props.post){
            this.props.initialize(this.props.post)  
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

        const { handleSubmit } = this.props;

        return (
                <form onSubmit={handleSubmit}  >
                    <Field
                        label="Title"
                        name="title"
                        type="text"
                        component={this.renderField}
                        />
                    <Field
                        label="Post Content"
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
                
                    <div className ="form-group">
                        <label>Category</label>
                        <div >
                            <Field className="form-control"  name="category" component="select">
                                <option />    
                                { this.props.categories.map(c => (<option key={c.path}>{c.name}</option>)) }                                     
                            </Field>                                   
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel </Link>
                </form>
                
        )
    }
}


function validate(values){
    const errors = {};

    //validate the input from 'values'
    if(!values.title || values.title.length < 3){
        errors.title = "Enter a title";
    }
    if(!values.category){
        errors.category = "Enter some categories" ;
    }
    if(!values.body ){
        errors.body  = "Enter some content for the post";
    }

    //if errors is empty object - form is good to submit
    //if errors has any property - Redux form assumes form is INVALID
    return errors;
}


export default reduxForm({
    form: 'PostForm',
    validate
})(PostForm)

