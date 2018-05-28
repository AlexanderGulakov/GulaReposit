import React, { Component, Fragment } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Test',
            wasClicked: false,
            items: [{
                name: '1'
            }, {
                name: '2'
            }, {
                name: '3'
            }]
        };

        this.setClicked = this.setClicked.bind(this);
    }

    setClicked(e) {
        const { onButtonClick } = this.props;

        onButtonClick(e);

        this.setState({
            wasClicked: true,
        });
    }

    renderLi = (el, ind) => {
        return (
            <li key={ind}>{el.name}</li>
    );
    };

    render() {
        const { buttonText, wasClicked, items } = this.state;

        return (
            <Fragment>
            <h1>Hello world</h1>
        <button
        style={{
            color: wasClicked ? 'red' : 'blue'
        }}
        onClick={this.setClicked}
    >{buttonText}</button>
        <ul className="list">
            {items.map(this.renderLi)}
    </ul>
        </Fragment>
    );
    }
}

export default App;