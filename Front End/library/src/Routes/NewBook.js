import React from 'react'



export class NewBook extends React.PureComponent {
    constructor(props) {
        super(props);

        this.changeBook = this.changeBook.bind(this)
    }


    changeBook(e) {
        const book = e.target.value
        this.props.onClick(book) 
    }


    render() {
        return (
            <React.Fragment>
                <button onClick={this.changeBook} value="newbook">New Book</button>
            </React.Fragment>
        )
    }
}
