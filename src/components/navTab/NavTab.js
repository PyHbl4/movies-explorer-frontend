function NavTab(props) {
    return (
        <section className="mainpage-navigation">
            <nav className="wrapper mainpage-navigation__container">
                <ul className="mainpage-navigation__list">
                    <li className="mainpage-navigation__item">
                        <a href="#about-project" className="mainpage-navigation__link">О проекте</a>
                    </li>
                    <li className="mainpage-navigation__item">
                        <a href="#techs" className="mainpage-navigation__link">Технологии</a>
                    </li>
                    <li className="mainpage-navigation__item">
                        <a href="#about-me" className="mainpage-navigation__link">Студент</a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}
export default NavTab;