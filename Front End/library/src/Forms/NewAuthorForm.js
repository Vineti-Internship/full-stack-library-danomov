import React from 'react';


//New Author form builder  
export const NewAuthorForm = (props) => {
   
    let formFields = {}
    
   
    return (
      
        <form style={{marginTop: '10px', padding: '10px', border: '1px solid gray', borderRadius: '5px'}} onSubmit={ (e) => {e.preventDefault(); props.handleFormSubmit(formFields.name.value); e.target.reset() }}>
        <p>New Author</p>
        <input ref={input => formFields.name = input} type="text" placeholder="Full Name"></input>
        <br></br>
        <button>Submit Form</button>
        </form>
      
    )
    
}