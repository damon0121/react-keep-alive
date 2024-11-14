import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useKeepAliveTargetPaths, useOnBack } from '../../../../../dist';

const getId = () => (Math.random() * 100).toFixed();
export default function List1() {
  const { catId } = useParams();
  const [list] = useState([getId(), getId(), getId()]);
  useOnBack(() => {
    console.log('onBack do something');
  });
  useKeepAliveTargetPaths(['/detail/:id']);
  return (
    <div>
      <h2>LIST {catId}</h2>
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
