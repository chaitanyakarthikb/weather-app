import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useDarkModeContext } from './store/DarkModeContext';
import WeatherBoxes from './components/WeatherBoxes';
import AirAndChartBox from './components/AirAndChartBox';

function App() {
  const {darkMode} = useDarkModeContext();
  
  return (
    <div  className={`${darkMode ? 'dark' : 'light'} container`}>
      <Navbar/>
      <WeatherBoxes/>
      <AirAndChartBox/>
    </div>
  );
}

export default App;
