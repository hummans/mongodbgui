import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import { Link, Redirect  } from 'react-router-dom';
import Copyright from './Copyright';

import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import 'bootstrap/dist/css/bootstrap.css'

export default class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            url: null,
            localhost: null,
            port:null,
            response: null,
            type: null
        };

    }

    componentDidMount() {
        this.setState({type:this.props.match.params.connection});
    }

    progressbar () {
        if(this.state.submit){
            return (
                <LinearProgress color="secondary" />
            )
        }
    };

    check (value){
        if(value === null){
            return ('Connection string is empty');
        } else {
            return value;
        }
    }

    submit (value, e) {
        e.preventDefault();
        this.setState({
            submit: true
        });

        if(value === 0){
            axios
                .post(
                    "/auth/check",
                    {url: this.state.url},
                )
                .then(response => {
                    this.setState({
                        submit: false,
                        render: true,
                        response: response.data.status
                    });
                    console.log(response);
                })
                .catch(error => {
                    this.setState({
                        submit: false,
                        render: true,
                        response: error
                    });
                });
        } else {
            const url = "mongodb://" + this.state.localhost + ":" + this.state.port+ "/";
            this.setState({
                url: url
            });

            console.log(url);
            axios
                .post(
                    "/auth/check",
                    {url: url},
                )
                .then(response => {
                    this.setState({
                        submit: false,
                        render: true,
                        response: response.data.status
                    });
                    console.log(response);
                })
                .catch(error => {
                    this.setState({
                        submit: false,
                        render: true,
                        response: error
                    });
                });
        }

    };

    render() {
        if (this.state.submit) {
            return (
                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    {this.progressbar()}
                    <Grid container justify="flex-start" className='mt-4'>
                        <Grid item>
                            <Link to={'/'} variant="h5">
                                <IconButton>
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Validating the string
                    </Typography>
                    <Box mt={8}>
                        <Copyright/>
                    </Box>
                </Container>
            );
        } else {
            if(this.state.response === 'ok'){
                return (
                    <Redirect to={{pathname: '/mongo/cluster', state: {url: this.state.url, type: this.state.type}}}/>
                )
            } else if (this.state.response === 'error'){
                if(this.state.type === 'mongo') {
                    return (
                        <Container component="main" maxWidth="md">
                            <CssBaseline/>
                            <Grid container justify="flex-start" className='mt-4'>
                                <Grid item>
                                    <Link to={'/'} variant="h5">
                                        <IconButton>
                                            <ChevronLeftIcon/>
                                        </IconButton>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Connection string is not valid
                            </Typography>
                            <form noValidate onSubmit={(e) => {
                                this.submit(0, e)
                            }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="text"
                                    label="URL"
                                    name="text"
                                    autoComplete="text"
                                    autoFocus
                                    onChange={e => this.setState({
                                        url: e.target.value
                                    })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary">
                                    Connect
                                </Button>
                            </form>
                            <Box mt={8}>
                                <Copyright/>
                            </Box>
                        </Container>
                    );
                } else {
                    return(
                    <Container component="main" maxWidth="md">
                        <CssBaseline/>
                        <Grid container justify="flex-start" className='mt-4'>
                            <Grid item>
                                <Link to={'/'} variant="h5">
                                    <IconButton>
                                        <ChevronLeftIcon/>
                                    </IconButton>
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Connection string is not valid
                        </Typography>
                        <form noValidate onSubmit={(e) => {
                            this.submit(1, e)
                        }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="localhost"
                                label="Localhost"
                                name="localhost"
                                autoComplete="text"
                                autoFocus
                                onChange={e => this.setState({
                                    localhost: e.target.value
                                })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="port"
                                label="Port"
                                name="port"
                                autoComplete="text"
                                autoFocus
                                onChange={e => this.setState({
                                    port: e.target.value
                                })}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Connect
                            </Button>
                        </form>
                        <Box mt={8}>
                            <Copyright/>
                        </Box>
                    </Container>
                    );
                }
            } else {
                if(this.state.type === 'mongo'){
                    return (
                        <Container component="main" maxWidth="md">
                            <CssBaseline />
                            <Grid container justify="flex-start" className='mt-4'>
                                <Grid item>
                                    <Link to={'/'} variant="h5">
                                        <IconButton>
                                            <ChevronLeftIcon />
                                        </IconButton>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Connection string
                            </Typography>
                            <form noValidate onSubmit={(e) => {
                                this.submit(0, e)
                            }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="text"
                                    label="URL"
                                    name="text"
                                    autoComplete="text"
                                    autoFocus
                                    onChange={e => this.setState({
                                        url: e.target.value
                                    })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary">
                                    Connect
                                </Button>
                            </form>
                            <Box mt={8}>
                                <Copyright />
                            </Box>
                        </Container>
                    );
                } else {
                    return (
                        <Container component="main" maxWidth="md">
                            <CssBaseline />
                            <Grid container justify="flex-start" className='mt-4'>
                                <Grid item>
                                    <Link to={'/'} variant="h5">
                                        <IconButton>
                                            <ChevronLeftIcon />
                                        </IconButton>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Localhost
                            </Typography>
                            <form noValidate onSubmit={(e) => {
                                this.submit(1, e)
                            }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="localhost"
                                    label="Localhost"
                                    name="localhost"
                                    autoComplete="text"
                                    autoFocus
                                    onChange={e => this.setState({
                                        localhost: e.target.value
                                    })}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="port"
                                    label="Port"
                                    name="port"
                                    autoComplete="text"
                                    autoFocus
                                    onChange={e => this.setState({
                                        port: e.target.value
                                    })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary">
                                    Connect
                                </Button>
                            </form>
                            <Box mt={8}>
                                <Copyright />
                            </Box>
                        </Container>
                    );
                }
            }
        }
    }
}
