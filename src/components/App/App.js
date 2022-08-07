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
import Menu from "../Menu/Menu";
import Alarm from "../Alarm/Alarm";

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

  const [isPreloader, setIsPreloader] = useState(true)

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
        setIsLoggedIn(true)
        jwtLocal.save(token)
        getUserInfo(token)
        history.push('/movies')

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
        if (!isLoggedIn) setIsLoggedIn(true)
        setCurrentUser(user)
      })
      .finally(() => {
        setIsPreloader(false)
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
    } else {
      setIsPreloader(false)
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
          <ProtectedRoute
            path='/movies'
            exact
            isLoggedIn={isLoggedIn}
            getAllFilms={getAllFilms}
            handleClickSelectButton={handleClickSelectButton}
            getSelectFilms={getSelectFilms}
            setIsShowMenu={setIsShowMenu}
            component={Movies}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path='/saved-movies'
            exact
            isLoggedIn={isLoggedIn}
            handleClickSelectButton={handleClickSelectButton}
            getSelectFilms={getSelectFilms}
            setIsShowMenu={setIsShowMenu}
            component={SavedMovies}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path='/profile'
            exact
            isLoggedIn={isLoggedIn}
            handleUpdateUser={handleUpdateUser}
            handleSignOut={handleSignOut}
            currentUser={currentUser}
            setIsShowMenu={setIsShowMenu}
            component={Profile}
            isPreloader={isPreloader}
          />

          <Route path='/signin' exact>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path='/signup' exact>
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path='/' exact>
            <Main setIsShowMenu={setIsShowMenu} />
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
