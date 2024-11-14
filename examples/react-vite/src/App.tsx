import { Link } from 'react-router-dom';
import { KeepAliveOutlet } from '../../../dist';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='sidebar'>
        <ul>
          <li>
            <Link to='/list/1'>LIST 1</Link>
          </li>
          <li>
            <Link to='/list/2'>LIST 2</Link>
          </li>
        </ul>
      </div>
      <div className='main'>
        <KeepAliveOutlet />
      </div>
    </div>
  );
}

export default App;
