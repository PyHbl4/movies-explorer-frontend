function NavTab(props) {
    return (
        <section className="mainpage-navigation">
            <nav className="wrapper navigation__container">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <a href="#about-project" className="navigation__link">О проекте</a>
                    </li>
                    <li className="navigation__item">
                        <a href="#techs" className="navigation__link">Технологии</a>
                    </li>
                    <li className="navigation__item">
                        <a href="#about-me" className="navigation__link">Студент</a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}
export default NavTab;