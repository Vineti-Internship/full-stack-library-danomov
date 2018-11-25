import React from 'react';
import { Authors } from './Components/Authors';
import { Books } from './Components/Books';
import { Selector } from './Components/Selector';
import { NewAuthor } from './Routes/NewAuthor';
import { NewAuthorForm } from './Forms/NewAuthorForm';
import { NewBook } from './Routes/NewBook';
import { NewBookForm } from './Forms/NewBookForm';

class App extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
          selector: "author",
        }
        
        this.changeCategory = this.changeCategory.bind(this);
        this.newAuthor = this.newAuthor.bind(this);
        this.newBook = this.newBook.bind(this);
    }

    changeCategory(newSelector) {
        this.setState({
            selector: newSelector
        });

    }

    newAuthor(newAuth) {
        this.setState({
            selector: newAuth
        })
    }

    newBook(newBooks) {
        this.setState({
            selector: newBooks
        })
    }

    render() {
    
        if(this.state.selector === "author"){
            return (
                <React.Fragment>
                    <Selector onChange={this.changeCategory}/>
                    <Authors/>
                    <NewAuthor onClick={this.newAuthor}/>                   
                </React.Fragment>
            );
        }
        else if(this.state.selector === "book"){
            return (
                <React.Fragment>
                    <Selector onChange={this.changeCategory}/>
                    <Books /> 
                    <NewBook onClick={this.newBook}/>                   
                </React.Fragment>
            );
        }
        else if(this.state.selector === "newauthor"){
            return (
                <React.Fragment>
                    <NewAuthorForm/>                 
                </React.Fragment>
            );
        }
        else if(this.state.selector === "newbook"){
            return (
                <React.Fragment>
                    <NewBookForm/>                 
                </React.Fragment>
            );
        }
    }

}


export default App;