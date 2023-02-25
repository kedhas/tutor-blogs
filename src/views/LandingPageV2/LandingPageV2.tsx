import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './LandingPageV2.css';
import techStacks from '../../data/lessons.json'
import { TechStack } from '../../models/Models';
import {  CardActionArea, CardMedia } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function LandingPageV2() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
	const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            kedhas
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              kedhas
            </Typography>
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography> */}
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
         <Box sx={{ width: '100%', typography: 'body1' }}>
    </Box>
        {(techStacks as TechStack[]).map(techStack =>
				(<>
					<div>
						<hr />
						<h2 className='category-title'>{techStack.catagory}</h2>
						<hr />
					</div>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {techStack.techs.map((tech) => (
              <Grid item key={tech.route} xs={12} sm={6} md={4} onClick={() => {
									navigate(`/${tech.route}`)}}>
                <Card>
                        <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={tech.image}
          alt={tech.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tech.title}
          </Typography>
        </CardContent>
      </CardActionArea>
              </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
				</>)
				)}
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}