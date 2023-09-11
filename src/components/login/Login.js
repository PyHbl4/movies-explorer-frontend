import appLogo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Login(props) {
    return (
        <main className='main auth'>
            <NavLink to="/" className="auth__homelink"><img src={appLogo} alt="логотип" /></NavLink>
            <h1 className="auth__title">Рады видеть!</h1>
            <form action='POST' className='form register-form'>
                <label for="email" className='form__label'>E-mail</label>
                <input type="email" className='form__input' id='email' name='email' placeholder='Ваш e-mail' required></input>
                <span className='form__error-field' id='error-email'>Что-то пошло не так...</span>
                <label for="password" className='form__label'>Пароль</label>
                <input type="password" className='form__input' id='password' name='password' placeholder='Придумайте пароль' required></input>
                <span className='form__error-field' id='error-password'>Что-то пошло не так...</span>
                <button type="submit" className='form__submit'>Войти</button>
            </form>
            <p className='auth__disclaimer'>Ещё не зарегистрированы? <NavLink to="/signup" className="auth__link">Регистрация</NavLink></p>
        </main>
    );
}
export default Login;