import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextUp from '../../img/TextUp.png';
import load from '../../img/load.gif'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
  label: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#4caf50',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  ratingStack: {
    display: 'flex',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: '3rem',
    color: '#f44336',
    margin: theme.spacing(1),
  },
  ratingIconEmpty: {
    fontSize: '3rem',
    color: 'gray',
    margin: theme.spacing(1),
    backgroundColor:'#fff',
    borderRadius:'50%',
  },
}));

function FeedbackPage() {
  const styles = {
    background: 'linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)',
    // Height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    paddingTop:'3rem',
  };

  const [isLoading, setIsLoading] = useState(false);
  const loader = (
    <div className="loader">
      <img src={load} alt="loading"/>
    </div>
  );

  const classes = useStyles();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [done, setDone] = useState(false);
  const [data, setData] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(rating !== 0 && feedback !== ''){
    fetch("https://textup-backend.onrender.com/upload-feedback", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        feedback,
        rating,
      }),
    })
      .then((res) => {
          setIsLoading(true);
          setDone(true);
          setIsLoading(false);
        fetchFeedbackData();
        return res.json()
      })
      .then((data) => {
        if (data.status === "ok") {
          setIsLoading(true);
          // TODO: Handle submission logic here
          setDone(true);
          setIsLoading(false);
        }
      });
}
else{
          setIsLoading(true);
          // TODO: Handle submission logic here
          setData(true);
          setIsLoading(false);
}};

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const [feedbackData, setFeedbackData] = useState([]);

  const fetchFeedbackData = () => {
    fetch("https://textup-backend.onrender.com/feedbackData", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.data);
      });
  }

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const [avg, setAvg] = useState("")

  useEffect(()=>{
    const sum = feedbackData.reduce((acc, curr) => acc + curr.rating, 0);
    setAvg((sum / feedbackData.length).toFixed(2));

  }, [feedbackData])

  return (
    <div>
        <Stack direction="row" style={{position:'fixed' ,width:'98.5%', backgroundColor:'linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)', height:'2rem' ,zIndex:'1'}}>
        <Link to="/" style={{color:'#707070'}}><KeyboardReturnIcon style={{color:'#ffffff', position:'fixed', margin:'1.2rem', fontWeight:'bolder', zIndex:'10'}}/></Link>
      <Chip
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem'}}>Feedback</h6>}
        variant="outlined"
        style={{flex:'1', height: '3rem', borderRadius:'5rem', margin:'.5rem 0 5rem .5rem', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)', zIndex:'1'}}
      />
    </Stack>
    <Box style={styles} minHeight="96.5vh" display="flex" alignItems="center">
      <Box mx="auto" width={380} marginTop={5} style={{zIndex:'0'}}>
        <form onSubmit={handleSubmit} className={classes.form} style={{backgroundColor:'#d8e7f5'}}>
          <Typography variant="h5" align="center" gutterBottom >   
            Leave your feedback
          </Typography>
          <div className={classes.ratingContainer}>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
              style={{ fontSize: '3rem', color: '#ffc107' }}
              emptyIcon={<StarBorderIcon className={classes.ratingIconEmpty} />}
              icon={<StarIcon className={classes.ratingIcon} />}
              halficon={<StarHalfIcon className={classes.ratingIcon} />}
              aria-required
            />
          </div>
          <TextField
            name="feedback"
            label="Feedback"
            variant="outlined"
            multiline
            minRows={5}
            className={classes.input}
            value={feedback}
            onChange={handleFeedbackChange}
            aria-required
            InputProps={{
              style: {
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #ccc',
              },
            }}
          />
          <Button
            type="submit"
              variant="contained"
              style={{backgroundColor:'lightseagreen', color:'white', fontSize:'1rem', border: '2px solid'}}
              className={classes.button}
            >
              Submit
            </Button>
            <div>
            </div>
          </form>
          <div style={{paddingTop:'1rem'}}>
          </div>
        </Box>
        <Box mx="auto" width={380} style={{zIndex:'0'}}>
        <div style={{backgroundColor:'#d8e7f5', borderRadius:'10px', height:'13rem'}}>
            <img src={TextUp} alt='Logo' style={{width:'6rem', height:'6rem', margin:'1rem 0 0 0'}}></img>
            <div>
              {avg !== 'NaN' ? (
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '9.6rem' }}>
                <h5 style={{ color: 'gray', fontSize: '1.2rem', marginRight: '.5rem' }}>
                  {avg}
                </h5>
                <StarIcon style={{ color: 'goldenrod', fontSize: '1.8rem' }} />
              </div>
            ) : loader}
            </div>
            <div style={{paddingTop:'2rem'}}>
          {isLoading ? (
             loader
          ) :
          (
          <span style={{fontWeight: 'bold', marginLeft:'6%', color:'gray', paddingTop:'1rem'}}>{done && "Thank you for your valuable feedback !!"}{data && "Please give rating with feedback"}</span>
        ) }
          </div>
          </div>
        </Box>
      </Box>
      </div>
);
}

export default FeedbackPage;      
