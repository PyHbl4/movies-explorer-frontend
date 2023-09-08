import Promo from '../promo/Promo';
import NavTab from '../navTab/NavTab';
import AboutProject from '../aboutProject/AboutProject';
import AboutMe from '../aboutMe/AboutMe';
import Techs from '../techs/Techs';
import Portfolio from '../portfolio/Portfolio';


function Main(props) {
    return (
        <main className='mainpage'>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}
export default Main;