function AboutProject() {
    return (
        <section className="info-section about-project" id="about-project">
            <div className="wrapper">
                <h2 className="section-title">О проекте</h2>
                <div className="about-project__info">
                    <div className="about-project__column">
                        <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="about-project__column">
                        <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about-project__timing">
                    <div className="about-project__timeline">
                        <p className="first-part">1 неделя</p>
                        <p className="last-part">4 недели</p>
                    </div>
                    <div className="about-project__timeline">
                        <p className="timeline-description">Back-end</p>
                        <p className="timeline-description">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AboutProject;