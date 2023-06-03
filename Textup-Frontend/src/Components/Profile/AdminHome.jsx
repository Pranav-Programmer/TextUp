import { useEffect, useState} from "react";
import "./styles.css"; // import CSS file for styling
import Navbar from '../Sidebar/Sidebar'
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import search from '../../img/search.png';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function App() {

  const [deleteUserEmail, setDeleteUserEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (email) => {
  setDeleteUserEmail(email);
  setOpen(true);
};
  const handleClose = () => setOpen(false); 

   //setting state
   const [data, setData] = useState([]);
 
   //fetching all user
   useEffect(() => {
    fetch("https://textup-backend.onrender.com/getAllUser")
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);
 
   //deleting user
   const deleteUser = (email) => {
    fetch("https://textup-backend.onrender.com/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setData((prevData) => prevData.filter(user => user.email !== email));
      });
  };

const [query, setQuery] = useState("")
const [showInput, setShowInput] = useState(false);

const handleChipClick = () => {
  setShowInput(true);
}

const handleInputChange = (event) => {
  setQuery(event.target.value);
}

let count = 1;
 
  return (
    <>
    <Stack direction="row" style={{position:'fixed' ,width:'100%', backgroundColor:'#fff'}}>
    <Navbar/>
      <Chip
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem'}}>Users</h6>}
        variant="outlined"
        style={{flex:'1', height: '3rem', borderRadius:'5rem', margin:'.5rem .5rem 0 .5rem',backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)' }}
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
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(notes =>{
  if ((notes.name?.toLowerCase().includes(query.toLowerCase()) || notes.email?.toLowerCase().includes(query.toLowerCase()))) {
    return notes;
  }
  return false;
}).map((user) => (
            <tr key={user.id}>
              <td >{count++ + ". "}
              {query === '' ? user.name : (
              user.name.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}
              </td>
              <td>{query === '' ? user.email : (
              user.email.split(' ').map(word => 
                word.toLowerCase().includes(query.toLowerCase()) ? 
                <span style={{backgroundColor:'#FFD580', padding:'0 .1px'}}>{word} </span> : 
                word + ' '
              )
            )}</td>
              <td><DeleteIcon onClick={() => handleOpen(user.email)} style={{display:'flex', paddingLeft:'40%', color:'#cd5c5c'}}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{width:'75%', height:'20%', marginTop:'5%'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center', marginBottom:'1.5rem'}}>
          DELETE ACCOUNT
          </Typography>
          <Typography id="modal-modal-description" style={{textAlign:'justify', marginTop:'2rem', height:'97%', overflow:'scroll'}}>
          Are you sure! you want to delete {deleteUserEmail} account. 
          <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
          <ColorButton onClick={() => {deleteUser(deleteUserEmail); handleClose();}} variant="contained" style={{flex: 1, borderRadius:'.5rem', backgroundColor:'red', marginLeft:'1rem' }}>Delete</ColorButton>
          <ColorButton onClick={handleClose} variant="contained" style={{flex: 1, borderRadius:'.5rem', backgroundColor:'green', marginLeft:'1rem' }}>Cancle</ColorButton>
          </Stack>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
