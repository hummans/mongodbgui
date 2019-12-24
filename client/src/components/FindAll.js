import React, { Component } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import 'bootstrap/dist/css/bootstrap.css'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class GetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: this.props.credentials,
            data: [],
            render: false
        };

    }

    renderListData(){
        axios
            .post(
                "/mongo/find/all",
                this.state.credentials,
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
        var documentName  =   this.props.documentName;
        var isRender = this.state.render;
        if (!isRender) {
            return (
                <div className="App">
                    <div className=" bg-white">
                        <LinearProgress color="secondary" className='mt-sm-2' />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <List component="nav"
                          aria-label="main mailbox folders">
                        {this.state.data.data.map((item, key) => {
                            return (
                                <ListItem button key={key} onClick={() => {documentName(item._id)}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DeleteIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item._id} />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            );
        }
    }
}

class Documents extends Component {
    constructor(props) {
        super(props);
    }

    documentName(someArg){
        var documentName  =   this.props.documentName;
        documentName(someArg);
    }

    render() {
        var documentName  =   this.documentName;
        return (
            <div className="Documents">
                    <GetList credentials={this.props.credentials}  documentName = {documentName.bind(this)}/>
            </div>
        );
    }
}
export default Documents;
