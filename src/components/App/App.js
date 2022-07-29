import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from '../Header/Header'
import Movies from '../../components/Movies/Movies'
import Profile from '../../components/Profile/Profile'
import Register from '../../components/Register/Register'
import Login from '../../components/Login/Login'
import SavedMovies from '../../components/SavedMovies/SavedMovies'
import Main from '../../components/Main/Main'
import NotFound from '../../pages/NotFound/NotFound_404'
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path='/movies' exact>
          <Movies />
        </Route>

        <Route path='/saved-movies' exact>
          <SavedMovies />
        </Route>

        <Route path='/profile' exact>
          <Profile />
        </Route>

        <Route path='/signin' exact>
          <Login />
        </Route>

        <Route path='/signup' exact>
          <Register />
        </Route>

        <Route path='/' exact>
          <Main />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
