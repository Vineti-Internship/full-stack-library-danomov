import React from 'react';
import './App.css';

export class Books extends React.PureComponent {
    state = {
      books: []
    }
  
    async componentDidMount() {
      const result = await fetch('http://localhost:3000/books');
      this.setState({books: await result.json()});
    }
  
    render() {
      const { books } = this.state;
  
      return (
        
        <React.Fragment>
           
            <h1>Books</h1>

            <table style={{width:'90%', border:'2px solid white', borderRadius: '5px'}}>
            <tbody>
            <tr>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Author ID</th>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Name</th>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Description</th> 
                <th style={{border: '1px solid white', textAlign: 'center'}}>Rating</th>
            </tr>
            </tbody>  
                {books.map(book => (

                <React.Fragment>
            <tbody>
            <tr>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{book.author_id}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{book.name}</td>
                <td style={{border: '1px solid white'}}>{book.description}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{book.rating}</td>
            </tr>
            </tbody>
                </React.Fragment>

                ))}

            </table>
          
        </React.Fragment>
      );
    }
  }
  