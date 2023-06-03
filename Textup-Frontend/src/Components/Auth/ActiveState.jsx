import { CheckCircle } from '@mui/icons-material'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 Component1:{
  background: '#1976d2', 
  marginRight: '5px', 
  padding: '5px 11px ', 
  color: 'white', 
  fontStyle: 'normal', 
  borderRadius: '50%'
},
  Component2:{
  background: '#444', 
  marginRight: '5px', 
  padding: '5px 11px ', 
  color: 'white', 
  fontStyle: 'normal', 
  borderRadius: '50%'
}
}));
function ActiveState(props) {
const classes = useStyles();
  if(props.step===0){
    if(props.activeStep>0){
      return <CheckCircle sx={{fontSize: '30px', marginRight: '5px', color:"#1976d2"}} />;
    }
    else{
      return <i className={classes.Component1}>{props.step+1}</i>;
    }
  }
  else if(props.step===1){
    if(props.activeStep<=2){
      return <i className={classes.Component1}>{props.step+1}</i>;
    }
    else{
      return <CheckCircle sx={{fontSize: '30px', marginRight: '5px', color:"#1976d2"}} />;
    }
  }
  else {
    if(props.formSubmitted){
       return  <CheckCircle sx={{fontSize: '30px', marginRight: '5px', color:"#1976d2"}} />
    }
    else{
      return <i className={classes.Component1}>{3}</i>;
    }
  }
}

export default ActiveState
