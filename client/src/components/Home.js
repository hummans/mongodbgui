import React, { Component } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            render: false
        };

    }

    renderListData(){
        fetch('/mongo/delete/many')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                try {
                    this.setState({data: responseJson, render: true});
                } catch (e) {
                    console.log(e);
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    componentDidMount(){
        this.renderListData();
    }

    render() {
        var isRender = this.state.render;
        if (!isRender) {
            return (
                <div className="App">
                    <div className=" bg-white w-100">
                        <LinearProgress color="secondary" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    {this.state.data.name}
                </div>
            );
        }
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
