import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import StarsIcon from '@mui/icons-material/Stars';
import HomeIcon from '@mui/icons-material/Home';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import { Link } from "react-router-dom";
import SupportIcon from '@mui/icons-material/Support';
import QuoteGenerator from './QuoteBox';
import TextUp from '../../img/TextUp.png';

export default function TemporaryDrawer({image, setImage}) {

  React.useEffect(() => {
    fetch("https://textup-backend.onrender.com/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      });
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home','Profile', ('Sign In')].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {index / 1 === 0 ? <Link to="/" style={{color:'#000000'}}><HomeIcon style={{fontSize:'1.7rem'}}/></Link> : index / 1 === 1 ? <Link to="/profile" style={{color:'#000000'}}><AccountCircleIcon style={{fontSize:'1.7rem'}}/></Link> : <Link to="/login" style={{color:'#000000'}}><LoginIcon style={{fontSize:'1.7rem'}}/></Link>}
              </ListItemIcon>
              {index / 1 === 0 ?
              <Link to="/" style={{textDecoration:'none'}}> 
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link> :
              index / 1 === 1 ?
              <Link to="/profile" style={{textDecoration:'none'}}>
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link>:
              <Link to="/login" style={{textDecoration:'none'}}>
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link>
               }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Contact us','About us', 'Help & Support', 'Feedback',].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton >
              <ListItemIcon>
              {index / 1 === 0 ? <Link to="/contact" style={{color:'#000000'}}><MailIcon style={{fontSize:'1.7rem'}} /></Link> : index / 1 === 1 ? <Link to="/about" style={{color:'#000000'}}><InfoIcon style={{fontSize:'1.7rem'}} /></Link> : index / 2 === 1 ? <Link to="/helpInfo" style={{color:'#000000'}}><SupportIcon style={{fontSize:'1.7rem'}}/></Link> : <Link to="/feedback" style={{color:'#000000'}}><StarsIcon style={{fontSize:'1.7rem'}}/></Link>}
              </ListItemIcon>
              {index / 1 === 0 ?
              <Link to="/contact" style={{textDecoration:'none'}}>
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link> :
              index / 1 === 1 ?
              <Link to="/about" style={{textDecoration:'none'}}>
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link>:
              index / 1 === 2 ?
              <Link to="/helpInfo" style={{textDecoration:'none'}}>
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link>:
              <Link to="/feedback" style={{textDecoration:'none'}}>
              <p style={{color:'#000000', fontWeight:'bold', marginTop:'-.2rem', marginBottom:'0rem'}}>{text}</p>
              </Link>
              }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{backgroundco:'transperent', display:'flex', justifyContent:'flex-start', color:'#fff', position:'absolute', margin:".5rem 0"}} onClick={toggleDrawer(anchor, true)}><DoubleArrowOutlinedIcon style={{flex: '1', display:'flex', flexDirection:'row', fontSize:'1.5rem', width:'2rem', height:'2rem'}}/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            style={{backgroundColor:'rgba(0, 0, 0, .5)'}}
          >

<div className=".quote-box" style={{width:'12rem'}}>
    <div style={{backgroundColor: QuoteGenerator.quote && QuoteGenerator.randomColor(), margin:'-.1rem 0 -1rem 0', padding:'.7rem 4rem 0 0' , width:'11.62rem', boxShadow:'0 0 .6rem .6rem rgba(0, 0, 0, 0.5)', color:'#135dad', display:'flex', flexDirection:'row', position:'fixed', height:'2.5rem' ,zIndex:'1', background:'linear-gradient(142.4deg, rgb(126, 174, 193) .1%, rgb(126, 174, 193) 28.2%)'}} className=".quote-text">
    <img src={TextUp} alt='Logo' style={{width:'2.6rem', height:'2.6rem', margin:'-.4rem .5rem 0 0.5rem'}}></img><h1 style={{marginTop:'-.2rem'}}>TextUp</h1>
    </div>
    </div>
          <div style={{marginTop:'3rem',background: 'linear-gradient(142.4deg, rgb(109, 177, 206) 52%, rgb(116, 137, 206) 99.5%)', minHeight:'94.4vh', color:'#000000', marginRight:'-.001rem', overflowY:'hidden'}}>

            {list(anchor)}
            <QuoteGenerator/>
          </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
