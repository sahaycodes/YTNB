import logo from './components/assests/YTNB.png';
import './App.css';
import { Navbar1 } from './components/NavBar.js';
import {Banner} from './components/Banner.js'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <Navbar1/>
      <Banner />
     
    </div>
  );
}

export default App;
