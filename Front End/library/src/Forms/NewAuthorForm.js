import React from 'react';


export class NewAuthorForm extends React.PureComponent {
    constructor(props){
        super(props)

        // this.requestForm = this.requestForm.bind(this);
    }


    // requestForm() {
    // const myRequest = new Request('http://localhost:3000/authors', {method: 'POST', body: '{"full_name":"John Doe"}'});
 
    
    // fetch(myRequest)
    //    .then(response => {
    // if (response.status === 200) {
    //    console.log('yes');
    // } 
    // else {
    //   throw new Error('Something went wrong on api server!');
    // }
    //     })
    // .then(response => {
    // console.debug(response);
    // // ...
    // }).catch(error => {
    // console.error(error);
    // });
    // }
    


    render() {
        return (
        <React.Fragment>
        <form>
        <p>New Author</p>
        <input type="text" placeholder="Full Name"></input>
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