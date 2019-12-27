import React, { useState, useEffect } from 'react';
import { useLocation} from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";

import RefreshIcon from '@material-ui/icons/Refresh';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {Link} from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";

import Fade from "@material-ui/core/Fade";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import ReactJson from 'react-json-view'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    refreshButton: {
        marginLeft: theme.spacing(2),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 240,
    },
}));


function Dashboard() {
    const classes = useStyles();
    const location = useLocation();

    // misc
    const [render, setRender] = useState(false);
    const [url, setUrl] = useState(null);
    const [database, setDatabase] = useState(null);

    // collections
    const [submitCollections, setSubmitCollections] = useState(false);
    const [loadingCollections, setLoadingCollections] = useState(false);
    const [collections, setCollections] = useState(null);

    // documents
    const [submitDocuments, setSubmitDocuments] = useState(false);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [documents, setDocuments] = useState(null);

    // document
    const [submitRow, setSubmitRow] = useState(false);
    const [loadingRow, setLoadingRow] = useState(false);
    const [row, setRow] = useState(null);


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // dialog
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(null);
    const [scroll, setScroll] = React.useState(null);

    const handleClickOpen = (id, scrollType) => {
        setOpen(true);
        setId(id);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    useEffect(() => {
        // misc
        setUrl(location.state.url);
        setDatabase(location.state.database);
        setRender(true);
    }, []);

    // collections
    const renderCollections = () => {
        if(loadingCollections){
            return (
                <LinearProgress color="secondary" />
            )
        } else {
            if(submitCollections){
                return(
                    <List component="nav" aria-label="main mailbox folders"
                          subheader={
                              <ListSubheader component="div" id="nested-list-subheader">
                                  Collections
                              </ListSubheader>}>
                                {collections.data.map((item, key) => {
                                    return (
                                        <ListItem button key={key} onClick={() => {fetch(1, item.name)}}>
                                            <ListItemText primary={item.name}/>
                                        </ListItem>
                                    )
                                })}
                    </List>
                );
            } else {
                return (
                    <List component="nav" aria-label="main mailbox folders"
                          subheader={
                              <ListSubheader component="div" id="nested-list-subheader">
                                  Click to refresh
                              </ListSubheader>
                          }>
                    </List>
                );
            }
        }
    };

    // documents
    const renderDocuments = () => {
        if(loadingDocuments){
            return (
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                 <LinearProgress color="secondary" />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            )
        } else {
            if (submitDocuments) {
                return (
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        {documents.data.map((item, key) => {
                                            return (
                                                <ListItem button key={key} onClick={() => { handleClickOpen(item._id, item) }}>
                                                    {key}
                                                    <ListItemText primary={item._id} style={{ overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'}}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                );
            } else {
                return (
                    <List component="nav" aria-label="main mailbox folders">
                        <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
                            Click to refresh
                        </Typography>
                    </List>
                );
            }
        }
    };

    // fetch data from teh server
    const fetch = (value, collection) => {
        if(value === 0){
            setLoadingCollections(true);
            axios
                .post(
                    "/mongo/get/collections",
                    {url: url,
                        database: database},
                )
                .then(response => {
                    setCollections(response);
                    setLoadingCollections(false);
                    setSubmitCollections(true);
                })
                .catch(error => {
                    setLoadingCollections(false);
                });
        } else if(value === 1){
            setLoadingDocuments(true);
            axios
                .post(
                    "/mongo/find/all",
                    {url: url,
                        database: database,
                        collection: collection},
                )
                .then(response => {
                    setDocuments(response);
                    console.log(response);
                    setLoadingDocuments(false);
                    setSubmitDocuments(true)
                })
                .catch(error => {
                    console.log(error);
                    setLoadingDocuments(false);
                });
        }
    };

    // render all
    if(render) {
        return (
            <Fade in={true}>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            {database}
                        </Typography>
                        <IconButton aria-label="search" color="inherit" className={classes.refreshButton} onClick={() => {fetch(0, null)}}>
                            <RefreshIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">
                    <div className={classes.toolbarIcon}>
                        <Link to={{pathname: '/mongo/cluster/', state: {url: url}}}>
                            <IconButton className={classes.menuButton}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <Divider/>
                    {renderCollections()}
                    <Divider/>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {renderDocuments()}
                </main>
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description">
                        <DialogTitle id="scroll-dialog-title">{id}</DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}>
                                <ReactJson src={scroll} />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            </Fade>
        );
    } else {
        return(
            <div className={classes.root}>
                <CssBaseline/>
            </div>
        )
    }
}

export default Dashboard;
