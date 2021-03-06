import React from 'react';



export class EditAuthorForm extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            authors:[],
            val: props.id,
        }
    }

    componentDidMount() {
       
       this.Fetcher(this.state.val)
        
    }

    Fetcher(id) {
        fetch(`http://localhost:3000/authors/${id}`)
        .then(results => {
            return results.json();
        }).then(data => {
            this.setState({authors: data})
        })
    }

    render() {

    const { authors } = this.state

    let formFields = {}

    return (
        <form style={{marginTop: '10px', padding: '10px', border: '1px solid gray', borderRadius: '5px'}} onSubmit={ (e) => {e.preventDefault(); this.props.handleFormEdit(this.state.val, formFields.name.value) }}>
        <p>Edit Author</p>
        <input type="text" defaultValue={authors.full_name} ref={input => formFields.name = input} ></input>
        <br></br>
        <button>Submit Form</button>
        </form>
      );
    }
}
