import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

function Main({ setIsShowMenu }) {
    return (
        <HeaderAndFooterLayout
            setIsShowMenu={setIsShowMenu}
        >
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />

        </HeaderAndFooterLayout>
    );
}

export default Main;