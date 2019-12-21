import React, { Component } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import 'bootstrap/dist/css/bootstrap.css'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

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
        var handleToUpdate  =   this.props.handleToUpdate;
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

                                <ListItem button key={key} onClick={() => {handleToUpdate(item.name)}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={JSON.stringify(item)} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            );
        }
    }
}
class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    handleToUpdate(someArg){
        var handleToUpdate  =   this.props.handleToUpdate;
        handleToUpdate(someArg);

    }

    render() {
        var handleToUpdate  =   this.handleToUpdate;
        return (
            <div className="SideBar">
                    <GetList credentials={this.props.credentials}  handleToUpdate = {handleToUpdate.bind(this)}/>
            </div>
        );
    }
}
export default SideBar;
