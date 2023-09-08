function NavTab(props) {
    return(
        <section className="mainpage-navigation">
            <nav className="wrapper navigation__container">
                <a href="#about-project" className="navigation__link">О проекте</a>
                <a href="#techs" className="navigation__link">Технологии</a>
                <a href="#about-me" className="navigation__link">Студент</a>
            </nav>
        </section>
    );
}
export default NavTab;