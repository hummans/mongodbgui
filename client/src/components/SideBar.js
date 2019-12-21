import React, { Component } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import StorageIcon from '@material-ui/icons/Storage';
import Button from "@material-ui/core/Button";
import 'bootstrap/dist/css/bootstrap.css'
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
                "/mongo/get/collections",
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
                    <div className=" bg-white w-100">
                        <LinearProgress color="secondary" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <List component="nav"
                          aria-label="main mailbox folders">
                        <Button variant="contained" color="primary" disableElevation className='mb-2'>
                            Create new Collection
                        </Button>
                        {this.state.data.data.map((item, key) => {
                            return (
                                <ListItem button key={key} onClick={() => {handleToUpdate(item.name)}}>
                                    <ListItemIcon>
                                        <StorageIcon />
                                    </ListItemIcon>
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
class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    handleToUpdate(someArg){
        /*
         var handleToUpdate  =   this.props.handleToUpdate;
        handleToUpdate(someArg);
         */
        alert(someArg);
        this.setState({arg1:someArg});
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
