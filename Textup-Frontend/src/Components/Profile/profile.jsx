import React, {useState, useEffect} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography} from 'mdb-react-ui-kit';
import './profile.css'
import Navbar from '../Sidebar/Sidebar'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import user from '../../img/user.png'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

export default function PersonalProfile({image, setImage}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

        const [userData, setUserData] = useState("");
        useEffect(() => {
          fetch("http://localhost:5000/userData", {
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
                window.localStorage.removeItem("token");
                window.location.href = "/login";
              }
            });
        }, []);

  //logout
  const logOut = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
    localStorage.removeItem("profileImage");
    setImage(user);
    window.location.reload();
  };

  const deleteUser = (email) => {
    fetch("http://localhost:5000/deleteUser", {
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
        window.localStorage.removeItem("token");
        window.location.href = "/signup";
      });
  };

//Upoad User Image
  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setImage(reader.result);
    };
  };

  const [showDetails, setShowDetails] = useState(false);
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <section className="vh-100" style={{Height: '100vh', background: 'linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)'}}>

<Stack direction="row" className='Nav' style={{ position: 'fixed', width: '100%', zIndex: '100' }}>
  <Navbar />
  <Chip
    label={<h6 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 'bold', flexWrap: 'wrap', paddingLeft: '.5rem' }}>Profile</h6>}
    variant="outlined"
    style={{ flex: '1', height: '3rem', borderRadius: '5rem', margin: '.5rem .5rem 0 .5rem', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)' }}
  />
</Stack>
    
    <MDBContainer className="py-5 h-100">
  <MDBRow className="justify-content-center align-items-center h-100">
    <MDBCol lg="6" className="mb-12 mb-lg-0">
      <MDBCard className="mb-3" style={{ borderRadius: '.5rem'}}>
        <MDBRow className="g-0">
          <MDBCol md="4" className="gradient-custom text-center text-white" data-aos="flip-up" data-aos-duration="2000"
            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '3rem', borderBottomRightRadius: '3rem', transformOrigin: '0px 0px'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <MDBCardImage src={image} alt="Avatar" className="my-5" style={{ width: '100px', borderRadius: '50%', marginTop:'2.5rem' }} fluid />
              <label htmlFor="profileImageInput" >
                <CloudUploadIcon style={{marginTop:'1rem', cursor:'pointer', color:'#ffffff'}} />
              </label>
              <input id="profileImageInput" type="file" onChange={handleImageUpload} style={{ display: 'none' }}/>
            </div>
            <h6 style={{color:'#000', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem', marginTop:'1.3rem'}}> {userData.name}</h6>
            {userData.profession === "" ? (<MDBCardText style={{marginLeft:'.5rem', marginTop:'-1rem', marginBottom:'.2rem'}}>Profession</MDBCardText>) : (<MDBCardText style={{marginLeft:'.5rem', marginTop:'-1rem', marginBottom:'.2rem'}}>{userData.profession}</MDBCardText>)}
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody className="p-4">
              <MDBTypography tag="h1">Information</MDBTypography>
              {/* <hr className="mt-0 mb-4" /> */}
              <MDBRow className="pt-1" >
                <MDBCol size="6" className="mb-3 mb-md-0">
                  <MDBTypography tag="h5">Email</MDBTypography>
                  <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                </MDBCol>
                <MDBCol size="6">
                  <MDBTypography tag="h5">Mobile</MDBTypography>
                  <div>
                    {userData.mobile === "" ? (<MDBCardText className="text-muted">+91 000 000 0000</MDBCardText>) : (<MDBCardText className="text-muted">{userData.mobile}</MDBCardText>)}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</MDBContainer>

      <Stack spacing={2} direction="row" style={{display:'flex', margin:'-1rem 1rem 0 1rem'}}>
      <Link to="/resetmail" style={{textDecoration:'none', width:'50%'}}><ColorButton  variant="contained" style={{flex: 1, borderRadius:'.5rem', width:'100%', fontSize:'.7rem'}}>Change Email</ColorButton></Link>
      <Link to="/resetpassword" style={{textDecoration:'none', width:'50%'}}><ColorButton variant="contained" style={{flex: 1, borderRadius:'.5rem', width:'100%', fontSize:'.7rem'}}>Change Password</ColorButton></Link>
    </Stack>
    <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
      <ColorButton onClick={logOut} variant="contained" style={{flex: 1, borderRadius:'.5rem', backgroundColor:'gray' }}>Log Out</ColorButton>
    </Stack>
    <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>

      {userData.email === "pranavdharme10@gmail.com" ? (<Link to="/profile/adminhome" style={{textDecoration:'none', width:'100%'}}><ColorButton variant="contained" style={{flex: 1, borderRadius:'.5rem', backgroundColor:'#7d4e73', width:'100%'}}>Admin Control</ColorButton></Link>) 
      :(<ColorButton onClick={handleOpen} variant="contained" style={{flex: 1, borderRadius:'.5rem', backgroundColor:'red' }}>Delete Account</ColorButton>)}

    </Stack>

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{margin:'5% 2.2rem'}}
      >
        <Box sx={style} style={{ width: '90%', margin: '5% auto', height:'56%', overflow:'scroll' }}>
          <Typography variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '-1.7rem' }}>
            DELETE ACCOUNT
          </Typography>
          <p style={{ textAlign: 'justify', marginTop: '2rem' }}>
            After deleting your account, you will lose all your data, including headings, text, and links associated with your notes. However, please note that if you have uploaded images in certain notes, those images will not be automatically deleted with the account deletion.
            {showDetails && (
              <p>
            To ensure complete removal of images, we recommend deleting the individual notes that contain images before proceeding with the account deletion. This will prevent any images from remaining in our system.
            <br /><br />
            Please remember that once your account is deleted, you won't be able to retrieve your data or images. If you have any concerns or need assistance, we encourage you to send us a request via our <Link to="/Contact" style={{ textDecoration: 'none' }}>contact page</Link> before proceeding.
            </p>)}</p>
            {!showDetails ? (
            <Typography
              variant="body2"
              style={{ textAlign: 'center', cursor: 'pointer', color: '#007BFF' }}
              onClick={handleToggleDetails}
            >
              Show more
            </Typography>
          ) : (
            <Typography
              variant="body2"
              style={{ textAlign: 'center', cursor: 'pointer', color: '#007BFF' }}
              onClick={handleToggleDetails}
            >
              Show less
            </Typography>
          )}

          <Typography style={{ textAlign: 'justify', overflow: 'auto', fontWeight: 'bold', marginTop: showDetails ? '2%' : '10%'}}>
            {userData.name}, are you sure you want to delete your account?
          </Typography>

          <Stack spacing={2} direction="row" style={{ display: 'flex', margin: '1rem' }}>
            <ColorButton onClick={() => deleteUser(userData.email, userData.name)} variant="contained" style={{ flex: 1, borderRadius: '.5rem', backgroundColor: 'red', marginLeft: '1rem' }}>Delete</ColorButton>
            <ColorButton onClick={handleClose} variant="contained" style={{ flex: 1, borderRadius: '.5rem', backgroundColor: 'green', marginLeft: '1rem' }}>Cancel</ColorButton>
          </Stack>

        </Box>

      </Modal>
    </div>
    </section>
  );
}
