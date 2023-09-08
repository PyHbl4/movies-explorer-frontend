import studentPhoto from '../../images/student_photo.png';
function AboutMe() {
    return (
        <section className="info-section about-me" id='about-me'>
            <div className="wrapper">
                <h2 className="section-title tech-title">Студент</h2>
                <div className="student">
                    <h3 className="student__name">Виталий</h3>
                    <p className="student__description">Фронтенд-разработчик, 30 лет</p>
                    <p className="student__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className='student__link' href='https://github.com/PyHbl4'>Github</a>
                    <img className='student__photo' src={studentPhoto} alt="фото студента" />
                </div>
            </div>
        </section>
    );
}
export default AboutMe;