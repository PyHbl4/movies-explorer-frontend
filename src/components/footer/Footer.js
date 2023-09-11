function Footer() {
    return (
        <footer className="footer">
            <div className="wrapper">
                <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__bottom">
                    <p className="footer__copyright">© 2023</p>
                    <a rel="noreferrer" target="_blank" className="footer__link practicum-link" href="http://practicum.yandex.ru/">Яндекс.Практикум</a>
                    <a rel="noreferrer" target="_blank" className="footer__link github-link" href="https://github.com/">Github</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;