import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useDarkModeContext } from './store/DarkModeContext';
import WeatherBoxes from './components/WeatherBoxes';

function App() {
  const {darkMode} = useDarkModeContext();
  
  return (
    <div  className={`${darkMode ? 'dark' : 'light'} container`}>
      <Navbar/>
      <WeatherBoxes/>
    </div>
  );
}

export default App;
