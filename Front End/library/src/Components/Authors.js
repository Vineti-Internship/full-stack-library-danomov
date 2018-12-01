import React from 'react';
import './App.css';
import { NewAuthorForm } from '../Forms/NewAuthorForm';
import { Loader } from './Loader';
import { EditAuthorForm } from '../Forms/EditAuthorForm';
 
//Author table component
export class Authors extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      authors: [],
      isLoading: true,
      selector: "authorselect",
      id: 0,
    }

  //Binding methods
  //New Author 
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewAuthor = this.addNewAuthor.bind(this);
  //Delete Author 
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  //Edit Author
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
  }

  
  //Request db to edit data 
  handleFormEdit(id, data) {

    let body = JSON.stringify({"full_name": data});

    fetch(`http://localhost:3000/authors/${id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {
      return response.json()})
      .then((author)=>{
      this.editAuthor(author);
    })

  }

  //Change state to render data
  editAuthor(author) {
    let newAuthors = this.state.authors.filter((auth) => auth.id !== author.id)
    newAuthors.push(author)
    this.setState({
      authors: newAuthors
    })

    alert(`Author has been updated Successfully! Please refresh the page to see the list`);
  }


  //Request db to delete data
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


  //Request db to add new data
  handleFormSubmit(name){
    console.log(this.state.authors);

    let body = JSON.stringify({"author": {"full_name": name } });
  
   
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

    if(this.state.selector === "authorselect"){
  
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
                <button value={author.id} onClick={(e) => this.setState({selector: "editselect", id: e.target.value})}>Edit</button>
             </tr>
             </tbody>
             

            ))}
            </table>
          
        </React.Fragment>
      );
    }
    else if(this.state.selector === "editselect") {

      return (
        <EditAuthorForm id={this.state.id} handleFormEdit={this.handleFormEdit}/>
      )

    }


    }
  }