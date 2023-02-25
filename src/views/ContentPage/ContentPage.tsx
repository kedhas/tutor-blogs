
import { Fragment, useEffect, useRef, useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SubTopic, Topic } from '../../models/Models';
import ListItemButton from '@mui/material/ListItemButton';
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import DynamicHTML from "../../Components/DynamicHTML";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function ContentComponent() {
  const { heading, subHeading } = useParams();
  const [data, setData] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic>({} as Topic);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic>({} as SubTopic);
  const [activeSubTopicIndex, setActiveSuInbtopicIndex] = useState<number>(0);
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [menuExpanded, setMenuExpanded] = useState<boolean>(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLInputElement>(null);

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await fetch(`/data/${heading}.json`);
        const courseJson = await response.json();
        // console.log('courseJson ', courseJson)
        setData(courseJson);
      } catch (error) {
        console.error(error);
      }
      focusOnContentTop();
    };

    fetchHTML();
  }, [heading]);


  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getLeftMenu = () => {
    const course = heading || ''
    return (
      <div className="menu">
        {!!data?.length && data.map((topic, topicIndex: number) => (
          <div key={topic.title}>
            {topic.fileName ?
              <div className="heading1-link" key={topic.title}
                onClick={() => {
                  setActiveTopic(topic);
                  navigate(`/${course}/${topic.fileName}`)
                }}><b><i>{topic.title}</i></b>
              </div>
              : <div className="heading1-nolink" key={topic.title}><b><i>{topic.title}</i></b></div>}
            <Fragment>
              {!!topic?.subTitles?.length && topic.subTitles.map((subTopic: SubTopic, subtopIndex: number) => (
                <ListItemButton key={subTopic.fileName + subtopIndex}
                  className={`heading2-link ${activeSubTopic === subTopic ? "active" : ""}`}
                  onClick={() => {
                    setActiveTopic(topic);
                    setActiveSubTopic(subTopic);
                    setActiveTopicIndex(topicIndex)
                    setActiveSuInbtopicIndex(subtopIndex);
                    navigate(`/${course}/${subTopic.fileName}`);
                    focusOnContentTop();
                  }}>
                  <Link color="primary" to="#" onClick={preventDefault}>
                    {subTopic.displayName}
                    {/* <p className="ow-break-word">
                      {subTopic.displayName}
                    </p> */}
                  </Link>
                </ListItemButton>)
              )}
            </Fragment>
            <Divider sx={{ my: 1 }} />
          </div >
        ))
        }
      </div >
    );
  }

  const getContent = () => {
    console.log(`course ${heading || ''} topic ${subHeading || 'index'}`)

    return (
      <div>
        <div ref={containerRef}>
        </div>
        <div >
          <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
        </div>
      </div>)
  };

  const navigateLesson = (next = true) => {
    const course = heading || ''
    console.log(next)
    console.log('activeTopicIndex ', activeTopicIndex)
    console.log('activeSubTopicIndex ', activeSubTopicIndex)
    let topicIx = 0;
    let subTopicIx = 0;

    if (next && activeSubTopicIndex === data[activeTopicIndex].subTitles.length - 1) {
      console.log(`case if`)
      topicIx = activeTopicIndex + 1;
      subTopicIx = 0;
    } else if (!next && activeSubTopicIndex === 0) {
      console.log(`case if else`)
      topicIx = activeTopicIndex - 1;
      subTopicIx = data[topicIx].subTitles.length - 1;
    } else {
      console.log(`case else`)
      topicIx = activeTopicIndex;
      subTopicIx = activeSubTopicIndex + (next ? 1 : -1);
    }
    setActiveTopicIndex(topicIx);
    setActiveSuInbtopicIndex(subTopicIx);
    setActiveTopic(data[topicIx]);
    setActiveSubTopic(data[topicIx].subTitles[subTopicIx]);
    navigate(`/${course}/${data[topicIx].subTitles[subTopicIx].fileName}`)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Button style={{ marginRight: '25px' }}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <Link to={`/`}><FontAwesomeIcon icon={faHome} /></Link>
              </Typography>
            </Button>
            <Button style={{ marginRight: '5px' }} onClick={() => {
              focusOnContentTop();
              navigateLesson(false);
            }}>
              <Typography
                component="h1"
                variant="h6"
                color="black"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <Link to="#">
                  {!(activeSubTopicIndex === 0 && activeTopicIndex === 0) &&
                    <><FontAwesomeIcon icon={faArrowLeft} /><span></span></>}
                </Link>
              </Typography>
            </Button>
            <Button onClick={() => {
              focusOnContentTop();
              navigateLesson(true);
            }}>
              <Typography
                component="h1"
                variant="h6"
                color="black"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <Link to="#">
                  {!(activeSubTopicIndex === activeTopic?.subTitles?.length - 1 && activeTopicIndex === data.length - 1)
                    && <><span></span> <FontAwesomeIcon icon={faArrowRight} /></>}
                </Link>
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {getLeftMenu()}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {getContent()}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );

  function focusOnContentTop() {
    containerRef.current?.focus();
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function ContentPage() {
  return <ContentComponent />;
}