import { Link } from 'react-router-dom';
import KeepAlive, { useKeepAliveOutlet } from '../../../dist';
import './App.css';

function App() {
  const keepAliveOutlet = useKeepAliveOutlet();

  return (
    <div className='app'>
      <div className='sidebar'>
        <ul>
          <li>
            <Link to='/list1'>LIST 1</Link>
          </li>
          <li>
            <Link to='/list2'>LIST 2</Link>
          </li>
        </ul>
      </div>
      <div className='main'>{keepAliveOutlet}</div>
    </div>
  );
}

function WithKeepAlive() {
  return (
    <KeepAlive needKeepAlivePaths={['/list1']}>
      <App />
    </KeepAlive>
  );
}
export default WithKeepAlive;
