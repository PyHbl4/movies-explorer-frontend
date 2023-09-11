import Header from '../header/Header';
import { NavLink } from 'react-router-dom';

function Profile(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} handleToggleMenu={props.handleToggleMenu} logIn={props.logIn} />
            <main className='main profile'>
                <h1 className="profile__title">Привет, Виталий!</h1>
                <section className="profile__info">
                    <div className="profile__row">
                        <p className="profile__info-title">Имя</p>
                        <p className="profile__info-value">Виталий</p>
                    </div>
                    <div className="profile__row">
                        <p className="profile__info-title">E-mail</p>
                        <p className="profile__info-value">pochta@yandex.ru</p>
                    </div>
                    <button type="button" className="edit-profile">Редактировать</button>
                    <NavLink onClick={props.logOut} to="/" className="logout">Выйти из аккаунта</NavLink>
                </section>
            </main>
        </>
    );
}
export default Profile;