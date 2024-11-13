import { useState } from 'react';
import { Link } from 'react-router-dom';

const getId = () => (Math.random() * 100).toFixed();
export default function List1() {
  const [list] = useState([getId(), getId(), getId(), getId(), getId()]);
  return (
    <div>
      <h2>LIST 2</h2>
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
