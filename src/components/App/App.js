import { Route, Switch } from "react-router-dom";
import { useState } from "react";

import './App.css';
import Movies from '../../components/Movies/Movies';
import Profile from '../../components/Profile/Profile';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';
import SavedMovies from '../../components/SavedMovies/SavedMovies';
import Main from '../../components/Main/Main';
import NotFound from '../../pages/NotFound/NotFound_404';
import HeaderLayout from "../../layouts/HeaderLayout/HeaderLayout";
import HeaderAndFooterLayout from "../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Menu from "../Menu/Menu";
import { useEffect } from "react";

import MainApi from "../../utils/MainApi";
import MoviesApi from '../../utils/MoviesApi'

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false)

  useEffect(() => {
    isShowMenu
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = ''
  }, [isShowMenu])

  return (
    <>
      <Switch>
        <Route path='/movies' exact>
          <HeaderAndFooterLayout>
            <Movies />
          </HeaderAndFooterLayout>
        </Route>

        <Route path='/saved-movies' exact>
          <HeaderAndFooterLayout>
            <SavedMovies />
          </HeaderAndFooterLayout>
        </Route>

        <Route path='/profile' exact>
          <HeaderLayout>
            <Profile />
          </HeaderLayout>
        </Route>

        <Route path='/signin' exact>
          <AuthLayout>
            <Login />
          </AuthLayout>
        </Route>

        <Route path='/signup' exact>
          <AuthLayout>
            <Register />
          </AuthLayout>
        </Route>

        <Route path='/' exact>
          <HeaderAndFooterLayout>
            <Main />
          </HeaderAndFooterLayout>
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Menu
        isShowMenu={isShowMenu}
        setIsShowMenu={setIsShowMenu}
      />
      </>
  );
}

export default App;
