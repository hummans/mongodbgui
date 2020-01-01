import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "./Copyright";
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const setHeader = (value) => {
    document.title = value;
};

export default function GettingStarted() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                {setHeader("Mongo Admin")}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Getting started
                        </Typography>

                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Grid item key={1} xs={12} sm={6} md={6}>

                            <Card className={classes.card}>
                                <Link to="/mongo">
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://techcrunch.com/wp-content/uploads/2016/06/2016-06-27_1940.png?w=730&crop=1"
                                        title="Connect to mongoDB Atlas"
                                    />
                                </Link>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2" className='text-center'>
                                        mongoDB Atlas
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={6}>
                            <Card className={classes.card}>
                                <Link to="/localhost">
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_67ca76b838ccc825744ac14749a368df/mongodb-atlas.jpg"
                                        title="Connect to Localhost"
                                    />
                                </Link>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2" className='text-center'>
                                        Localhost
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}
