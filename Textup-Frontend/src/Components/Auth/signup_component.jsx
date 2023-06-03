import React, { useState } from "react";
import Button from '@mui/material/Button';
import ActiveState from './ActiveState';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Sidebar from '../Sidebar/Sidebar';
import TextUp from '../../img/TextUp.png';
import "./login.css";
import load from '../../img/load.gif'

const useStyles = makeStyles((theme) => ({
  title:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems: 'center',
    padding:'0 1rem 0 1rem'
  },
  personalDetailsText:{
    display: 'flex', 
    alignItems: 'center'
  },
  personalDetails:{
    backgroundColor: '#bdbdbd', 
    height: 1, 
    flex: 1, 
    margin: '10px 0 50px 10px'
  },
  Step1:{
    display:'flex', 
    widows: '100%',
    justifyContent: 'space-between', 
    marginTop: 20
  },
  Step3:{
    display:'flex', 
    widows: '100%',
    justifyContent: 'space-between', 
    marginTop: 20
  },
  Details:{
    display: 'flex', 
    widows: '100%', 
    justifyContent: 'space-between', 
    marginTop: 10
  },
  insideApp:{
    display:'flex', 
    flexDirection:'row-reverse', 
    justifyContent: 'space-between', 
    width: '99%'
  },
  insideApp2:{
    display:'flex', 
    flexDirection:'row', 
    width:'90%'
  },
  Submit:{
    display: 'flex',
    widows: '100%', 
    justifyContent: 'space-between', 
    marginTop: 20
  },
  Finish:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent: 'space-between', 
    width: '100%'
  },
  formSubmit:{
    display: 'flex', 
    flexDirection: 'row', 
    pt: 2
  },
  formSubmitInside:{
    flex: '1 1 auto'
  }
}));

export default function SignUp() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [done, setDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const [mismatch2, setMismatch2] = useState(false);
  const loader = (
    <div className="loader">
      <img src={load} alt="loading"/>
    </div>
  );

  const classes = useStyles();
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setDone(true);
      if(password === cpassword){

      fetch("https://textup-backend.onrender.com/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          profession,
          mobile,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setFormSubmitted(true);
          } 
          setIsLoading(false);
        });
  } else
  {
    setMismatch(true);
    setIsLoading(false);
  }
};

  const nextStep = () => {
    setStep(step + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //OTP

  const sendotp = () => {
    fetch("https://textup-backend.onrender.com/storeOTP", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
        });
      setStep(step + 1);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

const [activeStep, setActiveStep] = React.useState(0);

//verify otp
function verifyotp(e) {
  e.preventDefault();
  setIsLoading(true);

  fetch("https://textup-backend.onrender.com/verify-user", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        localStorage.setItem("Verifytoken", data.data);
        setStep(step + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsLoading(false);
        setMismatch2(false);
      }else{
        setMismatch2(true);
        setIsLoading(false);
      }
    });
}

  return (
      <div className={classes.App} style={{background: 'linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)', minHeight:'100vh'}}>
        <Stack direction="row" spacing={0} style={{position:'relative' ,width:'100%', marginBottom:'5rem'}}>
    <Sidebar/>
    <div style={{width:'100%', textDecoration:'none'}}>
      <Chip
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem', height:'1.5rem'}}>Sign Up</h6>}
        variant="outlined"
        style={{flex:'10', height: '3rem', borderRadius:'5rem', margin:'.5rem 0 0 0', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)', width:'98%', zIndex:'-1' }}
      />
      </div>
    </Stack>
    
         {(
        <div>
          <div sx={{ mt: 2, mb: 1 }}>
          <div className="login" style={{backgroundColor:'rgb(133, 161, 158)', borderRadius:'1rem', margin:'auto', marginTop:'-4rem',width:'35%', minWidth:'22rem', boxShadow:'0 0 0.5rem 0.2rem rgba(0.4, 0.4, 0.4, 0.4)'}}>
            <div className="header">
            <Link to="/login" style={{width:'100%', textDecoration:'none'}}><button className="btn1">{"Sign In"}</button></Link>
              <button className="btn1">{"Sign Up"}</button>
            </div>
            <p style={{marginBottom:'-.6rem'}}>Fill the following details to SignUp</p>
          <div className={classes.title}>
      
    </div>
          {activeStep === 0 && (
            <div>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
      <p className={classes.personalDetailsText}><ActiveState step={0} activeStep={activeStep}/>Personal</p>
      <p className={classes.personalDetailsText}><ActiveState step={1} activeStep={activeStep}/>Contact</p>
      </div>
        <form className="form" onSubmit={nextStep}>
            <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
            </div>
        <div className="input-container">
            <label htmlFor="profession">Profession (Optional)</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
      
      <div className={classes.insideApp}>
      <Button type="submit" style={{display:'flex', backgroundColor:'#1976d2', color:'white', marginRight:'.7%'}}>Next</Button>
        </div>
        </form>
        </div>
      )}

{activeStep === 1 && (    
      <div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
      <p className={classes.personalDetailsText}><ActiveState step={0} activeStep={activeStep}/>Personal</p>
      <p className={classes.personalDetailsText}><ActiveState step={1} activeStep={activeStep}/>Contact</p>
      </div>
      <form className="form" onSubmit={sendotp}>
      <div className="input-container">
            <label htmlFor="number">Mobile (Optional)</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setMobile(e.target.value)}
            />
      </div>
      <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div className={classes.Finish}>
        <Button type="button" onClick={prevStep} style={{marginLeft:'.7%',backgroundColor:'#1976d2', color:'white'}}>Prev</Button>
        <Button type="submit" style={{display:'flex', backgroundColor:'#1976d2', color:'white', marginRight:'.7%'}}>Next</Button>
        </div>
      </form>
  </div>
)}
{activeStep === 2 && (    
      <div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <p className={classes.personalDetailsText}><ActiveState step={1} activeStep={activeStep}/>Contact</p>
        <p className={classes.personalDetailsText}><ActiveState step={2} formSubmitted={formSubmitted} activeStep={activeStep}/>Password</p>
      </div>
      <form className="form" onSubmit={verifyotp}>
      <div className="input-container">
            <label htmlFor="number">OTP</label>
            <input
              type="Number"
              className="form-control"
              onChange={(e) => setOTP(e.target.value)}
            />
      </div>
        <div className={classes.Finish}>
        <Button type="button" onClick={prevStep} style={{marginLeft:'.7%',backgroundColor:'#1976d2', color:'white'}}>Prev</Button>
        <Button type="submit" style={{display:'flex', backgroundColor:'#1976d2', color:'white', marginRight:'.7%'}}>Verify</Button>
        </div>
      </form>
  </div>
)}
      {activeStep === 3 && (    
      <div>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
      <p className={classes.personalDetailsText}><ActiveState step={1} activeStep={activeStep}/>Contact</p>
      <p className={classes.personalDetailsText}><ActiveState step={2} formSubmitted={formSubmitted} activeStep={activeStep}/>Password</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div className="input-container">
          <label htmlFor="password">Confirm Password</label>
          <input
              type="password"
              className="form-control"
              onChange={(e) => setCpassword(e.target.value)}
              required
            />
        </div>
        
        {formSubmitted ? (
        <div>
          <div className={classes.formSubmit}>
            <div className={classes.formSubmitInside}/>

            <div className={classes.insideApp}>
            <Link to="/login" style={{width:'100%', textDecoration:'none'}}><Button style={{ marginRight:'.7%', backgroundColor:'#1976d2', color:'white'}}>Finish</Button></Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.Finish}>
        <Button type="button" onClick={prevStep} style={{marginLeft:'.7%',backgroundColor:'#1976d2', color:'white'}}>Prev</Button>
        <Button type="submit" style={{marginRight:'.7%', backgroundColor:'#1976d2', color:'white'}}>Submit</Button>
        </div>
      )}
      </form>
  </div>
)}
      {isLoading ? (
             loader
          ) :
          (
            formSubmitted ?
          <div style={{marginLeft:'4%'}}>{done && <p>You are sucessfully register on TextUp!<br></br>Now click on Finish to Sign In</p>}</div>
          : mismatch ?
          <div style={{marginLeft:'4%'}}>{mismatch && <p>Password and Confirm Password<br></br>not matched</p>}</div>
          : mismatch2 ? <div style={{marginLeft:'4%'}}>{mismatch2 && <p>Please enter correct OTP send on your email address</p>}</div>
          : <div style={{marginLeft:'4%'}}>{done && <p>User already register or<br></br>something went wrong</p>}</div>
        ) }
      <img src={TextUp} alt='Logo' style={{width:'7rem', height:'7rem', margin:'.1rem .5rem .5rem 0.5rem'}}></img>
      <p style={{height:'3.1rem'}}>Read <Link to="/about" style={{width:'100%', textDecoration:'none'}}>Terms of Use</Link> and <Link to="/about" style={{width:'100%', textDecoration:'none'}}>Privacy Policy</Link> before Sign Up</p>
     </div>
        </div>
        </div>
      )}
    </div>
  );
}
