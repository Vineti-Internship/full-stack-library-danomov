import React from 'react'



export class Selector extends React.Component {

    constructor(props) {
      super(props);
      
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      const category = e.target.value;
      this.props.onChange(category);
    }
  
    render() {
      return (
        <React.Fragment>

            <select id="greatNames" onChange={this.handleChange}>

            <option value="author">
                Authors
            </option>

            <option value="book">
                Books
            </option>

            </select>

        </React.Fragment>
      );
    }
  }