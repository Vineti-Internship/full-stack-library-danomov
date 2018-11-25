import React from 'react';
import './App.css';

export class Authors extends React.PureComponent {
    state = {
      authors: []
    }
  
    async componentDidMount() {
      const result = await fetch('http://localhost:3000/authors');
      this.setState({authors: await result.json()});
    }
  
    render() {
      const { authors } = this.state;
  
      return (
        
        <React.Fragment>
           
            <h1>Authors</h1>
            <table style={{width:'90%', border:'2px solid white', borderRadius: '5px'}}>
            <tbody>
            <tr>
                <th style={{border: '1px solid white', textAlign: 'center'}}>ID</th>
                <th style={{border: '1px solid white', textAlign: 'center'}}>Full Name</th> 
                <th style={{border: '1px solid white', textAlign: 'center'}}>Book Count</th>
            </tr>
            </tbody>
            {authors.map(author => (

             <React.Fragment>
             <tbody>
             <tr>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{author.id}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{author.full_name}</td>
                <td style={{border: '1px solid white', textAlign: 'center'}}>{author.books.length}</td>
             </tr>
             </tbody>
             </React.Fragment>

            ))}
            </table>
          
        </React.Fragment>
      );
    }
  }