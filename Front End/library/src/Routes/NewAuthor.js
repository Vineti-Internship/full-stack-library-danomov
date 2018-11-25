import React from 'react'



export class NewAuthor extends React.PureComponent {
    constructor(props) {
        super(props);

        this.changeAuth = this.changeAuth.bind(this)
    }


    changeAuth(e) {
        const auth = e.target.value
        this.props.onClick(auth) 
    }


    render() {
        return (
            <React.Fragment>
                <button onClick={this.changeAuth} value="newauthor">New Author</button>
            </React.Fragment>
        )
    }
}

