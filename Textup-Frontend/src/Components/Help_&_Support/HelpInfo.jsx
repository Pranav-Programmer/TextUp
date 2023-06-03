import React, { useState} from "react";
import "./styles.css";
import FAQ from "./Help";
import Navbar from '../Sidebar/Sidebar'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

export default function HelpInfo() {

    const [faqs, setFaqs] = useState([
        {
            question: "Do I need to sign up to use TextUp?",
            answer:
              "No, signing up is not required to use the basic services of TextUp. However, signing up is recommended if you want to save your notes data and access it from any device and location.",
            open: true
          },
        {
          question: "Can I store images with my notes on TextUp?",
          answer:
            "Yes, you can store images with your notes on TextUp. However, image storage is only available for users who have signed up for an account.",
          open: false
        },
        {
          question: "What happens to my data if I uninstall the TextUp app?",
          answer: "If you uninstall the app but remember your ID and password, your data will remain secure and accessible. However, if you uninstall the app and clear its data, your data will be lost unless you have signed up and saved it.",
          open: false
        },
        {
          question:
            "Can I change my profile image on TextUp?",
          answer: "TextUp does not save user profile images. If you uninstall the app or clear its data, your profile image will be lost, and you will need to set it again.",
          open: false
        },
        {
            question:
              "Is providing a mobile number mandatory for creating a TextUp account?",
            answer: "No, providing a mobile number is optional. It is mainly used for improving the profile appearance, but it is not required to create an account on TextUp.",
            open: false
          },
        {
            question:
              "What is the purpose of the User Designation field during sign up?",
            answer: "The User Designation field helps us understand our users and make future updates to TextUp according to user needs and preferences.",
            open: false
          },
          {
            question:
              "Can I delete my account and what happens to my data?",
            answer: "Yes, you can delete your account on TextUp. When you delete your account, all your data at that moment is permanently deleted from our database, and it cannot be retrieved.",
            open: false
          },
          {
            question:
              "Is there a limit on the size of images I can upload on TextUp?",
            answer: "Yes, currently the image upload size limit on TextUp is 200kb. There may be future updates that increase this limit.",
            open: false
          },
          {
            question:
              "Where are the images stored on TextUp?",
            answer: "TextUp stores your images on a third-party cloud platform and saves only the link to the image. Please note that if the image fails to upload or update, the platform may not receive the image link.",
            open: false
          },
          {
            question:
              "Can I edit my notes on TextUp?",
            answer: "Yes, you can edit the headings, text, and links of your notes on TextUp. However, currently, you cannot change the image associated with your text.",
            open: false
          },
          {
            question:
              "Is there a search functionality on TextUp?",
            answer: "Yes, TextUp provides a search functionality on the home page. You can search for your notes based on headings and text, but the search does not include links and dates.",
            open: false
          },
          {
            question:
              "Can I change my email and password after signing up?",
            answer: "Yes, you can change your email and password at any time after signing up on TextUp. This gives you the flexibility to update your account information as needed.",
            open: false
          },
          {
            question:
              "What should I do if I have questions or concerns about TextUp?",
            answer: "If you have any questions, comments, or concerns about TextUp, you can reach out to us using the contact us page or connect with us through our social media accounts provided on the contact page.",
            open: false
          },
          {
            question:
              "Is my data secure on TextUp?",
            answer: "Yes, we take the security of your data seriously. Your data on TextUp is stored securely, and even if you uninstall the app, your data remains protected as long as you remember your ID and password. We recommend reading our Terms of Use and Privacy Policy for more information on how we handle and protect your data.",
            open: false
          },
          {
            question:
              "Can I retrieve deleted data from TextUp?",
            answer: "No, once you delete your data on TextUp, it cannot be retrieved. We strongly advise caution when deleting your account or data to avoid permanent loss.",
            open: false
          },
          {
            question:
              " How can I provide feedback or rate TextUp?",
            answer: "We value your feedback! You can provide feedback and rate TextUp on our dedicated feedback page. Your input helps us improve our products and services.",
            open: false
          },
          {
            question:
              "Where can I find the Terms of Use and Privacy Policy for TextUp?",
            answer: "You can find the Terms of Use and Privacy Policy on the About Us page of TextUp. We recommend reading them before signing up to understand our policies and guidelines.",
            open: false
          },
          {
            question:
              "What should I do if my notes or images are not getting uploaded or updated?",
            answer: "If you experience issues with notes not being uploaded or images not updating, it could be due to a slow network connection. We recommend trying to upload your notes again and waiting for some time, even after seeing the image uploaded message. If the problem persists, please contact our support team for assistance.",
            open: false
          },
          {
            question:
              "Can I upload images larger than 200kb in the future?",
            answer: "Currently, the image upload size limit on TextUp is 200kb. While we do not support larger image uploads at the moment, it is possible that we may increase the image upload size in future updates.",
            open: false
          },
          {
            question:
              "How can I change my email and password on TextUp?",
            answer: "After signing up on TextUp, you can change your email and password by accessing your account settings. Look for the options to modify your email and password, and follow the instructions provided to make the desired changes.",
            open: false
          }
      ]);

  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div className="HelpInfo">
       <Stack direction="row" className="Nav" style={{position:'fixed' ,width:'100%', backgroundColor:'#fff', zIndex:'1'}}>
    <Navbar/>

      <Chip
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem'}}>FAQ Page</h6>}
        variant="outlined"
        style={{flex:'1', height: '3rem', borderRadius:'5rem', margin:'.5rem .5rem -1.5rem .5rem',backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)' }}
      />
    </Stack>

      <div className="faqs" style={{background:'linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)'}}>
      <Link to="/contact">
   <Item style={{backgroundColor:'#e3e3ec', display:'flex', height:'2.6rem', borderRadius:'1rem', zIndex:'0', marginTop:'3rem', marginBottom:'-.7rem'}}>
      <ControlPointRoundedIcon style={{fontSize:'3rem', flex:1}}/>
      <ControlPointRoundedIcon style={{fontSize:'3rem', flex:1000}}/>
      <ControlPointRoundedIcon style={{fontSize:'3rem', flex:1}}/>
    </Item>
    </Link>
      <div className="faqcontainer">
        {faqs.map((faq, index) => (
          <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
    </div>
  );
}
