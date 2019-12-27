import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright'

import { Link } from 'react-router-dom';
import SignUpStyle from '../Styles/SignUp'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(SignUpStyle);



export default function SignUp() {
    const classes = useStyles();
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [isSent, setIsSent] = useState(false);
    const [response, setResponse] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const loadProgressBar = () => {
        if(isSubmit){
            return (
                <LinearProgress color="secondary" />
            )
        }
    };

    const loadText = () => {
        if(isSent){
            return (
                <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    { /*
                    temporary implementation
                     */ JSON.stringify(response).substr(0, 50)} /
                </Typography>
                    <Link to="/signin" variant="body2">
                        Sign in
                    </Link>
                </div>
            )
        }
    };


    const submit = e => {
        setIsSubmit(true);
        e.preventDefault();
        axios
            .post(
                "/auth/signup",
                {username:  username, password: password},
            )
            .then(response => {
                console.log(response);
                try {
                    setIsSent(true);
                    setResponse(response);
                    setIsSubmit(false);
                } catch (e) {
                    console.log(e);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {loadProgressBar()}
            {loadText()}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
