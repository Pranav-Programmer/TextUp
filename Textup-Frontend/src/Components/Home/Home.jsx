import React from 'react'
import './Home.css'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {} from '@material-ui/core';
import ReplyIcon from '@mui/icons-material/Reply';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import user from '../../img/user2.png'
import search from '../../img/search.png';
import P1 from '../../img/Default.png';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Sidebar from '../Sidebar/Sidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import CTA from './CTA'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));

function Home(props) {

  const [selectedContentIndex, setSelectedContentIndex] = useState(-1);
  const [contents, setContents] = useState(JSON.parse(localStorage.getItem("myContents")));
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newContent, setNewContent] = useState(localStorage.getItem('image') || '',{
    heading: '',
    description: '',
    link: '',
  });

  useEffect(() => {
    const savedContents = JSON.parse(localStorage.getItem('myContents'));
    if (savedContents) {
      setContents(savedContents);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('myContents', JSON.stringify(contents));
  }, [contents]);

  const handleNewContentChange = (event) => {
    const { name, value } = event.target;
    setNewContent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNewContentSubmit = (event) => {
    event.preventDefault();
    setContents((prevState) => Array.isArray(prevState) ? [...prevState, newContent] : [newContent]);
    setNewContent({
      heading: '',
      description: '',
      link: '',
    });
    setModalIsOpen(false);
  };

  const handleRemoveContent = (index) => {
    setContents((prevState) => prevState.filter((_, i) => i !== index));
  };
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const handleOpenModal = (index) => {
    setOpenModalIndex(index);
    setShowInput(false);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  const [query, setQuery] = useState("")
  const [showInput, setShowInput] = useState(false);

  const handleChipClick = () => {
    setShowInput(true);
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

        useEffect(() => {
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
              // setUserData(data.data);
      
              if (data.data === "token expired") {
                // setLogged(false);
              }
            });
        }, []);

    let contentLength = contents ? contents.length : 0;

    useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        setModalIsOpen(false)
      };
  
      window.onbeforeunload = handleBeforeUnload;
      return () => {
        window.onbeforeunload = null; // Cleanup the event handler
      };
    }, []);

  return (
    <div>
    <Stack direction="row" spacing={0} style={{position:'fixed' ,width:'100%', backgroundColor:'#fff'}}>
    <Sidebar/>
      <Chip
        avatar={<Avatar alt="Natacha" src={user} style={{width:'2.3rem', height:'2.3rem', margin:'-.4rem -.8rem 0'}}/>}
        label={<Link to="/profile"><h6 style={{flexWrap:'wrap',height:'2.3rem', margin:'.4rem 0 0 .5rem', fontSize:'1.5rem', color:'white', maxWidth:'11rem', textDecoration:'underline'}}>TextUp</h6></Link>}
        variant="outlined"
        style={{flex:'10', height: '3rem', borderRadius:'5rem', margin:'.5rem .5rem 0 .2rem', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)', width:'98%'}}
      />
      <Chip
        avatar={<Avatar alt="Natacha" src={search} style={{width:'2.3rem', height:'2.3rem',  margin:'2rem 0  0 -4rem'}}/>}
        onClick={handleChipClick}
      />
      {showInput && (
        <input
          placeholder="Search"
          onChange={handleInputChange}
          style={{
            textDecoration:'none',
            height: '1.6rem',
            borderRadius: '5rem',
            margin: '.65rem 0 .2rem 0',
            padding: '.5rem .5rem',
            backgroundImage: 'white',
            position: 'fixed',
            border: '1px solid',
            borderColor: 'black',
            width: 'calc(100% - 4.8rem)',
            left: '3.05rem',
          }}
        />
      )}

    </Stack>
    <Stack spacing={1} style={{display:'flex', flexDirection:'column', padding:'.4rem'}}>
    
    <Item onClick={() => setShowInput(false)} style={{backgroundColor:'#e3e3ec', display:'flex', height:'2.6rem', borderRadius:'1rem', marginTop:'3.5rem', marginBottom:'-.9rem', cursor:'pointer'}}>
      <ControlPointRoundedIcon onClick={() => setModalIsOpen(true)} style={{fontSize:'3rem', flex:1}}/>
      <ControlPointRoundedIcon onClick={() => setModalIsOpen(true)} style={{fontSize:'3rem', flex:1000}}/>
      <ControlPointRoundedIcon onClick={() => setModalIsOpen(true)} style={{fontSize:'3rem', flex:1}}/>
    </Item>

    <div>
    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}   aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" ariaHideApp={false}>
        <Box style={{ width: '100rem', maxWidth: '100%', height: '100%', overflow: 'auto' }}>
        <ReplyIcon onClick={() => setModalIsOpen(false)} style={{fontSize:'2.5rem', marginRight:'91%', position:'absolute', top:'7.5', left:'15', cursor:'pointer'}}/>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '-1rem', marginTop: '-.3rem', marginRight: '17%', marginLeft:'10%'}}>
          ADD TEXT
          </Typography>          
      <form onSubmit={handleNewContentSubmit} style={{display:'flex', flexDirection:'column'}}>
      <textarea id='form4Example1' name="heading" type="text" onChange={handleNewContentChange} placeholder='Heading' rows="2" style={{ fontSize: '1.4rem', margin: '1rem -1rem', borderTop: 'none', width: '100%' }}></textarea>
      <textarea id='form4Example1' name="description" onChange={handleNewContentChange} placeholder='Description' rows="13" style={{
          fontSize: '1.2rem',
          margin: '1rem -1rem',
          borderTop: 'none',
          width: '100%',
          height: '48vh'
        }}></textarea>
      <textarea id='form4Example1' name="link" onChange={handleNewContentChange} placeholder='Link' rows="2" style={{ fontSize: '1.2rem', margin: '1rem -1rem', borderTop: 'none', width: '100%' }}></textarea>
      <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
      <Button type='submit' variant="contained" style={{ flex: 1, borderRadius: '.5rem', backgroundColor: 'DodgerBlue', margin: '0 0 0 -1.5rem', fontSize:'1rem' }}>ADD</Button>
    </Stack>
    </form>
        </Box>
      </Modal>
    </div>

    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    {contentLength === 0 && (
  <div style={{textAlign:'centre' ,borderRadius:'1rem', width:'90%', minWidth:'21rem', transform: 'translateY(30vh)', color:'GrayText'}}>
    {CTA[Math.floor(Math.random() * CTA.length)].content}

    <div>
    <Link to="/signup"><Button style={{backgroundImage:'linear-gradient(to right, rgb(0, 90, 167), rgb(90, 102, 197))', color:'white', marginTop:'1rem'}}>Sign Up Now</Button></Link>
  </div>
  </div>
)}
</div>
{contents && (
  <>
    {contents.filter(usernotes =>{
  if ((usernotes.heading?.toLowerCase().includes(query.toLowerCase()) || usernotes.description?.toLowerCase().includes(query.toLowerCase()))) {
    return usernotes;
  }
  return false;
}).reverse().map((content, index) => (
      <Item key={contentLength - index - 1} style={{backgroundColor:'#e3e3ec', borderRadius:'1rem', boxShadow:'0 0 0 2px #ccc'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', height:'20%', margin: '1rem 1rem 1rem 0', flexWrap:'wrap'}}>
        <div className='Left' style={{textAlign:'left', width:'64%', minWidth:'50px', height:'20%'}}>
        <h4 onClick={() => handleOpenModal(contentLength - index - 1)} style={{textAlign:'justify', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', cursor:'pointer'}}>
            {query === '' ? content.heading : (
              content.heading.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}</h4>
        <p onClick={() => handleOpenModal(contentLength - index - 1)} style={{textAlign:'justify', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', cursor:'pointer'}}>
            {query === '' ? content.description : (
              content.description.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}
        </p>
        {content.link && ((<a href={content.link} target="_blank" rel="noreferrer" style={{textAlign:'justify', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', fontWeight:'bold', color:'Blue', textDecoration:'none'}}>Link</a>))}
        </div>
        <div className='Right'>
        <img src={P1} alt="File Uploaded" onClick={() => handleOpenModal(contentLength - index - 1)} style={{width:'5rem', height:'5rem', padding:'.3rem', cursor:'pointer'}}/>
        <button onClick={() => handleRemoveContent(contentLength - index - 1)} style={{display:'flex', marginTop:'.5rem', marginBottom:'-1.1rem' ,marginLeft:'13%', cursor:'pointer'}}>Remove</button>
        </div>
        </div>
        {openModalIndex === contentLength - index - 1 && (
        <div className="modal" style={{backgroundColor: 'white', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', overflow:'scroll'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', maxHeight: '100vh', overflowY: 'scroll', overflowX:'hidden', width: '100%'}}>
          <ReplyIcon onClick={handleCloseModal} style={{fontSize:'2.2rem', marginRight:'91%', position:'absolute', top:'5', left:'8', cursor:'pointer'}}/>
          <h2 onClick={() => handleOpenModal(contentLength - index - 1)} style={{textAlign: 'center', whiteSpace:'pre-line'}}>
            {query === '' ? content.heading : (
              content.heading.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}</h2>
            <p onClick={() => handleOpenModal(contentLength - index - 1)} style={{textAlign: 'justify', margin: '1rem 0 1rem 0',width:'100%', whiteSpace:'pre-line'}}>
            {query === '' ? content.description : (
              content.description.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}
        </p>
            <a href={content.link} target="_blank" rel="noreferrer" style={{textAlign: 'justify', fontWeight: 'bold', color: 'Blue', textDecoration: 'none', width:'auto', marginRight:'1rem 1rem 1rem 1rem', whiteSpace:'pre-line'}}>{content.link}</a>
            <div style={{textAlign: 'center'}}>
            <Button variant="outlined" size="small" onClick={() => setSelectedContentIndex(contentLength - index - 1)} style={{marginTop:'1rem'}}>Edit</Button>
            </div>
            <Modal isOpen={selectedContentIndex !== -1} onRequestClose={() => setSelectedContentIndex(-1)}>
            <Box style={{ width: '100rem', maxWidth: '100%', height: '100%', overflow: 'auto' }}>
            <ReplyIcon onClick={() => setSelectedContentIndex(-1)} style={{fontSize:'2.5rem', marginRight:'91%', position:'absolute', top:'7.5', left:'15', cursor:'pointer'}}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '-1rem', marginTop: '-.3rem', marginRight: '17%', marginLeft:'10%'}}>
                    Edit TEXT
                    </Typography>
              <form onSubmit={(e) => {e.preventDefault();
              setSelectedContentIndex(-1);
              }}>
                <textarea type="text" name="heading" value={content.heading} placeholder="Heading" onChange={(e) => setContents([...contents.slice(0, selectedContentIndex), { ...contents[selectedContentIndex], heading: e.target.value }, ...contents.slice(selectedContentIndex + 1)])} rows="2" style={{ fontSize: '1.4rem', margin: '1rem -1rem', borderTop: 'none', width: '101%' }}></textarea>
                <textarea type="text" name="description" value={content.description} placeholder="Description" onChange={(e) => setContents([...contents.slice(0, selectedContentIndex), { ...contents[selectedContentIndex], description: e.target.value }, ...contents.slice(selectedContentIndex + 1)])} style={{
          fontSize: '1.2rem',
          margin: '1rem -1rem',
          borderTop: 'none',
          width: '101%',
          height: '58vh'
        }}></textarea>
                <textarea name="link" value={content.link} placeholder="Link" onChange={(e) => setContents([...contents.slice(0, selectedContentIndex), { ...contents[selectedContentIndex], link: e.target.value }, ...contents.slice(selectedContentIndex + 1)])} rows="2" style={{ fontSize: '1.2rem', margin: '1rem -1rem', borderTop: 'none', width: '101%' }}></textarea>
                <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
              </Stack>
              </form>
              </Box>
            </Modal>
        </div>
        </div>
        )}
      </Item>
      ))
      }
      </>
)}
    {(contentLength > 0) && (<h6 style={{color:'#ffffff', fontSize:'.1rem'}}>TextUp</h6>)}
    </Stack>
    </div>
  )
}
export default Home
