import './NavTab.css';

function NavTab() {
    return (
        <nav className="navtab">
            <div className="container navtab__contain">
                <ul className="navtab__list">
                    <li><a className="navtab__link" href="#project">О проекте</a></li>
                    <li><a className="navtab__link" href="#techs">Технологии</a></li>
                    <li><a className="navtab__link" href="#about-me">Студент</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavTab;