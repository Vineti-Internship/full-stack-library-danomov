import React from 'react';


export const NewBookForm = (props) => {

    let formFields = {}


    
        return (
       
        <form onSubmit={ (e) => {e.preventDefault(); props.handleFormSubmit(formFields.name.value, formFields.description.value, formFields.rating.value, formFields.author_id.value); e.target.reset() }}>
        <p>New Book</p>
        <input ref={input => formFields.name = input} type="text" placeholder="Name"></input>
        <br></br>
        <input ref={input => formFields.description = input} type="text" placeholder="Description"></input>
        <br></br>
        <input ref={input => formFields.rating = input} type="text" placeholder="Rating"></input>
        <br></br>
        <input ref={input => formFields.author_id = input} type="text" placeholder="Author ID"></input>
        <br></br>
        <button>Submit Form</button>
        </form>
        
        )
    
}