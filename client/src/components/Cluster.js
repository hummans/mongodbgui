import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link } from 'react-router-dom';
import Copyright from './Copyright';

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fade from '@material-ui/core/Fade';

class Cluster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            url: null,
            type :null,
            submit: false,
        };
    }

    loadProgressBar(){
        if(this.state.submit){
            return (
                <LinearProgress color="secondary" />
            )
        }
    };

    getCluster (url, type){
        this.setState({
            submit: true,
            url: url,
            type: type,
        });
        axios
            .post(
                "/mongo/get/databases/",
                {url:  url},
            )
            .then(response => {
                this.setState({
                    data: response.data.databases,
                    submit: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    submit: false
                });
            });
    }

    componentDidMount() {
        this.getCluster(this.props.location.state.url, this.props.location.state.type);

    }

    render() {
        if(this.state.submit){
            return (
                <Fade in={true}>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    {this.loadProgressBar()}
                    <Grid container justify="flex-start" className='mt-4'>
                        <Grid item>
                            <Link to={'/' + this.state.type +  '/'} variant="h5">
                                <IconButton>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Please wait
                    </Typography>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
                </Fade>
            );
        } else {
            return (
                <Fade in={true}>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Grid container justify="flex-start" className='mt-4'>
                        <Grid item xs>
                            <Link to={'/' + this.state.type +  '/'} variant="h5">
                                <IconButton>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/' + this.state.type +  '/'} variant="h5">
                                <IconButton>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Cluster
                    </Typography>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {this.state.data.map((item, key) => {
                            return (
                                    <ListItem button key={key} component={Link} to={{pathname: '/mongo/collections/', state: {url: this.state.url, database: item.name}}}>
                                        <ListItemText
                                            primary={item.name}/>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                            )
                        })}
                    </List>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
                </Fade>
            );
        }
    }
}

export default Cluster;
