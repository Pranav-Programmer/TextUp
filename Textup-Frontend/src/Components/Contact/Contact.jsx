import React from 'react'
import styles from './MyPage.module.css';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useState } from 'react';
import load from '../../img/load.gif'
import Navbar from '../Sidebar/Sidebar'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function Contact() {

  const [isLoading, setIsLoading] = useState(false);
  const loader = (
    <div className="loader">
      <img src={load} alt="loading"/>
    </div>
  );

  const form = useRef();
  const [done, setDone] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.sendForm('service_1rjd4jt', 'template_96pgakh', form.current, 'YGNYceF3vB1zC4aT_')
      .then((result) => {
          setDone(true);
          setIsLoading(false);
      }, (error) => {
          console.log(error.text);
      });
  };
  
  return (
    <div style={{backgroundColor:'linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)'}}>
    <div className={styles['my-page']} style={{margin:'0 0 0 0', padding:'0 .6rem 0 0', boxSizing:'border-box', width:'100%',}}>
      <div className='Nav' style={{position:'fixed' ,width:'100%', marginTop:'-.5rem', height:'2rem' ,zIndex:'1'}}>
      <Stack direction="row" style={{position:'fixed' ,width:'98.5%', height:'2rem' ,zIndex:'1'}}>
    <Navbar/>
      <Chip
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem'}}>Contact Us</h6>}
        variant="outlined"
        style={{flex:'1', height: '3rem', borderRadius:'5rem', margin:'.5rem 0 5rem .5rem', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)' }}
      />
    </Stack>
    </div>
      <div className='All-header' style={{margin:'.5rem 0 -1rem 0', fontWeight:'bolder', fontSize:'1.5rem'}}>CONTACT US</div>
      <div className={styles['container-c']} style={{overflowX:'hidden', paddingLetf:'-5rem'}}>
      <span className={styles['big-circle']}></span>
      
      <div className={styles['form']} data-aos="flip-left" data-aos-duration="3000" style={{transformOrigin: '0px 0px', zIndex:'0', marginTop:'2.5rem'}}>
        <div className={styles['contact-info']} style={{backgroundColor:'#e3e3e3'}}>
          <h3 className={styles['title']} style={{marginTop:'-1rem'}}>Let's get connected</h3>
          <p className={styles['text']}>
          Welcome to our Contact Us page! If you have any questions, comments, or concerns about our products or services, we're here to help.<br></br><br></br>
          Here's how to get in touch:<br></br>
          Fill out the contact form on this page: Simply enter your name, email address, mobile number (optional) and message, and click "Submit". We'll get back to you as soon as possible.<br></br><br></br>
          we're committed to providing you with prompt and helpful service. Thank you for choosing our service, and we look forward to hearing from you!
          </p>

        <div className={styles['social-media']} style={{marginTop:'-3rem'}}>
            <p style={{textAlign:'center'}}>Connect with me</p>
            <div className={styles['social-icons']} style={{justifyContent:'center'}}>
              <a href="https://www.facebook.com/yogesh.bari.1069" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/pranav_dharme_" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/pranav_dharme_/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://discordapp.com/users/pieCharm" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles['contact-form']}>
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form ref={form} onSubmit={sendEmail}>
            <h3 className={styles['title']}>Contact Us</h3>
            <div className={styles['input-container-c']}>
              <input type="text" name="name" className={styles['input']} placeholder='Name' pattern="[a-zA-Z]{3,50}" style={{width:'90%', fontSize:'1rem'}} required/>
            </div>
            <div className={styles['input-container-c']}>
              <input type="email" name="email" className={styles['input']} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" style={{width:'90%', fontSize:'1rem'}} required/>
            </div>
            <div className={styles['input-container-c']}>
              <input type="tel" name="mobile" className={styles['input']} placeholder='Mobile (optional)' pattern="[6-9]{1}[0-9]{9}" style={{width:'90%', fontSize:'1rem'}}/>
            </div>
            <div className={styles['input-container-c']}>
              <textarea name="message" className={styles['input']} placeholder='Message' pattern="[a-zA-Z]{500}" rows={10} style={{width:'90%', fontSize:'1rem'}} required></textarea>
            </div>
            <input type="submit" value="Send" className={styles['button s-button']} style={{background:'linear-gradient(180deg, #83f6e8 26.71%, #0C8A7B 99.36%)', boxShadow:'0px 5px 9px 1px rgba(37, 245, 183, 0.42)', borderRadius:'34px', border:'none', color:'white', fontSize:'1rem', padding:'11px 26px 11px 26px', marginBottom:'-2rem'}}/>
          </form>
          {isLoading ? (
             loader
          ) :
          (
          <span style={{fontWeight: 'bold', marginLeft:'6%', color:'#fff'}}>{done && "Thank you for Contacting us!"}</span>
        ) }
        </div>
      </div>
    </div>
    <div className={styles['blur-c']}></div>
    </div>
    </div>
  )
}

export default Contact

