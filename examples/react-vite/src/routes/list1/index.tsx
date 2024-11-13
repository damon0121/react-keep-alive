import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useKeepAliveTargetPaths, useOnBack } from '../../../../../dist';

const getId = () => (Math.random() * 100).toFixed();
export default function List1() {
  const [list] = useState([getId(), getId(), getId()]);
  useOnBack(() => {
    console.log('onBack do something');
  });
  useKeepAliveTargetPaths(['/detail/:id']);
  return (
    <div>
      <h2>LIST1</h2>
      <ul>
        {list.map((item) => (
          <li key={item}>
            <Link to={`/detail/${item}`}>LIST1 ID:{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
