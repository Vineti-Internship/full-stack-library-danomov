import React from 'react';


export class NewBookForm extends React.PureComponent {
    render() {
        return (
        <React.Fragment>
        <form>
        <p>New Book</p>
        <input type="text" placeholder="Name"></input>
        <br></br>
        <input type="text" placeholder="Description"></input>
        <br></br>
        <input type="text" placeholder="Rating"></input>
        <br></br>
        <input type="text" placeholder="Author ID"></input>
        <br></br>
        <input type="submit" value="Submit"></input>
        <br></br>
        <br></br>
        <button>Back</button>
        </form>
        </React.Fragment>     
        )
    }
}