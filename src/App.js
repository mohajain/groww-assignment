// import logo from './logo.svg';
import './App.css';
import InfoTable from "./components/InfoTable";
import CityFilter from "./components/CityFilter";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <div className="App">
    <Navbar/>
      <CityFilter/>
    </div>
  );
}

export default App;
