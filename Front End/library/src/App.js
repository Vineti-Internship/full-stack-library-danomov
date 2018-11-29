import React from 'react';
import { Authors } from './Components/Authors';
import { Books } from './Components/Books';
import { Selector } from './Components/Selector';


class App extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
          selector: "author",
        }
        
        this.changeCategory = this.changeCategory.bind(this);
        
    }

    //Method that changes show page when changing category on selector
    changeCategory(newSelector) {
        this.setState({
            selector: newSelector,
        });

    }

    
    render() {
    
        //Show page depending on statements
        if(this.state.selector === "author"){
            return (
                <React.Fragment>
                    <Selector onChange={this.changeCategory}/>
                    <Authors />                  
                </React.Fragment>
            );
        }
        else if(this.state.selector === "book"){
            return (
                <React.Fragment>
                    <Selector onChange={this.changeCategory}/>
                    <Books />                                      
                </React.Fragment>
            );
        }
        
    }

}


export default App;

