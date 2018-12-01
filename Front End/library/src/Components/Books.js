import React from 'react';
import './App.css';
import { NewBookForm } from '../Forms/NewBookForm';
import { Loader } from './Loader';
import { EditBookForm } from '../Forms/EditBookForm';
import { SearchBar } from './SearchBar';

//Book table component
export class Books extends React.PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      books: [],
      isLoading: true,
      selector: "bookselect",
      id: 0,
    }

  //Binding methods
  //New Book
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
  //Delete Book
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  //Edit Book
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.editBook = this.editBook.bind(this);  
  //Search Book
    this.handleSearch = this.handleSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

    //Filtering Books
    handleSearch(searchText) {
      console.log(this.state.books)
      let filtered = this.state.books.filter((book) => {
          return (book.name.includes(searchText) || book.description.includes(searchText))
      })

      this.showSearch(filtered)
      
    }

    //Set new state to render data
    showSearch(data) {
      this.setState({books: data})
    }

    //Request db to edit data
    handleFormEdit(id, name, description, rating, author_id) {

      let body = JSON.stringify({"name": name, "description": description, "rating": rating, "author_id": author_id});
  
      fetch(`http://localhost:3000/books/${id}`, 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()})
        .then((book)=>{
        this.editBook(book);
      })
  
    }
  
    //Change state to render data
    editBook(book) {
      let newBooks = this.state.books.filter((bookz) => bookz.id !== book.id)
      newBooks.push(book)
      this.setState({
        books: newBooks
      })
  
      alert(`Book has been updated Successfully! Please refresh the page to see the list`);
    }

    //Request db to delete data
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
      
      alert(`Book with an ID ${id} has been removed Successfully! Please refresh the page to see the list`);
    }
  
  
    //Request db to add new data
    handleFormSubmit(name, description, rating, author_id){
      console.log(this.state.books);
  
      let body = JSON.stringify({"book": {"name": name, "description":description, "rating":rating, "author_id":author_id } });
    
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

      
    //Ask db for books data
    async componentDidMount() {
      const result = await fetch('http://localhost:3000/books');
      this.setState({books: await result.json(), isLoading: false});
    }
  
    render() {
    
    const { books } = this.state;

    if(this.state.isLoading) {
      return <Loader/>
    }

    if(this.state.selector === "bookselect"){
  
    return (
        
        <React.Fragment>

            <NewBookForm handleFormSubmit={this.handleFormSubmit}/>
           
            <h1>Books List</h1>
            <SearchBar handleSearch={this.handleSearch}/>
            <table id="bookTable" style={{width:'90%', border:'2px solid white', borderRadius: '5px', marginTop: '8px'}}>
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
                <button value={book.id} onClick={(e) => this.setState({selector: "editselect", id: e.target.value})}>Edit</button>
            </tr>
            </tbody>
               

            ))}
            </table>
            
          
        </React.Fragment>
      );
    } else if(this.state.selector === "editselect") {

      return (
        <EditBookForm id={this.state.id} handleFormEdit={this.handleFormEdit}/>
      )

     }
    }
  }
  