import Promo from '../promo/Promo';
import Header from '../header/Header';
import NavTab from '../navTab/NavTab';
import AboutProject from '../aboutProject/AboutProject';
import AboutMe from '../aboutMe/AboutMe';
import Techs from '../techs/Techs';
import Footer from '../footer/Footer';
import Portfolio from '../portfolio/Portfolio';


function Main(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} handleToggleMenu={props.handleToggleMenu} isFrontPage={props.isFrontPage} />
            <main className='main front-page'>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>

    );
}
export default Main;