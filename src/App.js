import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useDarkModeContext } from './store/DarkModeContext';

function App() {
  const {darkMode} = useDarkModeContext();
  
  return (
    <div  className={`${darkMode ? 'dark' : 'light'} container`}>
      <Navbar/>
    </div>
  );
}

export default App;
