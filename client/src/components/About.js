import React, { Component } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';

class GetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            render: false
        };

    }

    renderListData(){

        var data = {
            username : '',
            password : '',
            cluster : '',
            database:'react2',
            collection:'Apple2'
        };

        axios
            .post(
                "/mongo/get/collections",
                data,
            )
            .then(response => {
                console.log(response);
                try {
                    this.setState({data: response, render: true});
                } catch (e) {
                    console.log(e);
                }
            })
            .catch(error => {
                console.log(error);
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
                    <List component="nav" aria-label="main mailbox folders">
                    {this.state.data.data.map((item, key) => {

                        return (
                            <ListItem button key={key}>
                                <ListItemText primary={item.name}/>
                            </ListItem>
                        )
                    })}
                    </List>
                </div>
            );
        }
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Home() {
    return (
        <div className="App">
            <div className="bg-white rounded shadow-lg m-2 p-4">
                <GetList />
            </div>
        </div>
    );
}

export default Home;
