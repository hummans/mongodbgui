import React, {Component} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideBar from './SideBar';
import FindAll from './FindAll';
import Button from "@material-ui/core/Button";
import 'bootstrap/dist/css/bootstrap.css'
import About from "./About";

import { Route } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    createButton: {
        marginTop: '0.5rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem'
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    appBarColor: {
        background : '#1976d2'
    },
    marginLeft: {
        marginLeft : 2
    },
}));
var Auth = {username: 'root', password: '1234', cluster: 'cluster0-cgtwf', database: 'sample'};

function View() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [collection, setCollection] = React.useState(false);
    const [collectionName, setCollectionName] = React.useState('NULL');

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleToUpdate = (someArg) => {
        setCollection(true);
        setCollectionName(someArg);
    };

    const documentName = (someArg) => {
        alert(someArg);
       return  <Route path="/about" component={About} exact/>;
    };

    const resetCollection = () => {
        setCollection(false);
    };


    const appBar = () => {
        return (
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        NoSQL Editor
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <SettingsIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <GitHubIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    };

    const drawerContainer = () => {
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Button variant="contained" color="primary" disableElevation className={clsx(classes.createButton, !open && classes.menuButtonHidden)}>
                    Create new Collection
                </Button>
                <SideBar credentials = {Auth} handleToUpdate={handleToUpdate.bind(this)} />
                <Divider />
            </Drawer>
        )
    };

    const mainContainer = () => {
        if(collection){
            var Auth = {username: 'root', password: '1234', cluster: 'cluster0-cgtwf', database: 'sample', collection: collectionName};
            console.log(Auth[1]);
            console.log(Auth.collectionName);
            return (
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Grid item xs={12}>
                                        <Toolbar>
                                            <Typography variant="h6" className={classes.title}>
                                                {Auth.collection}
                                            </Typography>
                                            <Button variant="contained" color="primary" className='mr-2' >INSERT</Button>
                                            <Button  variant="contained" color="secondary" onClick={() => {resetCollection()}}>CLOSE</Button>

                                        </Toolbar>
                                        <Paper className={classes.paper}>
                                            <FindAll credentials = {Auth} documentName={documentName.bind(this)}/>
                                        </Paper>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            )
        } else {
            return (
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    Some text
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            )
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            {appBar()}
            {drawerContainer()}
            {mainContainer()}
        </div>
    );
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='App'>
                <View />
            </div>
        );
    }
}

export default Dashboard;

