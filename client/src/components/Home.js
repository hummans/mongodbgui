import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        };

    }

    render() {
        return (
            <div className="App">
                <h2 className="mb-3">Choose a country</h2>
                <div className="list-group">
                    Render
                </div>
            </div>
        );
    }
}

function Home() {
    return (
        <div className="App">
            <div className="bg-white rounded shadow-lg m-2 p-4">
                <List />
            </div>
        </div>
    );
}

export default Home;
