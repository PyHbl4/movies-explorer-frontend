import appLogo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Register(props) {
    return (
        <main className='main auth'>
            <NavLink to="/" className="auth__homelink"><img src={appLogo} alt="логотип" /></NavLink>
            <h1 className="auth__title">Добро пожаловать</h1>
            <form action='POST' className='form register-form'>
                <label for="name" className='form__label'>Имя</label>
                <input type="text" className='form__input' id='name' name='name' placeholder='Ваше имя' required></input>
                <span className='form__error-field' id='error-name'>Что-то пошло не так...</span>
                <label for="email" className='form__label'>E-mail</label>
                <input type="email" className='form__input' id='email' name='email' placeholder='Ваш e-mail' required></input>
                <span className='form__error-field' id='error-email'>Что-то пошло не так...</span>
                <label for="password" className='form__label'>Пароль</label>
                <input type="password" className='form__input' id='password' name='password' placeholder='Придумайте пароль' required></input>
                <span className='form__error-field' id='error-password'>Что-то пошло не так...</span>
                <button type="submit" className='form__submit register-button'>Зарегистрироваться</button>
            </form>
            <p className='auth__disclaimer'>Уже зарегистрированы? <NavLink to="/signin" className="auth__link">Войти</NavLink></p>
        </main>
    );
}
export default Register;