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
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';

import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";

import RefreshIcon from '@material-ui/icons/Refresh';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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

const validate = require('jsonschema').validate;

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
    databaseTitle: {
        flexGrow: 1,
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
    const [collection, setCollection] = useState(null);


    // collections
    const [submitCollections, setSubmitCollections] = useState(false);
    const [loadingCollections, setLoadingCollections] = useState(false);
    const [collections, setCollections] = useState(null);

    // documents
    const [submitDocuments, setSubmitDocuments] = useState(false);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [documents, setDocuments] = useState(null);

    // dialog new collection
    const [openCollection, setOpenCollection] = React.useState(false); // state
    const [newCollection, setNewCollection] = React.useState(null);
    const [submitNewCollection, setSubmitNewCollection] = useState(false);

    // dialog open row
    const [openRow, setOpenRow] = React.useState(false); // dialog state

    // dialog new document
    const [openNewDocument, setOpenNewDocument] = React.useState(false); // state
    const [newDocument, setNewDocument] = React.useState(null); // document data
    const [submitNewDocument, setSubmitNewDocument] = useState(false); // is submit

    const [id, setId] = React.useState(null);
    const [scroll, setScroll] = React.useState(null);

    const handleClickOpenRow = (id, scrollType) => {
        setOpenRow(true);
        setId(id);
        setScroll(scrollType);
    };

    const handleClickCloseRow = () => {
        setOpenRow(false);
    };

    const handleClickOpenCollection = () => {
        setOpenCollection(true);
    };

    const handleClickCloseCollection = () => {
        setOpenCollection(false);
    };

    const handleClickOpenNewDocument = () => {
        setOpenNewDocument(true);
    };

    const handleClickCloseNewDocument = () => {
        setOpenNewDocument(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openRow) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openRow]);

    React.useEffect(() => {
        if (openCollection) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openCollection]);

    React.useEffect(() => {
        if (openNewDocument) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openCollection]);

    useEffect(() => {
        // misc
        setUrl(location.state.url);
        setDatabase(location.state.database);
        setRender(true);
    }, []);

    useEffect(() => {
        console.log(render);
        if(render){
            fetch(0, null);
            console.log('get');
        }
    }, []);

    const isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

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
                                            <ListItemText primary={item.name} />
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
                                        <ListItem button key={0}>
                                            <ListItemText primary={"Create new document"} style={{ overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'}} onClick={() => {handleClickOpenNewDocument()}} />
                                            <ListItemSecondaryAction aria-disabled={"true"}>
                                                <IconButton edge="end" aria-label="delete">
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        {documents.data.map((item, key) => {
                                            return (
                                                <ListItem button key={key+1} onClick={() => { handleClickOpenRow(item._id, item) }}>
                                                    <ListItemText primary={key +  " " +   item._id} style={{ overflow: 'hidden',
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

    const renderDialogProgressBar = () => {
        if (submitNewCollection) {
            return (
                <LinearProgress color="secondary" />
            );
        }
    };

    const renderDialogNewDocumentProgressBar = () => {
        if (submitNewDocument) {
            return (
                <LinearProgress color="secondary" />
            );
        }
    };


    // fetch data from teh server
    const fetch = (value, data) => {
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
            setCollection(data);
            setLoadingDocuments(true);
            axios
                .post(
                    "/mongo/find/all",
                    {url: url,
                        database: database,
                        collection: data},
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
        }  else if(value === 2){
            setSubmitNewCollection(true);
            axios
                .post(
                    "/mongo/create/collection",
                    {url: url,
                        database: database,
                        collection: data},
                )
                .then(response => {
                    console.log(response);
                    setSubmitNewCollection(false);
                    setOpenCollection(false);
                })
                .catch(error => {
                    console.log(error);
                    setSubmitNewCollection(false);
                    setOpenCollection(false);
                });
        } else if(value === 3){
            if(isJson(data)){
                setSubmitNewDocument(true);
                axios
                    .post(
                        "/mongo/insert/one",
                        {url: url,
                            database: database,
                            collection: collection,
                            document: data},
                    )
                    .then(response => {
                        console.log(response);
                        setSubmitNewDocument(false);
                        setOpenNewDocument(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setSubmitNewDocument(false);
                        setOpenNewDocument(false);
                    });
            } else {
                setSubmitNewDocument(false);
            }

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
                        <Typography variant="h6" noWrap className={classes.databaseTitle}>
                            {database}
                        </Typography>
                        <IconButton aria-label="search" color="inherit" className={classes.refreshButton} onClick={() => {fetch(0, null)}}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton aria-label="search" color="inherit" className={classes.refreshButton} onClick={() => {handleClickOpenCollection()}}>
                            <AddCircleOutlineIcon />
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
                        open={openRow}
                        onClose={handleClickCloseRow}
                        fullWidth={true}
                        maxWidth={"md"}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description">
                        <DialogTitle id="scroll-dialog-title">{id}</DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}>
                                Enter content name
                            </DialogContentText>

                            <ReactJson src={scroll} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickCloseRow} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openCollection}
                        fullWidth={true}
                        maxWidth={"sm"}
                        onClose={handleClickCloseCollection}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description">
                        {renderDialogProgressBar()}
                        <DialogTitle id="scroll-dialog-title">Create new collection</DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}>

                                asdasdasdas
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Collection"
                                type="text"
                                fullWidth
                                onChange={e => setNewCollection(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => {fetch(2, newCollection)}}>
                                Add
                            </Button>
                            <Button onClick={handleClickCloseCollection} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openNewDocument}
                        fullWidth={true}
                        maxWidth={"sm"}
                        onClose={handleClickCloseNewDocument}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description">
                        {renderDialogNewDocumentProgressBar()}
                        <DialogTitle id="scroll-dialog-title">Create new document</DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}>

                                asdasdasdas
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Collection"
                                type="text"
                                fullWidth
                                onChange={e => setNewDocument(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={() => {fetch(3, newDocument)}}>
                                Add
                            </Button>
                            <Button onClick={handleClickCloseNewDocument} color="primary">
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
