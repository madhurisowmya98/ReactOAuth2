import React, { useEffect, useState } from 'react';
import { Grid, TextField, Stack, Box, Container, InputAdornment, Button, Typography, Link, Divider, Avatar, IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, Navigate, Route } from 'react-router-dom';
import axios from 'axios';
import spotifyimg from '../Images/spotifyimg2.png';
import google from '../Images/goog.png';
import facebook from '../Images/fb.png';
import git from '../Images/git.png';
import MusicPlayer from './MusicPlayer';
const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            //     return sessionStorage.clear();
            return navigate('/MusicPlayer');
        }
        else{
            sessionStorage.clear();
            // localStorage.removeItem('token');
            navigate('/');
        }
    }, [navigate]);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    // const { code } = useParams();

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleGitOauth = () => {
        // Redirect the user to the GitHub OAuth authorization URL
        window.location.href =
            'https://github.com/login/oauth/authorize' +
            '?client_id=74ea427f202e9197d3ab' + // Replace with your GitHub client ID
            '&scope=user';
            console.log('git link : ',window.location.href)

           // sessionStorage.setItem('token', githubAccessToken);
    };

    // https://github.com/login/oauth/authorize?client_id=74ea427f202e9197d3ab&scope=user

    // const PrivateRoute = ({ element, ...rest }) => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         // User is authenticated, render the protected component
    //         return <Route element={<MusicPlayer />} />;
    //     } else {
    //         // User is not authenticated, redirect to the login page
    //         return <Navigate to="/login" />;
    //     }
    // };

    const handleLogin = async () => {
        try {
            // Check if username is empty
            if (!userName) {
                setUsernameError('Username is required.');
            }

            // Check if password is empty
            if (!password) {
                setPasswordError('Password is required.');
            }

            const response = await axios.post('http://localhost:8099/user/login', { userName, password });
            const authToken = response.data.token;
        
            sessionStorage.setItem('token', authToken);
            console.log(authToken);
            alert('Login successfully');
            navigate('/MusicPlayer');
            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid username or password');
            alert('Invalid username or password');
        }
    };


    return (
        <div>
            <Container>
                <Grid container alignItems={'center'} display={'flex'} justifyContent={'center'}>
                    <Box sx={{ backgroundColor: '#50c878', borderRadius: '30px', padding: '10px', width: '350px', mt: '5px' }}>
                        <Stack direction="column" spacing={1}>

                            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <img src={spotifyimg} alt="Logo" style={{ height: '50px', width: '155px' }}></img>
                            </Box>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', justifyContent: 'center', display: 'flex', marginBottom:'10px' }}>
                                Log in to continue
                            </Typography>

                            <TextField
                                margin='normal'
                                size='small'
                                required
                                fullWidth
                                id="userName"
                                placeholder='username'
                                name='userName'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setUserName(e.target.value)}
                            ></TextField>
                            {usernameError && (
                                <p style={{ color: 'red', fontSize: '12px' }}>{usernameError}</p>
                            )}

                            <TextField
                                margin='normal'
                                required
                                size='small'
                                fullWidth
                                id="password"
                                placeholder='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                            {passwordError && (
                                <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>
                            )}

                            <Link sx={{ fontSize: '12px' }}>Reset Password</Link>

                            <Grid container item>
                                <Grid item xs={10} sm={10} display={'flex'} alignItems={'center'}>
                                    <Typography>Remember me</Typography>
                                </Grid>
                                <Grid item xs={2} sm={2}>
                                    <Switch {...label} />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, borderRadius: '30px' }}
                                onClick={handleLogin}
                            >
                                Sign In
                            </Button>
                            {errorMessage && (
                                <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</p>
                            )}

                            <Divider>OR</Divider>

                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '30px',
                                    borderColor: 'black',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    padding: '10px',
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={facebook}
                                    sx={{ width: 24, height: 24 }}
                                />
                                <span style={{ textTransform: 'none', marginLeft: '50px', color: 'black' }}>
                                    Continue with Facebook
                                </span>
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '30px',
                                    borderColor: 'black',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    padding: '10px',
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={google}
                                    sx={{ width: 24, height: 24 }}
                                />
                                <span style={{ textTransform: 'none', marginLeft: '60px', color: 'black' }}>
                                    Continue with Google
                                </span>
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={handleGitOauth}
                                sx={{
                                    borderRadius: '30px',
                                    borderColor: 'black',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    padding: '10px',
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={git}
                                    sx={{ width: 24, height: 24 }}
                                />
                                
                                <span style={{ textTransform: 'none', marginLeft: '70px', color: 'black' }}>
                                    Continue with Git
                                </span>
                            </Button>
                            {/* 
                            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <p>
                                    Don't have an account?{" "}
                                    <span onClick={handleSignUpClick}>SI
                                    
                                    
                                    
                                    GNUP</span>
                                    <Link>SIGNUP</Link>
                                </p>
                            </Box> */}



                            <Link sx={{ fontSize: '14px', justifyContent: 'center', textDecoration: 'none', alignItems: 'center', display: 'flex' }}>SETTINGS</Link>

                        </Stack>
                    </Box>
                </Grid>
            </Container>
        </div>
    );
};

export default LoginPage;
