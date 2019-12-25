import React, {Component, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import SignInStyle from '../Styles/SnackBar'

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

const useStyles = makeStyles(SignInStyle);

function GetCluster(props) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setIsSubmit(false)
    };

    const loadProgressBar = () => {
        if(isSubmit){
            return (
                <LinearProgress color="secondary" />
            )
        }
    };

    const getDatabases = (url)=> {
        console.log(url)
    };

    const render = ()=> {
        return(
            <Container component="main" maxWidth="md">
                <CssBaseline />
                {loadProgressBar()}
                <Grid container justify="flex-start" className='mt-4'>
                    <Grid item>
                        <Link to={'/mongo/'} variant="h5">
                            <IconButton>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Link>
                    </Grid>
                </Grid>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Databases
                    </Typography>
                    <List component="nav" aria-label="secondary mailbox folder">
                        <ListItem
                            button
                            selected={selectedIndex === 2}
                            onClick={event => handleListItemClick(event, 2)}
                        >
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 3}
                            onClick={event => handleListItemClick(event, 3)}
                        >
                            <ListItemText primary="Spam" />
                        </ListItem>
                    </List>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    };

    return (
        render()
    );
}

class Cluster extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <GetCluster connection={this.props.location.state.connection} />
            </div>

        );
    }
}

export default Cluster;
