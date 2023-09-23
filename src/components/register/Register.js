import appLogo from '../../images/logo.svg';
import { NavLink, Navigate } from 'react-router-dom';
import { useState } from "react";

function Register(props) {
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerName, setRegisterName] = useState('');
    function handleEmailInput(evt) {
        setRegisterEmail(evt.target.value);
    }
    function handlePasswordInput(evt) {
        setRegisterPassword(evt.target.value);
    }
    function handleNameInput(evt) {
        setRegisterName(evt.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({
            'password': registerPassword,
            'email': registerEmail,
            'name': registerName,
        });
    }
    return (
        <>
            {!props.loggedIn ? <main className='main auth'>
                <section className='sign-up'>
                    <NavLink to="/" className="auth__homelink"><img src={appLogo} alt="логотип" /></NavLink>
                    <h1 className="auth__title">Добро пожаловать</h1>
                    <form onSubmit={handleSubmit} action='POST' className='form register-form'>
                        <label htmlFor="name" className='form__label'>Имя</label>
                        <input value={registerName} onChange={handleNameInput} type="text" className='form__input' id='name' name='name' placeholder='Ваше имя' required minLength={2} maxLength={30}></input>
                        <span className='form__error-field' id='error-name'>Что-то пошло не так...</span>
                        <label htmlFor="email" className='form__label'>E-mail</label>
                        <input value={registerEmail} onChange={handleEmailInput} type="email" className='form__input' id='email' name='email' placeholder='Ваш e-mail' required></input>
                        <span className='form__error-field' id='error-email'>Что-то пошло не так...</span>
                        <label htmlFor="password" className='form__label'>Пароль</label>
                        <input value={registerPassword} onChange={handlePasswordInput} type="password" className='form__input' id='password' name='password' placeholder='Придумайте пароль' required minLength={8}></input>
                        <span className='form__error-field' id='error-password'>Что-то пошло не так...</span>
                        <button type="submit" className='form__submit register-button'>Зарегистрироваться</button>
                    </form>
                    <p className='auth__disclaimer'>Уже зарегистрированы? <NavLink to="/signin" className="auth__link">Войти</NavLink></p>
                </section>
            </main> : <Navigate to={'/movies'} />}
        </>
    );
}
export default Register;