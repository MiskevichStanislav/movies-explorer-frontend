import './Main.css';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';

function Main() {
    return (
        <div className="main-page">
            <h1>Main</h1>
            <AboutProject />
            <Techs />
        </div>
    );
}

export default Main;