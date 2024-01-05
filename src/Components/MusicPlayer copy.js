import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Paper, Stack, Typography, Tabs, Tab, AppBar } from '@mui/material';
import axios from 'axios';
import image2 from '../Images/thegetup.jpg';
import Nalo from '../songslist/Nalo.mp3';
import image3 from '../Images/morning.jpg';
import { useMediaQuery } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';

import AudioPlayer from 'mui-audio-player';

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


  const gridStyle = {
    backgroundColor: '#33363D',
    color: 'white',

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
  // const isMobile = false; // Replace with your logic to detect mobile devices
  const containerRef = React.useRef();

  // const navigate = useNavigate();
  const { code } = useParams();

  ;

  const songs = [
    {
      // image : `url(${image2})`,
      image: '../Images/sleep.jpg',
      title: 'Nalo',
      // source: 'songslist/Nalo.mp3',
      source: require('../songslist/Nalo.mp3'), // Import the song using `require`   
    },
    {
      image: '../Images/sleep.jpg',
      title: 'Oo madhu',
      source: 'path/to/song2.mp3',
    },
    {
      image: '../Images/sleep.jpg',
      title: 'aaduvari matalaku',
      source: 'path/to/song1.mp3',
    },
    {
      image: '../Images/sleep.jpg',
      title: 'maya bazar',
      source: 'path/to/song2.mp3',
    },
    {
      image: '../Images/sleep.jpg',
      title: 'ninnu kori',
      source: 'path/to/song1.mp3',
    },
    {
      image: '../Images/sleep.jpg',
      title: 'karigeloga ee kshanam',
      source: 'path/to/song2.mp3',
    },
    {
      image: '../Images/sleep.jpg',
      title: 'maine pyar kiya',
      source: 'path/to/song1.mp3',
    },


    {
      image: '../Images/sleep.jpg',
      title: 'annayya',
      source: 'path/to/song1.mp3',
    },

    // Add more songs here
  ];

  const [currentSong, setCurrentSong] = useState(null);
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
    if (code) {
      axios.post('http://localhost:8099/exchangeCodeForAccessToken', { code: codeno })
        .then((response) => {
          const accessToken = response.data.access_token;
          localStorage.setItem('githubAccessToken', accessToken);
          console.log('GitHub OAuth successful. Access Token:', accessToken);

        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development" && error) {
            // ignore the error
            console.log(error.message);
          }
          console.error('GitHub OAuth failed:', error);

        });

    }
  };

  useEffect(() => {
    handleOauth();

  }, []);




  return (
    <div style={backgroundStyle}>
      <Container maxWidth='lg' >
        <Grid container spacing={0.5} mb={8.5} mt={1}  >

          {/* Grid 1 */}
          <Grid item xs={12} sm={3} >
            <Stack direction="column" sx={{ justifyContent: 'flex-start' }}>
              <Paper sx={{ ...gridStyle, padding: '5px', marginBottom: '4px', height: '50px' }}>
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
                      <Grid container item p={1}>
                        <Grid item xs={2} sm={2} >
                          <Box>
                            <img src={song.image} alt={song.title} style={{ width: '100%', height: '100%' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={8} sm={8} height="50px" mt={-2} pl={1}>
                          <p>{song.title}</p>
                        </Grid>
                        <Grid item xs={2} sm={2} pr={1}>
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
          <Grid item xs={12} sm={6} >
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
                      <img src={image3} alt="Logo" style={imageStyle}></img>
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
                      <img src={image3} alt="Logo" style={imageStyle}></img>
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
          <Grid item xs={12} sm={3}   >
            <Box component={Paper}
              sx={{
                ...gridStyle,
                alignItems: 'center',
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                height: '80%',
                overflowX: 'auto', // Enable horizontal scrollbar when content overflows horizontally
                overflowX: { xs: 'auto' },
              }}
              ref={containerRef}


            >
              <Typography>Pop Mix</Typography>

              {/* <Stack sx={{direction:ss ? 'column' : 'row'}} > */}
              <img src={image3} alt="Logo" style={PopMixStyle}></img>
              <img src={image3} alt="Logo" style={PopMixStyle}></img>
              <img src={image3} alt="Logo" style={PopMixStyle}></img>
              {/* <img src={image3} alt="Logo" style={PopMixStyle}></img> */}
              {/* <img src={image3} alt="Logo" style={PopMixStyle}></img>
              <img src={image3} alt="Logo" style={PopMixStyle}></img> */}
              {/* </Stack> */}
            </Box>
          </Grid>
        </Grid>
        <AppBar position="fixed" sx={{ ...gridStyle, top: 'auto', bottom: 0 }}>
          {currentSong && (
            <Grid container item>
              <Grid item xs={4} sm={3} md={4} pl={2}>
                <h4>{currentSong.title}</h4>
              </Grid>
              <Grid item xs={6} sm={8} md={7} pr={2} mt={1}>
                <audio
                  ref={audioRef} // Attach the audio element reference
                  controls
                  autoPlay={isPlaying}
                  style={{ width: '100%', height: '40px' }}
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
