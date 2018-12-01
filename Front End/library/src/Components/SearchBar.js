import React from 'react';


export const SearchBar = (props) => {

    


let formFields = {}

    return (
        <form onSubmit={ (e) => {
            e.preventDefault(); 
            props.handleSearch(formFields.searchText.value) 
            e.target.reset() 
        }}>
        <input ref={input => formFields.searchText = input} type="text" placeholder="Search.."></input>
        <button><i className="fa fa-search"></i></button>
        </form>
    );

   
}