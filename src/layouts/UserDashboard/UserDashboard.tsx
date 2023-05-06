import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import backgroundImage from '../../Images/PublicImages/test.png';
import { selectIsLoggedIn } from '../../store/selectors/authSelectors';
import { useSelector } from 'react-redux';
import {
  selectUserId,
  selectUserName,
} from '../../store/selectors/userSelectors';

export const UserDashboard = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);

  const [favoriteMenus, setFavoriteMenus] = useState(() => {
    return [
      {
        id: 1,
        name: 'Italian Night',
        description: 'A classic Italian dinner menu',
      },
      {
        id: 2,
        name: 'Taco Tuesday',
        description: 'A fiesta of flavors with tacos and sides',
      },
      {
        id: 3,
        name: 'Weekend Brunch',
        description: 'A hearty brunch menu for lazy weekends',
      },
    ];
  });

  const [groceryList, setGroceryList] = useState(() => {
    if (isLoggedIn) {
      return [
        { id: 1, name: 'Tomatoes', quantity: 2 },
        { id: 2, name: 'Onions', quantity: 1 },
        { id: 3, name: 'Garlic', quantity: 3 },
      ];
    } else {
      return [];
    }
  });

  return (
    <div
      className="container container-dash"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${backgroundImage})`,
      }}
    >
     <div className="row">
  <div className="col-12 col-md-6 mt-5">
    <div className="card mb-4 p-3" style={{ backgroundColor: 'white' }}>
      <h2>Welcome back, {userName}</h2>
      <p>Your account information:</p>
      <ul>
        <li>Name: John Doe</li>
        <li>Email: john.doe@example.com</li>
        <li>Phone: 123-456-7890</li>
      </ul>
    </div>
  </div>
  <div className="col-12 col-md-6">
    <div className="card mb-4">
      <div className="card-header">Favorite Menus</div>
      <ul className="list-group list-group-flush">
        {favoriteMenus.map((menu) => (
          <li key={menu.id} className="list-group-item">
            {menu.name}
          </li>
        ))}
      </ul>
    </div>
    <div className="card">
      <div className="card-header">Grocery List</div>
      <ul className="list-group list-group-flush">
        {groceryList.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.name}
            <span className="badge badge-primary badge-pill">
              {item.quantity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

    </div>
  );
};
