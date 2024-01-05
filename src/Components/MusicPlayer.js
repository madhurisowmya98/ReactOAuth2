import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Paper, Stack, Typography, Tabs, Tab, AppBar } from '@mui/material';
import axios from 'axios';
import image2 from '../Images/thegetup.jpg';
import image3 from '../Images/morning.jpg';
import { useMediaQuery } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const MusicPlayer = () => {


  //  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  //  useEffect(() => {
  //      const handleResize = () => {
  //          setIsMobile(window.innerWidth <= 768);
  //      };
  //      window.addEventListener('resize', handleResize);
  //      return () => window.removeEventListener('resize', handleResize);
  //  }, []);


  const backgroundStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    // backgroundColor: 'white',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#060202'
  };

  const isMobile = useMediaQuery('(max-width: 786px)');

  // const isMobile = false; // Replace with your logic to detect mobile devices
  const containerRef = React.useRef();


  const gridStyle = {
    backgroundColor: '#33363D',
    color: 'white'
  };

  const imageStyle = {
    height: '55%',
    width: '20%',
    padding: '10px',
  };

  const rectStyle = {

    backgroundColor: "#060202",
    display: 'flex',
    alignItems: 'center',
    margin: '5px',
    color: 'white'
  };

  const SquareStyle = {
    backgroundColor: "#060202",
    color: 'white',
    margin: '5px',
  };

  const SqimageStyle = {
    height: '55%',
    width: '55%',
    padding: '10px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'

  };
  const PopMixStyle = {
    height: '80%',
    width: '80%',
    // padding: '10px',
  };


  const tabStyles = {
    fontFamily: 'Arial, sans-serif', // Change the font family here
    // fontWeight: 'bold',            // Adjust other font properties as needed
    fontSize: '10px',
    color: 'white',
    // Adjust the font size as needed
    height:"10px"
  };

  const paperStyle = {
    backgroundColor: "black",
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '10px',
    borderRadius: '25px',
    m: '5px'

  };


  const songs = [
    {
      // image : `url(${image2})`,
      image: require('../Images/sleep.jpg'),
      title: 'Kalyaname Vibogame',
      source: require('../songslist/KalyanameVibogame.mp3'), // Import the song using `require`  
      // myreactapp\src\songslist\KalyanameVibogame.mp3 
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Mahonathuda',
      source: require('../songslist/Mahonathuda.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Naan Endru Solla',
      source: require('../songslist/NaanEndruSolla.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Ne Dayalo',
      source: require('../songslist/NeDayalo.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Nee Dayalo Nenunna',
      source: require('../songslist/NeeDayaloNenunna.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Raja Nee SannidhiLone',
      source: require('../songslist/RajaNeeSannidhiLoneVuntanayya.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Yehova Naa Balama',
      source: require('../songslist/YehovaNaaBalama.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Yehova Na Mora Lalinchenu',
      source: require('../songslist/YehovaNaMoraLalinchenu.mp3'),
    },
    {
      image: require('../Images/sleep.jpg'),
      title: 'Yehova Needhu Memlulanu',
      source: require('../songslist/YehovaNeedhuMemlulani.mp3'),
    },
    // {
    //   image: require('../Images/sleep.jpg'),
    //   title: 'Yehova Nee Namamu',
    //   source: require('../songslist/YehovaNeeNamamu.mp3'),
    // }

    // Add more songs here
  ];

  const [currentSong, setCurrentSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());


  const playSong = (song) => {
    if (currentSong === song && isPlaying) {
      // If the same song is playing, pause it
      pauseSong();
    } else {
      // Load and play the selected song
      audioRef.current.src = song.source;
      audioRef.current.play();
      setCurrentSong(song);
      setIsPlaying(true);

    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  


  const [selectedtab, setSelectedTab] = React.useState(0);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };



  const handleOauth = () => {

    const code = new URLSearchParams(window.location.search);
    const codeno = code.get('code');
    console.log("2 code", code);
    console.log("3 codeno", codeno);
    if (codeno != null) {
      axios.post('http://localhost:8099/exchangeCodeForAccessToken', { code: codeno })
        .then((response) => {
          const accessToken = response.data.access_token;
          localStorage.setItem('githubAccessToken', accessToken);
          sessionStorage.setItem('githubAccessToken', accessToken);
          console.log('GitHub OAuth successful. Access Token:', accessToken);
        })
        .catch((error) => {
          console.error('GitHub OAuth failed:', error);
        });
    }
  };


  // const checktoken = () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     // Redirect the user to the login page if not authenticated
  //     return <Navigate to="/login" />;
  //   }
  // };

  useEffect(() => {
    handleOauth();
    if (sessionStorage.getItem('token')) {
      //     return sessionStorage.clear();
      navigate('/MusicPlayer');
      // }
      // const disableBackButton = () => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href);
      };
    };

    // disableBackButton();

  }, []);

  const navigate = useNavigate();

  const logOutMethod = () => {
    console.log("logout hit");
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <div style={backgroundStyle}> 

      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '30px' : '10px',
        // padding: '10px',
        marginLeft: '15px',
        position: 'absolute',
        top: '60px',
        left: '0px',
        transform: 'translate(-50%, -50%)'
      }}
      >
        < LockOutlinedIcon fontSize='lg' sx={{ color: 'white' }} onClick={logOutMethod} />
      </Box>

      <Container maxWidth='lg'>
        <Grid container spacing={0.5} mb={6} mt={1}>
          {/* Grid 1 */}
          <Grid item xs={12} sm={3} md={3}>
            <Stack direction="column" spacing={0.5} sx={{ justifyContent: 'flex-start' }} >
              <Paper sx={{ ...gridStyle, padding: '5px' }}>
                <Typography variant='p' sx={{ display: 'flex', alignItems: 'center' }}>  <HouseIcon fontSize='small' />Home</Typography>
                <Typography variant='p' sx={{ display: 'flex', alignItems: 'center' }}>  <SearchIcon fontSize='small' />Search</Typography>
              </Paper>

              <Paper style={{ ...gridStyle }}>
                <Typography>Your Library</Typography>

                <Tabs
                  // selectedtab={selectedtab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  sx={{ ...tabStyles }}

                >
                  <Paper sx={{ ...paperStyle }} >
                    <Tab label="Item One" sx={{ ...tabStyles }} />
                  </Paper>

                  <Paper sx={{ ...paperStyle }}>
                    <Tab label="Item Two" sx={{ ...tabStyles }} />
                  </Paper>
                  <Paper sx={{ ...paperStyle }}>
                    <Tab label="Item Three" sx={{ ...tabStyles }} />
                  </Paper>
                  <Paper sx={{ ...paperStyle }}>
                    <Tab label="Item Four" sx={{ ...tabStyles }} />
                  </Paper>
                  <Paper sx={{ ...paperStyle }}>
                    <Tab label="Item Five" sx={{ ...tabStyles }} />
                  </Paper>
                  <Paper sx={{ ...paperStyle }}>
                    <Tab label="Item Six" sx={{ ...tabStyles }} />
                  </Paper>
                  <Paper sx={{ ...paperStyle }}>
                    <Tab label="Item Seven" sx={{ ...tabStyles }} />
                  </Paper>

                </Tabs>
                <div className="playlist">
                  {songs.map((song, index) => (
                    <div key={index} className="song">
                      <Grid container item spacing={1} p={1}>
                        <Grid item xs={2} sm={2} pl={1} >
                          <Box>
                            <img src={song.image} style={{ width: '100%', height: '100%' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={8} sm={8} height="50px" mt={-2.5} pl={1}>
                          <h6> {song.title}</h6>
                        </Grid>
                        <Grid item xs={2} sm={2} ml={-1} >
                          <Stack direction="column" sx={{ justifyContent: 'flex-end' }}>
                            <button onClick={() => playSong(song)}>
                              {currentSong === song && isPlaying ? 'Pause' : 'Play'}
                            </button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>
              </Paper>
            </Stack>
          </Grid>

          {/* Grid 2 */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper elevation={2} style={{ ...gridStyle }}>


              <Grid container item p={1} >
                <Typography>Good Morning</Typography>
                <Grid item xs={12} sm={12} md={12} >
                  <Stack spacing={2} direction="row">
                    <Box style={rectStyle}>
                      <img src={image2} alt="Logo" style={imageStyle}></img>
                      <Typography>yogi</Typography>
                    </Box>

                    <Box style={rectStyle}>
                      <img src={image2} alt="Logo" style={imageStyle}></img>
                      <Typography>yogi</Typography>
                    </Box>

                    <Box style={rectStyle}>
                      <img src={image2} alt="Logo" style={imageStyle}></img>
                      <Typography>yogi</Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={12} md={12} >
                  <Stack spacing={2} direction="row" mb={2}>
                    <Box style={rectStyle}>
                      <img src={image2} alt="Logo" style={imageStyle}></img>
                      <Typography>yogi</Typography>
                    </Box>

                    <Box style={rectStyle}>
                      <img src={image2} alt="Logo" style={imageStyle}></img>
                      <Typography>yogi</Typography>
                    </Box>

                    <Box style={rectStyle}>
                      <img src={image2} alt="Logo" style={imageStyle}></img>
                      <Typography>yogi</Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Typography>Recently Played</Typography>
                <Grid container item alignItems={'center'} mb={2}>
                  <Grid item xs={12} sm={12} md={12} >
                    <Stack spacing={1} direction="row">

                      <Paper elevation={5} style={SquareStyle} >
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>getup</Typography>
                      </Paper>

                      <Paper elevation={5} style={SquareStyle}>
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>sleep</Typography>
                      </Paper>

                      <Paper elevation={5} style={SquareStyle}>
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>morning</Typography>
                      </Paper>

                      <Paper elevation={5} style={SquareStyle}>
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>morning</Typography>
                      </Paper>

                    </Stack>
                  </Grid>
                </Grid>

                <Typography>Your Top Mixes</Typography>
                <Grid container item >
                  <Grid item xs={12} sm={12} md={12} >
                    <Stack spacing={1} direction="row">

                      <Paper elevation={5} style={SquareStyle} >
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>getup</Typography>
                      </Paper>

                      <Paper elevation={5} style={SquareStyle}>
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>sleep</Typography>
                      </Paper>

                      <Paper elevation={5} style={SquareStyle}>
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>morning</Typography>
                      </Paper>

                      <Paper elevation={5} style={SquareStyle}>
                        <img src={image2} alt="Logo" style={SqimageStyle}></img>
                        <Typography>morning</Typography>
                      </Paper>

                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>



          {/* Grid 3 */}
          <Grid item xs={12} sm={3} md={3}  >
            <Box component={Paper}
              sx={{
                ...gridStyle,
                alignItems: 'center',
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                // height: '80%',
                overflowX: 'auto', // Enable horizontal scrollbar when content overflows horizontally
                overflowX: { xs: 'auto' },
              }}
              ref={containerRef}
            >
              <Typography>Pop Mix</Typography>

              {/* <Stack sx={{direction:ss ? 'column' : 'row'}} > */}
              <img src={image3} alt="Logo" style={PopMixStyle}></img>
              <img src={image3} alt="Logo" style={PopMixStyle}></img>
              {/* <img src={image3} alt="Logo" style={PopMixStyle}></img> */}
              {/* <img src={image3} alt="Logo" style={PopMixStyle}></img> */}
              {/* <img src={image3} alt="Logo" style={PopMixStyle}></img>
              <img src={image3} alt="Logo" style={PopMixStyle}></img> */}
              {/* </Stack> */}
            </Box>
          </Grid>
        </Grid>


        <AppBar position="fixed"
          sx={{
            backgroundColor: '#33363D',
            color: 'white',
            top: 'auto',
            bottom: 0,
            // minHeight: "5vh"
          }}>
          {currentSong && (
            <Grid container item Border='1px' borderRadius='30px'>
              <Grid item xs={4} sm={2} md={2}
                sx={{
                  // marginTop: "4px",
                  // backgroundColor: "red",
                  height: '40px',

                }}>
                <Stack
                  // backgroundColor="yellow"
                  direction={'row'}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  spacing={1}
                  alignItems={'center'}>
                  <img src={currentSong.image} style={{ width: '45px', height: '40px' }} />
                  <h6>{currentSong.title}</h6>
                </Stack>
              </Grid>

              <Grid item xs={7} sm={9} md={9} pr={2} mt={0.5}>
                {/* <audio
                  ref={audioRef} // Attach the audio element reference
                  controls
                  autoPlay={isPlaying}
                  style={{ width: '100%', height: '40px' }}
                ></audio> */}
                <audio
                  key={currentSong.title} // Add a unique key
                  ref={audioRef}
                  controls
                  autoPlay={isPlaying}
                  style={{ width: '100%', height: '40px' }}
                  // src={currentSong.source}
                ></audio>
              </Grid>

              <Grid item xs={1} sm={1} md={1} mt={2}>
                <button onClick={isPlaying ? pauseSong : resumeSong}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              </Grid>
            </Grid>
          )}
        </AppBar>

      </Container>
    </div>
  );
};

export default MusicPlayer;
