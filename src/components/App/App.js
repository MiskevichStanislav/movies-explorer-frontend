import { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

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
// import Alarm from "../Alarm/Alarm";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import MainApi from "../../utils/MainApi";
import MoviesApi from '../../utils/MoviesApi';
import { optionsMainApi, optionsMoviesApi } from '../../utils/optionsApi'
import LocalStorage from "../../utils/LocalStorage";

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [token, setToken] = useState('')
  const [loaderButton, setLoaderButton] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)

  const history = useHistory()
  const location = useLocation()

  const mainApi = new MainApi(optionsMainApi)
  const moviesApi = new MoviesApi(optionsMoviesApi)
  const jwtLocal = new LocalStorage('jwt')

  useEffect(() => {
    isShowMenu
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = ''
  }, [isShowMenu])

  useEffect(() => {
    setIsFetchError(false)
    setIsShowMenu(false)
  }, [location])

  useEffect(() => {
    handleLoginToken()
  }, [])

 
  function getAllFilms() {
    return moviesApi.getFilms()
  }

 
  function handleRegister({ name, email, password }) {
    setLoaderButton(true)
    setIsFetchError(false)
    mainApi.signup({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
      })
      .catch(() => {
        setIsFetchError(true)
      })
      .finally(() => {
        setLoaderButton(false)
      })
  }

 
  function handleLogin(user) {
    setLoaderButton(true)
    setIsFetchError(false)
    mainApi.signin(user)
      .then(res => {
        const token = res.token
        setToken(token)
        jwtLocal.save(token)
        getUserInfo(token)
      })
      .catch(() => {
        setIsFetchError(true)
      })
      .finally(() => {
        setLoaderButton(false)
      })
  }

  function getUserInfo(token) {
    mainApi.getUserInfo(token)
      .then(user => {
        setIsLoggedIn(true)
        setCurrentUser(user)
        history.push('/movies')
      })
  }

  function handleUpdateUser(user) {
    return mainApi.updateUserInfo(user, token)
      .then(newData => {
        setCurrentUser(newData)
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false)
    setToken('')
    setCurrentUser({})
    jwtLocal.delete()
    history.push('/')
  }

  function handleLoginToken() {
    const token = jwtLocal.load()
    if (token) {
      setToken(token)
      getUserInfo(token)
    }
  }

 
  function handleClickSelectButton(filmId, film) {
    return filmId
      ? mainApi.deleteSelectFilm(filmId, token)
      : mainApi.addSelectFilm(film, token)
  }

  function getSelectFilms() {
    return mainApi.getSelectFilms(token)
  }

  return (
    <>
      <CurrentUserContext.Provider value={{ loaderButton, isLoggedIn, currentUser, isFetchError }}>
        <Switch>
          <Route path='/movies' exact>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <HeaderAndFooterLayout
                setIsShowMenu={setIsShowMenu}
              >
                <Movies
                  getAllFilms={getAllFilms}
                  handleClickSelectButton={handleClickSelectButton}
                  getSelectFilms={getSelectFilms}
                />
              </HeaderAndFooterLayout>
            </ProtectedRoute>
          </Route>

          <Route path='/saved-movies' exact>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <HeaderAndFooterLayout
                setIsShowMenu={setIsShowMenu}
              >
                <SavedMovies
                  handleClickSelectButton={handleClickSelectButton}
                  getSelectFilms={getSelectFilms}
                />
              </HeaderAndFooterLayout>
            </ProtectedRoute>
          </Route>

          <Route path='/profile' exact>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <HeaderLayout
                setIsShowMenu={setIsShowMenu}
              >
                <Profile
                  handleUpdateUser={handleUpdateUser}
                  handleSignOut={handleSignOut}
                  currentUser={currentUser}
                />
              </HeaderLayout>
            </ProtectedRoute>
          </Route>

          <Route path='/signin' exact>
            <AuthLayout>
              <Login
                handleLogin={handleLogin}
              />
            </AuthLayout>
          </Route>

          <Route path='/signup' exact>
            <AuthLayout>
              <Register
                handleRegister={handleRegister}
              />
            </AuthLayout>
          </Route>

          <Route path='/' exact>
            <HeaderAndFooterLayout
              setIsShowMenu={setIsShowMenu}
            >
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
      </CurrentUserContext.Provider>

      </>
  );
}

export default App;
