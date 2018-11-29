import React from 'react';
import './App.css';
import { NewBookForm } from '../Forms/NewBookForm';
import { Loader } from './Loader'

//Book table component
export class Books extends React.PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      books: [],
      isLoading: false,
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    }

    async componentWillMount(){
      this.setState({isLoading: true});
    }

    //Request to server for deleting data
    handleDelete(id){
      fetch(`http://localhost:3000/books/${id}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if(response.status > 299 || response.status < 200) {
          alert(response.statusText);
         } else {
           this.deleteBook(id);
         }
       })
    }
  
    //Change state to render new data
    deleteBook(id) {    
      this.setState({
        books: this.state.books.filter((book) => book.id !== id)
      });
      
      alert(`Author with an ID ${id} has been removed Successfully! Please refresh the page to see the list`);
    }
  
  

    handleFormSubmit(name, description, rating, author_id){
      console.log(this.state.books);
  
      let body = JSON.stringify({"book": {"name": name, "description":description, "rating":rating, "author_id":author_id } });
    
      console.log(body)
    fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body,
          })
          .then((response) => {return response.json()})
          .then((book)=>{
          this.addNewBook(book);
      
    })
        
    }
  
    //Change state to render new data
    addNewBook(book){
          this.setState({
            books: [{...this.state.books, ...book}],
          })
  
          alert("Added new Book! Please refresh the page to see the list");
         
    }
  
    //Ask server for books data
    async componentDidMount() {
      const result = await fetch('http://localhost:3000/books');
      this.setState({books: await result.json(), isLoading: false});
    }
  
    render() {
    
      const { books } = this.state;

      if(this.state.isLoading) {
        return <Loader/>
      }
  
    return (
        
        <React.Fragment>

            <NewBookForm handleFormSubmit={this.handleFormSubmit}/>
           
            <h1>Books List</h1>

            <table id="bookTable" style={{width:'90%', border:'2px solid white', borderRadius: '5px'}}>
            <tbody>
            <tr>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Author ID</th>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Name</th>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Description</th> 
                <th style={{border: '1px solid white', textAlign: 'center'}}>Rating</th>
            </tr>
            </tbody>  
            {books.map(book => (

               
            <tbody key={book.id}>
            <tr>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{book.author_id}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{book.name}</td>
                <td style={{border: '1px solid white'}}>{book.description}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{book.rating}</td>
                <button value={book.id} onClick={(e) => this.handleDelete(e.target.value)}>Delete</button>
            </tr>
            </tbody>
               

            ))}
            </table>
            
          
        </React.Fragment>
      );
    }
  }
  