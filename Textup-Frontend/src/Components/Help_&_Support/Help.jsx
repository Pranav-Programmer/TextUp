import React from "react";
import "./styles.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';

function preventCopyCutPasteRightClick(e) {
  e.preventDefault();
}
function preventCtrlA(e) {
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault();
  }
}

const Help = ({faq, index, toggleFAQ }) => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500])
      }));
    
  return (
    <div onCopy={preventCopyCutPasteRightClick} onCut={preventCopyCutPasteRightClick} onPaste={preventCopyCutPasteRightClick} onContextMenu={preventCopyCutPasteRightClick} onKeyDown={preventCtrlA}>
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
    > 
      <div className="faq-question">
        <div className="container1">
        {faq.question}
        </div>
        <div className="container2">
      <ColorButton onClick={() => toggleFAQ(index)}  variant="contained" style={{flex: 1, borderRadius:'.5rem', height: "25px"}}>{faq.open ? "-": "+"}</ColorButton>
      </div>
      </div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
    </div>
  );
};

export default Help;
