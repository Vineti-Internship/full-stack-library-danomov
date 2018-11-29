import React from 'react';
import './App.css';
import { NewAuthorForm } from '../Forms/NewAuthorForm';
import { Loader } from './Loader'

//Author table component
export class Authors extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      authors: [],
      isLoading: false,
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewAuthor = this.addNewAuthor.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  async componentWillMount() {
    this.setState({isLoading: true});
  }

  //Request to server for deleting data
  handleDelete(id){
    fetch(`http://localhost:3000/authors/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
      if(response.status > 299 || response.status < 200) {
       alert(response.statusText);
      } else {
        this.deleteAuthor(id);
      }
    })
  }

  //Change state to render new data
  deleteAuthor(id) {    
    this.setState({
      authors: this.state.authors.filter((author) => author.id !== id),
    });
    
    alert(`Author with an ID ${id} has been removed Successfully! Please refresh the page to see the list`);
  }


  //Request to server for posting data
  handleFormSubmit(name){
    console.log(this.state.authors);

    let body = JSON.stringify({"author": {"full_name": name } });
  
    console.log(body)
  fetch('http://localhost:3000/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
        })
        .then((response) => {return response.json()})
        .then((author)=>{
        this.addNewAuthor(author);
    
  })
      
  }

  //Change state to render new data
  addNewAuthor(author){
        this.setState({
          authors: [{...this.state.authors, ...author}],
        })

        alert("Added new Author! Please refresh the page to see the list");
       
  }


  //Ask server for authors data
  async componentDidMount() {
      const result = await fetch('http://localhost:3000/authors');
      this.setState({authors: await result.json(), isLoading: false});
      
  }
      



  render() {
    const { authors } = this.state;

    if(this.state.isLoading) {
      return <Loader />
    }
  
    return (
        
        <React.Fragment>
          <NewAuthorForm handleFormSubmit={this.handleFormSubmit}/>
           
            <h1>Authors List</h1>
            <table style={{width:'90%', border:'2px solid white', borderRadius: '5px'}}>
            <tbody>
            <tr>
                <th style={{border: '1px solid white', textAlign: 'center'}}>ID</th>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Full Name</th> 
                <th style={{border: '1px solid white', textAlign: 'center'}}>Book Count</th>
            </tr>
            </tbody>
            {authors.map(author => (

             
             <tbody key={author.id}>
             <tr>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{author.id}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{author.full_name}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{author.books.length}</td>
                <button value={author.id} onClick={(e) => this.handleDelete(e.target.value)}>Delete</button>
                <button value={author.id} onClick={(e) => console.log('Edit')}>Edit</button>
             </tr>
             </tbody>
             

            ))}
            </table>
          
        </React.Fragment>
      );
    }
  }