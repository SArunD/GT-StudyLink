import logo from './logo.svg';
import './App.css';
import './DemoApp.js';
import DemoApp from './DemoApp.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function App() {
  // return DemoApp();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <DemoApp/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Basic time picker" />
        </LocalizationProvider>
        <div id='calendar'></div>
      </header>
    </div>
  );
}

export default App;
