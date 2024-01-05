import React, { useState } from 'react';
import { Grid, TextField, Stack, Box, Container, InputAdornment, Button, Typography, Link, Divider, Avatar, IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import spotifyimg from '../Images/spotifyimg2.png';
// import google from '../Images/Googleimg.png';
// import facebook from '../Images/facebook.png';
// import git from '../Images/gitimg.png';


const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    // const navigate = useNavigate();
    // const { code } = useParams();

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

   

    const handleSignUp = async () => {
        try {
            // Check if username is empty
            if (!userName) {
                setUsernameError('Username is required.');
            }

            // Check if password is empty
            if (!password) {
                setPasswordError('Password is required.');
            }
            

            const response = await axios.post('http://localhost:8099/user/save', { userName, password });

            // localStorage.setItem('token', authToken);
            // console.log(authToken);
            // alert('Login successfully');
            // navigate('/MusicPlayer');
            // console.log('Registered successful');
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
                    <Box sx={{ backgroundColor: '#98FB98', borderRadius: '30px', padding: '10px', width: '350px', mt: '5px' }}>
                        <Stack direction="column" spacing={1}>

                            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <img src={spotifyimg} alt="Logo" style={{ height: '50px', width: '155px' }}></img>
                            </Box>
                           
                            <Typography variant='h5' sx={{ fontWeight: 'bold', justifyContent: 'center', display: 'flex' , }}>
                                Create an Account
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
                            
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, borderRadius: '30px' }}
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                            {errorMessage && (
                                <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</p>
                            )}

                        </Stack>
                    </Box>
                </Grid>
            </Container>
        </div>
    );
};

export default SignUp;
