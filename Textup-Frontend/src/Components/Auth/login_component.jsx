import React, { useState } from "react";
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Sidebar from '../Sidebar/Sidebar';
import TextUp from '../../img/TextUp.png';
import "./login.css";
import load from '../../img/load.gif';

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

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const loader = (
    <div className="loader">
      <img src={load} alt="loading"/>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem("profileImage");
    setIsLoading(true);

    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("token", data.data);
          localStorage.setItem("loggedIn", true);
          window.location.href = "/";
          
          setIsLoading(false);
        }else{
          setDone(true);
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
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem', height:'1.5rem'}}>Sign In</h6>}
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
            <button className="btn1">{"Sign In"}</button>
            <Link to="/signup" style={{width:'100%', textDecoration:'none'}}><button className="btn1">{"Sign Up"}</button></Link>
            </div>
          <div className={classes.title}>
      
    </div>

      <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <p>
            Forgot Password? <Link to="/resetpassword" style={{textDecoration:'none'}}>click here</Link>
          </p>
        
        <div className={classes.formSubmit}>
            <div className={classes.formSubmitInside}/>
            <div className={classes.insideApp}>
            <Button type="submit" style={{marginRight:'.7%', backgroundColor:'#1976d2', color:'white'}}>Submit</Button>
            </div>
          </div>
        
      </form>
  </div>

      {isLoading ? (
             loader
          ) :
          (
            <div style={{marginLeft:'4%'}}>{done && <p>User not exist on TextUp!<br></br>Please Sign Up before Sign In</p>}</div>
        ) }
      <img src={TextUp} alt='Logo' style={{width:'7rem', height:'7rem', margin:'.1rem .5rem .5rem 0.5rem'}}></img>
     </div>
        </div>
        </div>
      )}
    </div>
  );
}
