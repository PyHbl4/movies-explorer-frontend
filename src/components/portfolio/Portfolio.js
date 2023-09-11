function Portfolio() {
    return (
        <section className="portfolio">
            <div className='wrapper'>
                <h2 className='portfolio__title'>Портфолио</h2>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a href="https://italon96.ru/" className="portfolio__link" target="_blank" rel="noreferrer">
                            <span className="portfolio-project-name">Статичный сайт</span>
                            <span className='portfolio-arrow'>↗</span>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://www.gradiz.ru/" target="_blank" rel="noreferrer" className="portfolio__link">
                            <span className="portfolio-project-name">Адаптивный сайт</span>
                            <span className='portfolio-arrow'>↗</span>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://github.com/PyHbl4/react-mesto-auth" className="portfolio__link" target="_blank" rel="noreferrer">
                            <span className="portfolio-project-name">Одностраничное приложение</span>
                            <span className='portfolio-arrow'>↗</span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
export default Portfolio;