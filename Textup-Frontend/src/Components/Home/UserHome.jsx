import React from 'react'
import './Home.css'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {} from '@material-ui/core';
import ReplyIcon from '@mui/icons-material/Reply';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import search from '../../img/search.png';
import Default from '../../img/Default.png';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Sidebar from '../Sidebar/Sidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@material-ui/core/IconButton';
import load from '../../img/load.gif'
import CTA from './CTA'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export default function UserHome(props) {

  const [userData, setUserData] = useState("");
  const [logged, setLogged] = useState(true)
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
              setUserData(data.data);
      
              if (data.data === "token expired") {
                setLogged(false);
              }
            });
    }, []);

          useEffect(() => {
            fetch("https://textup-backend.onrender.com/userNotesData", {
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
      });

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const email = userData.email;
  const [Pid, setPid] = useState(null); 
  const [link, setLink] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, 'MMM dd, yyyy');
  const [imgPid, setImgPid] = useState("");
  const [val] = useState(Math.floor(Math.random() * 15))
  
  const handleSubmit = (e) => {
      e.preventDefault();
     
      fetch("https://textup-backend.onrender.com/upload-note", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          heading,
          email,
          Pid,
          description,
          link,
          image,
          formattedDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setModalIsOpen(false);
            setImage(null);
            setFileSize(null)
          } 
          setImage(null);
          setFileSize(null)
          setModalIsOpen(false);
          updateNotesData();
          // window.location.reload(true);
        });
};

const updateNotesData = () => {
  fetch("https://textup-backend.onrender.com/notesData", {
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
      setNotesData(data.data);

      if (data.data === "token expired") {
        setLogged(false);
      }
    });
}

const [notesData, setNotesData] = useState([]);
      useEffect(() => {
        updateNotesData();
  }, []);

  // Remove Notes
  const removeNotes = (id) => {
      fetch("https://textup-backend.onrender.com/removeNotes", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {

          deleteImage(imgPid);
          setOpenModalIndex2(null);
          updateNotesData();
        });        
  };

  // Update Notes
  const notesUpdate = (data) => {
    const reqBody = {
      id: data._id,
      heading: data.heading,
      description: data.description,
      link: data.link
    };

    fetch("https://textup-backend.onrender.com/notesUpdate", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedContentIndex(-1);
      });
};

let i = 0;  

  const [selectedContentIndex, setSelectedContentIndex] = useState(-1);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [openModalIndex2, setOpenModalIndex2] = useState(null);

  const handleOpenModal = (_id) => {
    setOpenModalIndex(_id);
    setShowInput(false);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
    if (query.length > 0){ 
      window.location.reload(false); 
    }
  };

  const handleOpenModal2 = (_id) => {
    setOpenModalIndex2(_id);
    setShowInput2(false);
  };

  const handleCloseModal2 = () => {
    setOpenModalIndex2(null);
  };

  const [query, setQuery] = useState("")
  const [fileSize, setFileSize] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [setShowInput2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setResponse] = useState("")
  const [showQuote, setShowQuote] = useState(false)

  const loader = (
    <div className="loader">
      <img src={load} alt="loading"/>
    </div>
  );

  setTimeout(() => {
    setShowQuote(true);
  }, 3000);

  const handleChipClick = () => {
    setShowInput(true);
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }
  
  const handleFileUpload = async (e) => {
    e.preventDefault();  
    setIsLoading(true);
    setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  setTimeout(() => {
    setFileSize(e.target.files[0].size);
  }, 3000);
    
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'ml_default');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/Your_Cloudinary_Cloud_Name/image/upload',
        formData
      );

      setImage(res.data.secure_url);
      setPid(res.data.secure_url.substring(res.data.secure_url.lastIndexOf('/') + 1, res.data.secure_url.lastIndexOf('.')))
    } catch (err) {
      console.error(err);
    }};

    const handleRemoveFile = () => {
      setImage(null); // reset the input file
      setFileSize(0);
    };

    const deleteImage = async (imgPid) => {
      try {
        const response = await axios.post('https://textup-backend.onrender.com/delete-image', {
          public_id: imgPid // Replace with the actual public_id of the image you want to delete
        });
        setResponse(response.data); // Success message from the server
      } catch (error) {
        console.error('Error occurred while deleting the image', error);
      }
    };

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
<>
      <div>
      <Stack direction="row" spacing={0} style={{position:'fixed' ,width:'100%', backgroundColor:'#fff'}}>
      <Sidebar/>
        <Chip
          avatar={<Link to="/profile"><Avatar alt="Natacha" src={props.image} style={{width:'2.3rem', height:'2.3rem', margin:'-.4rem -.8rem 0'}}/></Link>}
          label={logged === true ? <Link to="/profile"><h6 style={{flexWrap:'wrap',height:'2.3rem', margin:'1.1rem 0 0 0', fontSize:'1rem', color:'white', maxWidth:'13.5rem', textDecoration:'underline'}}>{userData.name}</h6></Link>:<Link to="/profile"><h6 style={{flexWrap:'wrap',height:'2.3rem', margin:'.4rem 0 0 .5rem', fontSize:'1.5rem', color:'white', maxWidth:'11rem', textDecoration:'underline'}}>TextUp</h6></Link>}
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
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" ariaHideApp={false}>
  <Box style={{ width: '100rem', maxWidth: '100%', height: '100%', overflow: 'auto' }}>
    <ReplyIcon onClick={() => {setFileSize(null); setModalIsOpen(false)}} style={{fontSize:'2.5rem', position:'absolute', top:'7.5', left:'15', cursor:'pointer', zIndex:1000, backgroundColor:'#fff', width:'23%', marginLeft:'-9%'}}/>
    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '-1rem', marginTop: '-.3rem', marginRight: '57%', marginLeft:'-3%', zIndex:100, backgroundColor:'#fff', position:'fixed', width:'100%'}}>
      ADD TEXT
    </Typography>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop:'.65rem'}}>
      <textarea
        id='form4Example1'
        name="heading"
        type="text"
        onChange={(e) => setHeading(e.target.value)}
        placeholder='Heading'
        rows="2"
        style={{ fontSize: '1.4rem', margin: '1rem -1rem', borderTop: 'none', width: '100%' }}
      ></textarea>
      <textarea
        id='form4Example1'
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Text'
        style={{
          fontSize: '1.2rem',
          margin: '1rem -1rem',
          borderTop: 'none',
          width: '100%',
          height: '42vh'
        }}
      ></textarea>
      <textarea
        id='form4Example1'
        name="link"
        onChange={(e) => setLink(e.target.value)}
        placeholder='Link'
        rows="2"
        style={{ fontSize: '1.2rem', margin: '1rem -1rem', borderTop: 'none', width: '100%' }}
      ></textarea>
      <label htmlFor="file-input" style={{ display: 'flex', justifyContent: 'center' }}>
        <input id="file-input" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        <IconButton component="span" style={{ borderRadius: '.5rem', margin: '0 0 0 -1.5rem', width:'40%', height:'1rem', marginBottom:'1rem'}}>
          <p style={{fontSize:'.7rem'}}>Upload Image</p><UploadFileIcon fontSize="large" />
        </IconButton>
      </label>

      <div style={{ display: 'flex', marginTop: '-1.5rem',flexDirection:'column', overflow:'hidden' }}>
        {fileSize && fileSize > 204800 ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: 'blue', marginBottom: '0.5rem', textAlign:'center' }}>File size should be less than 200 kb</p>
            <Button type='button' onClick={handleRemoveFile} variant="contained" style={{ flex: 1, borderRadius: '.5rem', backgroundColor: 'DodgerBlue', fontSize: '1.2rem', marginRight:'1.5rem'}}>Remove File</Button>
          </div>
        ) : (
          <Button type='submit' variant="contained" style={{ flex: 1, borderRadius: '.5rem', backgroundColor: 'DodgerBlue', fontSize: '1.2rem', marginTop: '1rem', marginRight:'1.7rem'}}>ADD</Button>
        )}
        {isLoading ? (
             <div className="loader" style={{marginRight: '1rem', marginBottom:'2rem', textAlign:'center'}}>
             <img src={load} alt="loading"/>
             <p style={{ color: 'gray', marginTop:'-1.1rem', textAlign:'center' }}>Uploading</p>
           </div>
          ) : fileSize && fileSize < 204800? (
          <p style={{ color: 'green', marginRight: '1rem', marginBottom:'2rem', textAlign:'center' }}>File uploaded successfully!</p>
        ) : fileSize === 0 && (
          <p style={{ color: 'red', marginRight: '1rem', marginBottom:'2rem', textAlign:'center' }}>File Removed!</p>
        ) }
      </div>
    </form>
  </Box>
</Modal>

      </div>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    
    {logged && notesData.length === 0 && (
  <div style={{textAlign:'centre' ,borderRadius:'1rem', width:'90%', minWidth:'21rem', transform: 'translateY(30vh)', color:'GrayText'}}>
    {showQuote ? CTA[val].content : loader}
  </div>
)}
</div>
        {logged && notesData.length > 0 && (
  <div style={{display: 'flex', flexDirection: 'column-reverse', gap:'.5rem'}}>
    {logged && notesData.filter(notes =>{
  if ((notes.heading?.toLowerCase().includes(query.toLowerCase()) || notes.description?.toLowerCase().includes(query.toLowerCase()))) {
    return notes;
  }
  return false;
}).map((content, _id) => (
      <Item key = {i++} style={{backgroundColor:'#e3e3ec', borderRadius:'1rem', boxShadow:'0 0 0 2px #ccc', margin:'0 .2rem 0 .3rem'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', height:'20%', margin: '1rem 1rem 1rem 0', flexWrap:'wrap'}}>
        <div className='Left' style={{textAlign:'left', width:'64%', height:'20%'}}>
        <h4 onClick={() => handleOpenModal(_id)} style={{textAlign:'justify', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', cursor:'pointer'}}>
            {query === '' ? content.heading : (
              content.heading.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span key = {i++} style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}</h4>
        <p onClick={() => handleOpenModal(_id)} style={{textAlign:'justify', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', cursor:'pointer'}}>
            {query === '' ? content.description : (
              content.description.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span key = {i++} style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}
        </p>
        {content.link && ((<a href={content.link} target="_blank" rel="noreferrer" style={{textAlign:'justify', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', fontWeight:'bold', color:'Blue', textDecoration:'none'}}>Link</a>))}
        </div>
        <div className='Right' style={{height:'7rem'}}>
        {content.image ? <img src={content.image} alt="File Uploaded" onClick={() => handleOpenModal(_id)} style={{width:'5rem', height:'5rem', padding:'.3rem', cursor:'pointer'}}/> : <img src={Default} alt="File Uploaded" onClick={() => handleOpenModal(_id)} style={{width:'5rem', height:'5rem', padding:'.3rem', cursor:'pointer'}}/>}
        <button onClick={() =>{setImgPid(content.Pid); 
        handleOpenModal2(_id)} } style={{display:'flex', marginTop:'.5rem', marginBottom:'-1.1rem' ,marginLeft:'13%', cursor:'pointer'}}>Remove</button>

        {openModalIndex2 === _id && (
  <div>
    <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10, pointerEvents: 'auto'}} />
    <div className="modal" style={{backgroundColor: 'white', position: 'fixed', width: '30%', minWidth:'20rem', height: '20%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', zIndex: 11, borderRadius:'1rem'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', maxHeight: '100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
        <h4>Are you sure?</h4>
        <div style={{display:'flex', flexDirection:'row', gap:'2rem'}}>
        <Button variant="outlined" size="small" onClick={() => removeNotes(content._id)} style={{ marginTop: '1rem' }}>Remove</Button>
        <Button variant="outlined" size="small" onClick={handleCloseModal2} style={{ marginTop: '1rem' }}>Cancel</Button>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
        </div>
        {openModalIndex === _id && (
        <div className="modal" style={{backgroundColor: 'white', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', overflow:'scroll'}}>
          <ReplyIcon onClick={handleCloseModal} style={{fontSize:'2.5rem', marginRight:'91%', position:'absolute', top:'0', left:'8', cursor:'pointer'}}/>
          <p onClick={() => handleOpenModal(_id)} style={{textAlign: 'right', width:'50%', marginLeft:'47%', whiteSpace:'pre-line', marginBottom:'-.6rem', fontSize:'.8rem', position:'absolute'}}>
            {content.formattedDate}
          </p>
          
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', maxHeight: '100vh', overflowY: 'scroll', overflowX:'hidden',marginTop:'2.5rem', width:'100%'}}>
          <h2 onClick={() => handleOpenModal(_id)} style={{textAlign: 'center', whiteSpace:'pre-line', marginTop:'-2rem'}}>
            {query === '' ? content.heading : (
              content.heading.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span key = {i++} style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}</h2>

            {content.image && <img src={content.image} alt="File Uploaded" style={{width:'15rem', height:'15rem', padding:'.3rem', marginBottom:'1rem', marginTop:'-1rem'}}/> }
            
            <p onClick={() => handleOpenModal(_id)} style={{textAlign: 'justify', margin: '-.7rem 0 1rem 0',width:'103%', whiteSpace:'pre-line'}}>
            {query === '' ? content.description : (
              content.description.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span key = {i++} style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}
        </p>
            <a href={content.link} target="_blank" rel="noreferrer" style={{textAlign: 'justify', fontWeight: 'bold', color: 'Blue', textDecoration: 'none', width:'auto', marginRight:'1rem 1rem 1rem 1rem', whiteSpace:'pre-line'}}>{content.link}</a>
            <div style={{textAlign: 'center'}}>
            <Button variant="outlined" size="small" onClick={() => setSelectedContentIndex(_id)} style={{marginTop:'1rem'}}>Edit</Button>
            </div>
            <Modal isOpen={selectedContentIndex !== -1} onRequestClose={() => setSelectedContentIndex(-1)} ariaHideApp={false}>
              <Box style={{ width: '100rem', maxWidth: '100%', height: '100%', overflow: 'auto' }}>
                  <ReplyIcon onClick={() => setSelectedContentIndex(-1)} style={{fontSize:'2.5rem', position:'absolute', top:'7.5', left:'15', cursor:'pointer', zIndex:1000, backgroundColor:'#fff', width:'23%', marginLeft:'-9%'}}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '-1rem', marginTop: '-.3rem', marginRight: '57%', marginLeft:'-3%', zIndex:100, backgroundColor:'#fff', position:'fixed', width:'100%'}}>
                    EDIT TEXT
                    </Typography>
              <form style={{marginTop:'.65rem'}}>
                <textarea type="text" name="heading" value={content.heading} placeholder="Heading" onChange={(e) => setNotesData([...notesData.slice(0, selectedContentIndex), { ...notesData[selectedContentIndex], heading: e.target.value }, ...notesData.slice(selectedContentIndex + 1)])} rows="2" style={{ fontSize: '1.4rem', margin: '1rem -1rem', borderTop: 'none', width: '100%' }}></textarea>
                <textarea type="text" name="description" value={content.description} placeholder="Text" onChange={(e) => setNotesData([...notesData.slice(0, selectedContentIndex), { ...notesData[selectedContentIndex], description: e.target.value }, ...notesData.slice(selectedContentIndex + 1)])} rows="13" style={{
          fontSize: '1.2rem',
          margin: '1rem -1rem',
          borderTop: 'none',
          width: '100%',
          height: '48vh'
        }}></textarea>
                <textarea name="link" value={content.link} placeholder="Link" onChange={(e) => setNotesData([...notesData.slice(0, selectedContentIndex), { ...notesData[selectedContentIndex], link: e.target.value }, ...notesData.slice(selectedContentIndex + 1)])} rows="2" style={{ fontSize: '1.2rem', margin: '1rem -1rem', borderTop: 'none', width: '100%' }}></textarea>
                <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
                <Button type='button' onClick={()=>{notesUpdate(content)}} variant="contained" style={{ flex: 1, borderRadius: '.5rem', backgroundColor: 'DodgerBlue', margin: '0 0 0 -1.5rem', fontSize:'1rem' }}>SAVE</Button>
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
      </div>
)}
      {notesData.length > 0 && (<h6 style={{color:'#ffffff', fontSize:'.1rem'}}>TextUp</h6>)}
      
      </Stack>
      </div>
    </>
  );
}
