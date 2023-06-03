import React from 'react'
import './About.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Navbar from '../Sidebar/Sidebar'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import App from '../../img/App.png'

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

function preventCopyCutPasteRightClick(e) {
  e.preventDefault();
}
function preventCtrlA(e) {
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault();
  }
}

function About() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  return (
    <div>
        <Stack direction="row" className='Nav'>
    <Navbar/>
      <Chip
        label={<h6 style={{color:'#ffffff', fontSize:'1.2rem', fontWeight:'bold', flexWrap:'wrap', paddingLeft:'.5rem'}}>About TextUp</h6>}
        variant="outlined"
        style={{flex:'1', height: '3rem', borderRadius:'5rem', margin:'.5rem .5rem 0 .5rem', backgroundImage: 'linear-gradient(to right, #005AA7, #5a66c5)' }}
      />
    </Stack>
    
    <div onCopy={preventCopyCutPasteRightClick} onCut={preventCopyCutPasteRightClick} onPaste={preventCopyCutPasteRightClick} onContextMenu={preventCopyCutPasteRightClick} onKeyDown={preventCtrlA}>
    <div style={{height:'93.6vh',overflow:'hidden', background:'linear-gradient(142.4deg, rgb(139, 98, 188) 1%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 99.5%, rgb(176, 239, 244) 89.1%)', marginTop:'-.1rem'}}>
    <div className='About'>
        <h4 className='Heading-A'>About</h4>
        <div className="Version">
          <img src={App} alt="App" className='AppIcon'></img>
          <div className="AppVersion">
          <h4 className='AppVersionText'>App Version</h4>
          <p style={{display:'flex', marginTop:'-1.1rem'}}>1.0.0</p>
          </div>
        </div>

        <div className="Update">
          <SecurityUpdateGoodIcon className='AppIcon2'/>
          <div className="AppVersion">
          <h4 className='AppVersionText'>Last Updated</h4>
          <p style={{display:'flex', marginTop:'-1.1rem'}}>30 May 2023</p>
          </div>
        </div>

        <div className="Size">
          <LineWeightIcon className='AppIcon2'/>
          <div className="AppVersion">
          <h4 className='AppVersionText'>Application Size</h4>
          <p style={{display:'flex', marginTop:'-1.1rem'}}>7.4MB</p>
          </div>
        </div>
    </div>

    <div className='About'>
        <h4 className='Heading-A'>Legal</h4>
        <div className="Update">
          <InfoIcon className='AppIcon2' onClick={handleOpen}/>
          <div className="AppVersion2">
          <h4 className='AppVersionText' onClick={handleOpen}>Terms of Use</h4>
          </div>
        </div>

        <div className="Policy">
          <VerifiedUserIcon className='AppIcon2'onClick={handleOpen2}/>
          <div className="AppVersion2">
          <h4 className='AppVersionText' onClick={handleOpen2}>Privacy Policy</h4>
          </div>
        </div>
    </div>
    </div>

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{width:'75%', height:'76%', marginTop:'3.5%'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center', marginBottom:'1.5rem', marginTop:'-1.8rem'}}>
          Terms of Use
          </Typography>
          <Typography id="modal-modal-description" style={{textAlign:'justify', margin:'-1rem', height:'103%', overflow:'scroll'}}>
          
          Please read these Terms of Use ("Agreement") carefully before using the TextUp ("TextUp" or "the Service"). This Agreement sets forth the legally binding terms and conditions for your use of TextUp.
          <br></br><br></br>
          1. Acceptance of Terms<br></br>
          By accessing or using TextUp, you agree to be bound by this Agreement and all applicable laws and regulations. If you do not agree with any part of this Agreement, you must not use TextUp.
          <br></br><br></br>
          2. Use of Services<br></br>
          a. TextUp provides a platform for storing and managing text-based notes and associated images. The Service is provided on an "as is" basis, and we do not guarantee its availability, functionality, or accuracy.<br></br>
          b. You may use TextUp for personal purposes in accordance with this Agreement. You may not use TextUp for any unlawful or unauthorized purpose.
          <br></br><br></br>
          3. Account Registration<br></br>
          a. Creating an account on TextUp is optional. However, certain features, such as saving notes and accessing them from multiple devices, may require signing up.<br></br>
          b. If you choose to create an account, you are responsible for maintaining the confidentiality of your account information, including your login credentials.
          <br></br><br></br>
          4. User Content<br></br>
          a. By submitting or uploading content to TextUp, you retain ownership of the content. However, you grant TextUp a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content for the purposes of providing the Service.<br></br>
          b. You are solely responsible for the content you upload, and you must ensure that it does not infringe upon the rights of any third party or violate any applicable laws or regulations.
          <br></br><br></br>
          5. Data Privacy<br></br>
          a. TextUp respects your privacy and handles your personal information in accordance with its Privacy Policy.<br></br>
          b. While TextUp takes reasonable measures to protect user data, we cannot guarantee the security of information transmitted through the internet. You understand and acknowledge this inherent risk.
          <br></br><br></br>
          6. Account Deletion<br></br>
          a. When you choose to delete your TextUp account, all your notes' data, including headings, text, and links, will be permanently deleted. However, please note that if you have uploaded images in certain notes, those images will not be automatically deleted with the account deletion.<br></br>
          b. To remove the images associated with specific notes, you will need to delete those notes individually. We recommend reviewing your notes and ensuring any image-containing notes are deleted before proceeding with the account deletion.
          <br></br><br></br>
          7. Termination<br></br>
          a. You may terminate your TextUp account at any time by following the account deletion process provided in the Service.<br></br>
          b. TextUp reserves the right to terminate or suspend your access to the Service at any time, without prior notice, if you violate this Agreement or engage in any unauthorized use of TextUp.
          <br></br><br></br>
          8. Disclaimer<br></br>
          a. TextUp makes no warranties or representations about the accuracy, reliability, or suitability of the Service for any purpose. You use TextUp at your own risk.<br></br>
          b. In no event shall TextUp be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to the use of the Service.
          <br></br><br></br>
          9. Modifications to the Agreement<br></br>
          TextUp reserves the right to modify or update this Agreement at any time without prior notice. It is your responsibility to review this Agreement periodically. Continued use of TextUp after any modifications shall constitute your consent to the updated Agreement.
          <br></br><br></br>
          10. Governing Law<br></br>
          This Agreement shall be governed by and construed in accordance with the laws. Any legal action or proceeding arising out of or related to this Agreement shall be brought exclusively in the courts.
          
          </Typography>
        </Box>
      </Modal>
    </div>

    <div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{width:'75%', height:'76%', marginTop:'3.5%'}}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center', marginBottom:'1.5rem', marginTop:'-1.8rem'}}>
          Privacy Policy
        </Typography>
        <Typography id="modal-modal-description" style={{textAlign:'justify', margin:'-1rem', height:'103%', overflow:'scroll'}}>
          
          This Privacy Policy governs the manner in which TextUp collects, uses, maintains, and discloses information collected from users ("User" or "you") of the TextUp ("TextUp" or "the Service").
          <br></br><br></br>
          1. Information Collection<br></br>
          a. Personal Identification Information: We may collect personal identification information from Users in various ways, including when Users voluntarily provide information through the Service, such as when creating an account or submitting content.<br></br>
          b. Non-Personal Identification Information: We may collect non-personal identification information about Users whenever they interact with TextUp. This may include browser name, device type, and technical information about Users' means of connection to TextUp.
          <br></br><br></br>            
          2. Data Usage<br></br>
          a. TextUp collects and uses personal information for the following purposes:<br></br>          
          To provide and improve the Service: We may use the information you provide to personalize your experience and improve TextUp's features and functionality.<br></br>
          To send periodic emails: We may use the email address provided to respond to inquiries, questions, and other requests.
          <br></br><br></br>
          3. Data Protection<br></br>
          a. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, and data stored on TextUp.<br></br>
          b. However, please be aware that no security measures are 100% secure, and we cannot guarantee the absolute security of your data.
          <br></br><br></br>            
          4. Sharing of Personal Information<br></br>
          a. We do not sell, trade, or rent Users' personal identification information to others.<br></br>
          b. We may share generic aggregated demographic information that does not include personal identification information with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
          <br></br><br></br>            
          5. Third-Party Websites<br></br>
          a. Users may find advertising or other content on TextUp that links to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties.<br></br>
          b. We do not control the content or links that appear on these third-party sites and are not responsible for the practices employed by websites linked to or from TextUp.
          <br></br><br></br>            
          6. Changes to this Privacy Policy<br></br>
          a. TextUp has the discretion to update this Privacy Policy at any time. We encourage Users to frequently check this page for any changes.<br></br>
          b. You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications.
          <br></br><br></br>            
          7. Your Acceptance of these Terms<br></br>
          By using TextUp, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, please do not use TextUp.

          </Typography>
        </Box>
      </Modal>
    </div>
    </div>
    </div>
  )
}

export default About
