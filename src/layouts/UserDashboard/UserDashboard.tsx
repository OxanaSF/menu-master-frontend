import { useState } from 'react';
import backgroundImage from '../../Images/PublicImages/test.png';


type UserDashboardProps = {
  loggedIn: boolean;
  handleLogout: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ loggedIn, handleLogout }) => {
  const [favoriteMenus, setFavoriteMenus] = useState([
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
  ]);

  const [groceryList, setGroceryList] = useState([
    { id: 1, name: 'Tomatoes', quantity: 2 },
    { id: 2, name: 'Onions', quantity: 1 },
    { id: 3, name: 'Garlic', quantity: 3 },
  ]);

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '80vh',
      }}
    >
      <div className="row mt-5">
        <div className="col-12 col-md-8">
          <div className="card mb-4 p-3" style={{ backgroundColor: 'white' }}>
            <h1>Dashboard</h1>
            <p>Welcome back, John Doe!</p>
            <p>Your account information:</p>
            <ul>
              <li>Name: John Doe</li>
              <li>Email: john.doe@example.com</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4">
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
