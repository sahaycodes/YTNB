import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import { Navbar1 } from './components/NavBar.js';
import {Banner} from './components/Banner.js'
import {Library} from './components/Library';
import 'bootstrap/dist/css/bootstrap.min.css';
import {YourNotes} from './components/YourNotes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';

const app=initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Navbar1/>
      <Banner />
      <YourNotes />
      <Library />
     
    </div>
  );
}

export default App;
