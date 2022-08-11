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
import { PAGES, ALARM_MESSAGES } from '../../utils/constants'
import LocalStorage from "../../utils/LocalStorage";

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [token, setToken] = useState('')
  const [loaderButton, setLoaderButton] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)

  const [isPreloader, setIsPreloader] = useState(true)

  const [messageAlarm, setMessageAlarm] = useState(null)
  const [isActiveAlarm, setIsActiveAlarm] = useState(false)

  const history = useHistory()
  const location = useLocation()

  const mainApi = new MainApi(optionsMainApi)
  const moviesApi = new MoviesApi(optionsMoviesApi)
  const jwtLocal = new LocalStorage('jwt')
  const filmsLocal = new LocalStorage('films')
  const searchQueryMoviesLocal = new LocalStorage('search-query-movies', { film: '', short: false })
  const searchQuerySavedMoviesLocal = new LocalStorage('search-query-saved-movies', { film: '', short: false })

  useEffect(() => {
    document.body.style.overflow = isShowMenu ? 'hidden' : ''
  }, [isShowMenu])

  useEffect(() => {
    setIsFetchError(false)
    setIsShowMenu(false)
  }, [location])

  useEffect(() => {
    handleLoginToken()
  }, [])


  function requestAllFilms() {
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
        history.push(PAGES.MOVIES)

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
      .catch(() => {
        showAlarm(ALARM_MESSAGES.ERROR.GET_USER)
        throw new Error()
      })
      .finally(() => {
        setIsPreloader(false)
      })
  }

  function handleUpdateUser(user) {
    return mainApi.updateUserInfo(user, token)
      .then(newData => {
        setCurrentUser(newData)
        showAlarm(ALARM_MESSAGES.SUCCESSFULLY.UPDATE_PROFILE)
      })
      .catch(() => {
        showAlarm(ALARM_MESSAGES.ERROR.UPDATE_PROFILE)
        throw new Error()
      })
  }

  function clearLocal() {
    jwtLocal.delete()
    filmsLocal.delete()
    searchQueryMoviesLocal.delete()
    searchQuerySavedMoviesLocal.delete()
  }

  function handleSignOut() {
    setIsLoggedIn(false)
    setToken('')
    setCurrentUser({})
    clearLocal()
    history.push(PAGES.MAIN)
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
        .catch(() => {
          showAlarm(ALARM_MESSAGES.ERROR.DELETE_FILM)
          throw new Error()
        })
      : mainApi.addSelectFilm(film, token)
        .catch(() => {
          showAlarm(ALARM_MESSAGES.ERROR.ADD_FILM)
          throw new Error()
        })
  }

  function requestSelectFilms() {
    return mainApi.fetchSelectFilms(token)
  }

  function showAlarm(message) {
    setMessageAlarm(message)
    setIsActiveAlarm(true)
    setTimeout(() => {
      setIsActiveAlarm(false)
    }, 3000)
  }

  return (
    <>
      <CurrentUserContext.Provider value={{ loaderButton, isLoggedIn, currentUser, isFetchError }}>
        <Switch>
          <ProtectedRoute
            path={PAGES.MOVIES}
            exact
            isLoggedIn={isLoggedIn}
            requestAllFilms={requestAllFilms}
            handleClickSelectButton={handleClickSelectButton}
            requestSelectFilms={requestSelectFilms}
            setIsShowMenu={setIsShowMenu}
            component={Movies}
            isPreloader={isPreloader}
            filmsLocal={filmsLocal}
            searchQueryMoviesLocal={searchQueryMoviesLocal}
          />

          <ProtectedRoute
            path={PAGES.SAVED_MOVIES}
            exact
            isLoggedIn={isLoggedIn}
            handleClickSelectButton={handleClickSelectButton}
            requestSelectFilms={requestSelectFilms}
            setIsShowMenu={setIsShowMenu}
            component={SavedMovies}
            isPreloader={isPreloader}
            searchQuerySavedMoviesLocal={searchQuerySavedMoviesLocal}
          />

          <ProtectedRoute
            path={PAGES.PROFILE}
            exact
            isLoggedIn={isLoggedIn}
            handleUpdateUser={handleUpdateUser}
            handleSignOut={handleSignOut}
            currentUser={currentUser}
            setIsShowMenu={setIsShowMenu}
            component={Profile}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path={PAGES.SIGNIN}
            exact
            isLoggedIn={!isLoggedIn}
            handleLogin={handleLogin}
            component={Login}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path={PAGES.SIGNUP}
            exact
            isLoggedIn={!isLoggedIn}
            handleRegister={handleRegister}
            component={Register}
            isPreloader={isPreloader}
          />

          <Route path={PAGES.MAIN} exact>
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
      <Alarm
        messageAlarm={messageAlarm}
        isActiveAlarm={isActiveAlarm}
      />
    </>
  );
}

export default App;
