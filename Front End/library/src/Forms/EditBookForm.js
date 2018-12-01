import React from 'react';



export class EditBookForm extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            books:[],
            val: props.id,
        }
    }

    componentDidMount() {     
       this.Fetcher(this.state.val)
    }

    Fetcher(id) {
        fetch(`http://localhost:3000/books/${id}`)
        .then(results => {
            return results.json();
        }).then(data => {
            this.setState({books: data})
        })
    }

    render() {

    const { books } = this.state

    let formFields = {}

 return ( 
    <form onSubmit={ (e) => {e.preventDefault(); this.props.handleFormEdit(this.state.val, formFields.name.value, formFields.description.value, formFields.rating.value, formFields.author_id.value); e.target.reset() }}>
    <p>Edit Book</p>
    <input ref={input => formFields.name = input} defaultValue={books.name} type="text"></input>
    <br></br>
    <input ref={input => formFields.description = input} defaultValue={books.description} type="text"></input>
    <br></br>
    <input ref={input => formFields.rating = input} defaultValue={books.rating} type="number"></input>
    <br></br>
    <input ref={input => formFields.author_id = input} defaultValue={books.author_id} type="number"></input>
    <br></br>
    <button>Submit Form</button>
    </form>
    );
  }
}
