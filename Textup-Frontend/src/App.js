import './App.css';
import {} from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from './img/user.png'
import Home from './Components/Home/Home';
import UserHome from './Components/Home/UserHome'
import Contact from './Components/Contact/Contact';
import Profile from './Components/Profile/profile';
import About from './Components/About/About';
import HelpInfo from './Components/Help_&_Support/HelpInfo'
import Feedback from './Components/Feedback/Feedback'
import Login from "./Components/Auth/login_component";
import SignUp from "./Components/Auth/signup_component";
import Resetpassword from "./Components/Auth/resetpassword";
import Resetmail from "./Components/Auth/resetmail";
import ImageUpload from './Components/ImageUpload/imageUpload.';
import AdminHome from './Components/Profile/AdminHome';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  const [image, setImage] = useState("");
  const [logged, setLogged] = useState(true);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    } else {
      setImage(user); // default image path
    }

    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);

        if (data.data === "token expired") {
          setLogged(false);
        }
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/profile/adminhome" element={logged && userData.email === "pranavdharme10@gmail.com" ? <AdminHome /> : <Profile image={image} setImage={setImage}/> } />
        <Route exact path='/profile/login' element={<Login />} />
        <Route exact path="/profile" element={logged ? <Profile image={image} setImage={setImage}/> : <Login />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path='/helpInfo' element={<HelpInfo />} />
        <Route exact path='/feedback' element={<Feedback />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/resetpassword' element={<Resetpassword />} />
        <Route exact path='/resetmail' element={<Resetmail />} />
        <Route exact path='/imageupload' element={<ImageUpload />} />
        <Route exact path="/" element={logged ?  <QueryClientProvider client={queryClient}><UserHome image={image} /></QueryClientProvider> : <Home />}/>
      </Routes>
    </div>
  );
}

export default App;
