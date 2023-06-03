const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
require("./notesDetails")
require("./imageDetails");
require("./feedbackDetails");
require("./verifyDetails")

const deleteImage = require('./deleteImage');

// Parse JSON request bodies
app.use(express.json());

const User = mongoose.model("UserInfo");
const Notes = mongoose.model("NotesDetails")
const Images = mongoose.model("ImageDetails");
const Feedback = mongoose.model("FeedbackDetails")
const verification = mongoose.model("VerifyDetails")

//Random OTP
function generateOTP() {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp.toString();
}

const Rotp = generateOTP();

app.post("/register", async (req, res) => {
  const { name, profession, email, password, mobile} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      profession,
      email,
      password: encryptedPassword,
      mobile,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Store and Send OTP

app.post("/storeOTP", async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await verification.create({
      email,
      otp: Rotp,
    });

    const VerificationOTP = Rotp;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Your email address through which you created account on nodemailer",
        pass: "Your email address password",
      },
    });

    var mailOptions = {
      from: "Your email address through which you created account on nodemailer",
      to: email,
      subject: "TextUp Email OTP Verification - Action Required",
      text: `Dear User,
    
Thank you for choosing TextUp service.To ensure the security of your account, we require you to verify your email address through OTP verification. Please follow the instructions below to complete the verification process:
  
Step 1: Open your email client and locate the email from TextUp.

Step 2: Open the email and find the OTP code provided.

Step 3: Return to the TextUp website and enter the OTP code in the designated verification field.
     
OTP Code: ${VerificationOTP}
  
Step 4: Click on the Verify button to complete the process.
  
Note: The OTP code is valid for a limited time and can only be used once. If you do not complete the verification process within the specified time, you may need to request a new OTP code.
  
Ensuring the security and privacy of our users' data is our top priority, and this additional layer of verification helps us maintain a safe environment for all TextUp users. If you have not initiated this verification process or suspect any unauthorized activity, please contact our support team immediately at Your email address through which you created account on nodemailer. We will assist you in securing your account.
  
Thank you for your cooperation in this matter. We apologize for any inconvenience caused during the verification process, but we believe these measures are essential to protect your account.
  
If you have any further questions or require assistance, please do not hesitate to reach out to our support team.
  
Best regards,
Pranav
TextUp Support Team`,
};
    

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Verify OTP
app.post("/verify-user", async (req, res) => {
  const { email, otp } = req.body;

  const user = await verification.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (Number(otp) === user.otp) {
    await verification.deleteOne({ email });
    const Verifytoken = jwt.sign({ email: user.email }, otp, {
      expiresIn: "1m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: Verifytoken });
    } else {
      return res.json({ error: "error" });
      await verification.deleteOne({ email });
    }
  }
  res.json({ status: "error", error: "Invalid OTP" });
});

// Login user
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "44640m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    // console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

app.post("/userNotesData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    // console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    Notes.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started");
  console.log(`App is running on port ${port}`);
});

// Get All User Notes Data

app.post("/notesData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    // console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;  
    Notes.find({ email: useremail })
    .then((data) => {
      res.send({ status: "ok", data: data });
    })

    .catch((error) => {
      res.send({ status: "error", data: error });
    });
    
  } catch (error) {
    console.log(error);
  }
});

// Upload User Notes

app.post("/upload-note", async (req, res) => {
  const { email, heading, description, link, image, Pid, formattedDate} = req.body;
  try {
    await Notes.create({ 
      email,
      heading,
      description,
      link,
      image,
      Pid,
      formattedDate,
    });
    res.send({ Status: "ok" })

  } catch (error) {
    res.send({ Status: "error", data: error });
  }
})

//Update User Notes

app.post("/notesUpdate", (req,res) => {
  // console.log(req.body)
  Notes.findByIdAndUpdate(req.body.id, {heading:req.body.heading, description:req.body.description, link:req.body.link},(err, data) =>{
    if(err){
      return res.status(500).send(err)
    }else{
      return res.status(200).send(data)
    }
  })
})

// Define the route for deleting an image
app.post('/delete-image', deleteImage);

// Upload User Feedback

app.post("/upload-feedback", async (req, res) => {
  const { feedback, rating} = req.body;
  try {
    await Feedback.create({ 
      feedback,
      rating,
    });
    res.send({ Status: "ok" })
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
})

// Get User Feedback

app.get("/feedbackData", async (req, res) => {
  try {  
    // const userfeedback = Feedback.rating;  
    Feedback.find()
    .then((data) => {
      res.send({ status: "ok", data: data });
    })

    .catch((error) => {
      res.send({ status: "error", data: error });
    });
    
  } catch (error) {
    console.log(error);
  }
});

// Change user password
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    res.send({ status: "ok" });
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `https://textup-backend.onrender.com/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Your email address through which you created account on nodemailer",
        pass: "Your email address password",
      },
    });

    var mailOptions = {
      from: "Your email address through which you created account on nodemailer",
      to: email,
      subject: "TextUp Password Reset - Action Required",
      text: `Dear User,

We have received a request to reset your password for your TextUp account. Your account security is of utmost importance to us, and we are here to assist you in this process.

To proceed with the password reset, please follow the instructions below:

Step 1: Click on the following link to access the TextUp password reset page 

${link}

Step 2: Once you are on the password reset page, enter your new desired password in the designated field.

Step 3: Confirm your new password by re-entering it in the provided field.

Step 4: Click on the "Reset Password" button to complete the process.

Please note that for security reasons, the password reset link will expire after a certain period. If you are unable to reset your password within that timeframe, you may need to request another password reset email.

If you did not initiate this password reset request or suspect any unauthorized activity, please contact our support team immediately at Your email address through which you created account on nodemailer. We will investigate the matter promptly and assist you accordingly.

Ensuring the security and privacy of our users data is our top priority, and we appreciate your cooperation during this process. We apologize for any inconvenience caused.

If you have any further questions or require assistance, please do not hesitate to reach out to our support team. We are here to help.

Best regards,
Pranav
TextUp Support Team`, 
};

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });
    // console.log(link);
  } catch (error) { }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  // console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

// Change user email

app.post("/change-email", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    res.send({ status: "ok" });
    const newmail = oldUser.email;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, newmail, {
      expiresIn: "5m",
    });
    const link = `https://textup-backend.onrender.com/change-email/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Your email address through which you created account on nodemailer",
        pass: "Your email address password",
      },
    });

    var mailOptions = {
      from: "Your email address through which you created account on nodemailer",
      to: email,
      subject: "TextUp Email Change Request - Action Required",
      text: `Dear User,

We have received a request to change the email address associated with your TextUp account. Your account security is of utmost importance to us, and we are here to assist you in this process.

To proceed with the email change, please follow the instructions below:

Step 1: Click on the following link to access the TextUp email change page

${link}

Step 2: Once you are on the email change page, enter your new email address in the designated field.

Step 3: Confirm your new email address by re-entering it in the provided field.

Step 4: Click on the "Change Email" button to complete the process.

Please note that this link is valid for a limited time and can only be used once. If you are unable to change your email address within that timeframe, you may need to request another email change link.

If you did not initiate this email change request or suspect any unauthorized activity, please contact our support team immediately at Your email address through which you created account on nodemailer. We will investigate the matter promptly and assist you accordingly.

Ensuring the security and privacy of our users' data is our top priority, and we appreciate your cooperation during this process. We apologize for any inconvenience caused.

If you have any further questions or require assistance, please do not hesitate to reach out to our support team. We are here to help.

Best regards,
Pranav
TextUp Support Team`,
};

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });
    // console.log(link);
  } catch (error) { }
});

app.get("/change-email/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  // console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const newmail = oldUser.email;
  try {
    const verify = jwt.verify(token, newmail);
    res.render("index2", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/change-email/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { email } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const newmail = oldUser.email;
  try {
    const verify = jwt.verify(token, newmail);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          email: email,
        },
      }
    );

    res.render("index2", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

// Get All User Data

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

// Delete user

app.post("/deleteUser", async (req, res) => {
  const { email } = req.body;
  try {
    User.deleteOne({ email: email }, function (err, res) {
      console.log(err);
    });
    Notes.deleteMany({ email: email }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Account Deleted" });
  } catch (error) {
    console.log(error);
  }
});

// Remove Notes

app.post("/removeNotes", async (req, res) => {
  const { userid } = req.body;
  try {
    Notes.findOne({ _id: userid })
    Notes.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

// Upload User Image

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" })

  } catch (error) {
    res.send({ Status: "error", data: error });

  }
})

// Get User Image

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({ status: "ok", data: data })
    })

  } catch (error) {

  }
})
