import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar1 } from './components/NavBar.js';
import { Banner } from './components/Banner.js';
import { Library } from './components/Library';
import 'bootstrap/dist/css/bootstrap.min.css';
import { YourNotes } from './components/YourNotes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { StudyRoom } from './components/StudyRoom.js';
import { PrivateStudy } from './components/PrivateStudy';

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar1 />
        <Routes>
          <Route path="/" exact component={<PrivateStudy />} />
          <Route path="/video-chat/:roomCode" component={<StudyRoom/>} />
          </Routes>
            <Banner />
            <YourNotes />
            <StudyRoom />
            <Library />
  
      
      </div>
    </Router>
  );
}

export default App;

