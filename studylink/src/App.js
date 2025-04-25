import './App.css';
import CalendarApp from './CalendarApp.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function App() {
  // return DemoApp();
  return (
    <div className="App">
      <header className="App-header">
        <CalendarApp/>
        <div id='calendar'></div>
      </header>
    </div>
  );
}

export default App;
