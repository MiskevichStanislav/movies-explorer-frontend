import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from "../Navigation/Navigation";
import AccountButton from "../AccountButton/AccountButton";

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { PAGES } from '../../utils/constants'

function Header({ setIsShowMenu }) {
    const { isLoggedIn } = useContext(CurrentUserContext)
    const isMainPage = useHistory().location.pathname === PAGES.MAIN

    const buttons = isLoggedIn ? (
        <AccountButton />
    ) : (
        <div className="header__buttons">
            <Link className="header__button" to={PAGES.SIGNUP}>Регистрация</Link>
            <Link className="header__button header__button_color_green" to={PAGES.SIGNIN}>Войти</Link>
        </div>
    )

    function handleClickMenuButton() {
        setIsShowMenu(true)
    }

    return (
        <header
            className="header"
            style={{ backgroundColor: isMainPage && '#073042' }}
        >
            <div className="container header__container">
                <div className="header__wrapper">
                    <Logo />
                    {isLoggedIn && <Navigation />}
                    {buttons}
                    {isLoggedIn && <div className="header__menu-button" onClick={handleClickMenuButton}></div>}
                </div>
            </div>
        </header >
    );
}

export default Header;