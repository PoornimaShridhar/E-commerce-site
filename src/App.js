import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import './pages/homepage/homepage.styles.scss'
import { Switch, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      </Switch>
      
    </div>
  );
}

export default App;
