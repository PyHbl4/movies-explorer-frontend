import portfolioArrow from '../../images/portfolio_arrow.svg';
function Portfolio() {
    return (
        <section className="portfolio">
            <div className='wrapper'>
                <h2 className='portfolio__title'>Портфолио</h2>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a href="#" className="portfolio__link">
                            <span className="portfolio-project-name">Статичный сайт</span>
                            <span className='portfolio-arrow'>↗</span>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="#" className="portfolio__link">
                            <span className="portfolio-project-name">Адаптивный сайт</span>
                            <span className='portfolio-arrow'>↗</span>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="#" className="portfolio__link">
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