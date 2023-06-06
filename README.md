# TextUp - Note-Taking Application

TextUp is a versatile note-taking application designed to help users conveniently store and manage their notes with added features for image storage. It provides a seamless user experience through its web-based interface and Android application.

## Purpose

The purpose of TextUp is to offer users a reliable platform for capturing and organizing their notes efficiently. With TextUp, users can access their notes from any device, ensuring their data is readily available whenever and wherever they need it.

## Features

- Note Storage: TextUp allows users to create and store text-based notes securely. The application provides a user-friendly interface for managing and organizing notes effectively.
- Image Storage: Users can enhance their notes by storing images alongside text. Image uploads are supported, with a maximum size limit of 200KB, using the Cloudinary media management platform.
- User Authentication: TextUp offers user authentication, ensuring data privacy and security. Users can create an account, which enables them to save their notes and access them from any device.
- Cross-Platform Access: TextUp provides both a web interface and an Android application. Users can access their notes and utilize TextUp's features seamlessly across different devices.
- Search Functionality: TextUp includes a search feature that allows users to search for notes based on their headings and text content, enabling quick retrieval of specific information.
- Profile Customization: Users have the option to personalize their profile by adding a profile image. However, profile images are stored locally and need to be set again if the app is uninstalled or data is cleared.


## Getting Started

To get started with TextUp, simply download the Android application from the GitHub repository and install it on your Android device. Alternatively, you can visit the TextUp website and access your notes using the web interface.

## Feedback and Support

We value your feedback! If you have any questions, comments, or concerns about TextUp or its features, please don't hesitate to contact us through our "Contact Us" page or connect with us on social media. We appreciate your feedback and strive to provide the best possible user experience.

## Prerequisites to run this project on your local system

Before installing and running the TextUp project on your local system, ensure you have the following prerequisites:

1. Node.js: Make sure you have Node.js installed on your machine. You can download and install Node.js from the official website: https://nodejs.org

2. MongoDB: TextUp uses MongoDB as its database. Visit the MongoDB Atlas website at https://www.mongodb.com/, setup your account, create a cluster, copy your mongoDB URI and paste it at safe place, because we need it while setting up backend of this application.

3. Cloudinary Account: To enable image storage functionality, you need a Cloudinary account. Sign up for a free account at https://cloudinary.com and obtain your API credentials.

4. Nodemailer Account: Create account on nodemailer https://nodemailer.com/ by following all the steps.

5. TextUp Repository: Clone or download the TextUp repository from GitHub to your local system.

```bash
  git clone https://github.com/Pranav-Programmer/TextUp.git
```

6. You can delete TextUp-App folder, TextUp.apk and README.md file because we don't need them.
## Run Locally  - TextUp Application

### Backend Setup

1. Open the Textup-Backend folder and locate the '.env' file.
2. Make the following changes in the '.env' file:

```bash
  MONGODB_URI='Your MongoDB URI'
  cloud_name = 'Your Cloudinary Cloud Name'
  api_key = 'Your Cloudinary API Key'
  api_secret = 'Your Cloudinary API Secret'
```

Replace the values 'Your MongoDB URI', 'Your Cloudinary Cloud Name', 'Your Cloudinary API Key', and 'Your Cloudinary API Secret' with your respective credentials.

3. Open the 'app.js' file in the Textup-Backend folder.
4. Locate the following code snippet in the 'app.js' file:

```bash
   var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Your email address through which you created account on nodemailer",
        pass: "Your email address password",  //create temporary password, try not to use your actual password to ensure safety
      },
    });

    var mailOptions = {
      from: "Your email address through which you created account on nodemailer",
      to: email,
      subject: "TextUp Email OTP Verification - Action Required",
      text: `Dear User,
```

5. Update the email configuration by replacing the placeholders with your email address and password. Modify the code snippet mentioned in step 4 on the following lines:
- Line 100, 101, 106
- Line 372, 373, 378
- Line 486, 487, 492

### Backend Setup Instructions

1. Open a terminal or command prompt.
2. Navigate to the Textup-Backend folder.
3. Run the following command to install the project's dependencies:

```bash
  npm install
```

4. Start the backend server by running the following command:

```bash
  nodemon app
```

* Note: Ensure that you do not change the port or any API names in the 'app.js' file. If you make any changes, make sure to update the corresponding files in the Textup-Frontend as well.

### Frontend Setup

1. Open the Textup-Frontend folder in your code editor.
2. Inside Textup-Frontend folder Open file 'UserHome.jsx' which is located inside 'src\Components\Home' folder.
3. Locate the following code snippet in the 'UserHome.js' file: 

```bash
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/Your_Cloudinary_Cloud_Name/image/upload',
        formData
      );

      setImage(res.data.secure_url);
      setPid(res.data.secure_url.substring(res.data.secure_url.lastIndexOf('/') + 1, res.data.secure_url.lastIndexOf('.')))
    } catch (err) {
      console.error(err);
    }};
```
4. Update the Cloudinary configuration by replacing the placeholders with your Your_Cloudinary_Cloud_Name. Modify the code snippet mentioned in step 3 on the line 272

5. Open a terminal or command prompt.
6. Navigate to the Textup-Frontend folder.
7. Run the following command to install the project's dependencies:

```bash
  npm install
```
8. Start the frontend development server by running the following command:

```bash
  npm start
```

### Access the TextUp Application

1. Open your web browser.
2. Visit http://localhost:3000 to access the TextUp application.

By following these instructions, you will be able to run the TextUp application locally on your machine.

## Usage

### 1. Creating a User Account

Visit the TextUp website or open the Android application.
Click on the "Sign Up" button.
Before Sign Up once read "Terms of Use" and "Privacy Policy"
Provide a valid email address and follow the instructions to complete the account registration process.
Once registered, you can log in using your email and password.

### 2. Managing User Account

After logging in, you can manage your account settings by clicking on the "Profile" section.
From there, you can update your email and password.

### 3. Adding a Note

To create a new note, click on the "+" button on Home page.
Enter a heading for the note.
Write the content of your note in the provided text field.
Add link in provided field.
Optionally, you can upload an image related to the note.
Click the "ADD" button to store the note.

### 4. Managing Notes

To view all your notes, go to the Home page.
The notes will be displayed in a list format.
To see your note click on heading or text or image.
To edit a note, click on its edit button, make the necessary changes, and save them.
To delete a note, locate the note in the list and click on the Remove button.

### 5. Searching for Notes

To search for specific notes, use the search functionality provided.
Enter keywords related to the note's heading or content in the search bar.
The application will display relevant notes matching your search query.

### 6. Contact us page

Use the contact form on contact us page to connect with us if you have any doubt or suggestion.



https://github.com/Pranav-Programmer/TextUp/assets/79044490/5361d7e2-aee6-4cc3-89a7-d314f3a291e8



## Contributing

Contributions are always welcome!

### 1. Submitting Bug Reports:

- If you encounter a bug or issue while using the TextUp application, report it to the development team.
- Go to the TextUp project repository on GitHub.
- Click on the "Issues" tab.
- Check if the bug has already been reported. If not, click on the "New Issue" button.
- Provide a descriptive title and detailed description of the bug.
- Include steps to reproduce the issue, any error messages, and relevant information about your operating system and browser (if applicable).
- Submit the issue, and the development team will review and address it.

### 2. Feature Requests:

- If you have an idea for a new feature or enhancement to the TextUp application, you can submit a feature request.
- Go to the TextUp project repository on GitHub.
- Click on the "Issues" tab.
- Check if the feature has already been requested. If not, click on the "New Issue" button.
- Provide a clear title and detailed description of the feature you would like to see implemented.
- Explain the rationale behind the feature and any potential benefits it would bring.
- Submit the feature request, and it will be reviewed by the development team.

### 3. Pull Requests:

- If you want to contribute code changes or fixes to the TextUp application, you can submit a pull request.
- Fork the TextUp repository on GitHub to create your own copy of the project.
- Create a new branch in your forked repository for your changes.
- Make the necessary code changes in your branch, following the project's coding conventions and guidelines.
- Test your changes to ensure they work as expected and do not introduce new issues.
- Commit your changes with clear and descriptive commit messages.
- Push your branch to your forked repository.
- Go to the original TextUp repository and click on the "New Pull Request" button.
- Select your branch and provide a clear description of the changes you made.
- Submit the pull request, and it will be reviewed by the project maintainers.
- Be open to feedback and iterate on your changes if required.

Happy contributing!
