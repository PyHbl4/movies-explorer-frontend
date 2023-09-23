import appLogo from '../../images/logo.svg';
import { NavLink, Navigate } from 'react-router-dom';
import { useState } from "react";

function Login(props) {
    const [loginPassword, setLoginPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    function handleEmailInput(evt) {
        setLoginEmail(evt.target.value);
    }
    function handlePasswordInput(evt) {
        setLoginPassword(evt.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin({
            'password': loginPassword,
            'email': loginEmail
        });
    }
    return (
        <>
            {!props.loggedIn ? <main className='main auth'>
                <section className='sign-in'>
                    <NavLink to="/" className="auth__homelink"><img src={appLogo} alt="логотип" /></NavLink>
                    <h1 className="auth__title">Рады видеть!</h1>
                    <form onSubmit={handleSubmit} action='POST' className='form register-form'>
                        <label htmlFor="email" className='form__label'>E-mail</label>
                        <input value={loginEmail} onChange={handleEmailInput} type="email" className='form__input' id='email' name='email' placeholder='Ваш e-mail' required></input>
                        <span className='form__error-field' id='error-email'>Что-то пошло не так...</span>
                        <label htmlFor="password" className='form__label'>Пароль</label>
                        <input value={loginPassword} onChange={handlePasswordInput} type="password" className='form__input' id='password' name='password' placeholder='Придумайте пароль' required minLength={8}></input>
                        <span className='form__error-field' id='error-password'>Что-то пошло не так...</span>
                        <button type="submit" className='form__submit'>Войти</button>
                    </form>
                    <p className='auth__disclaimer'>Ещё не зарегистрированы? <NavLink to="/signup" className="auth__link">Регистрация</NavLink></p>
                </section>
            </main> : <Navigate to={'/movies'} />}
        </>
    );
}
export default Login;