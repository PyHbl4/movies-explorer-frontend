import appLogo from '../../images/logo.svg';
import { NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function Login(props) {
    const [loginPassword, setLoginPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('что-то пошло не так');
    const [passwordError, setPasswordError] = useState('что-то пошло не так');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(!emailError && !passwordError);
    }, [emailError, passwordError]);

    function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            default:
                break;
        }
    }

    function handleEmailInput(evt) {
        setLoginEmail(evt.target.value);
        const reg = /^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-])+\.([a-zA-Z0-9-.])+$/;
        if (!reg.test(String(evt.target.value.toLowerCase()))) {
            setEmailError('Введён некорректный email');
        } else {
            setEmailError(false);
        }
    }
    function handlePasswordInput(evt) {
        setLoginPassword(evt.target.value);
        if (evt.target.value.length < 8) {
            setPasswordError('Пароль должен содержать минимум 8 символов');
        } else {
            setPasswordError(false);
        }
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
                        <input onBlur={e => blurHandler(e)} value={loginEmail} onChange={handleEmailInput} type="email" className='form__input' id='email' name='email' placeholder='Ваш e-mail' required></input>
                        {(emailDirty && emailError) && <span className='form__error-field' id='error-email'>{emailError}</span>}
                        <label htmlFor="password" className='form__label'>Пароль</label>
                        <input onBlur={e => blurHandler(e)} value={loginPassword} onChange={handlePasswordInput} type="password" className='form__input' id='password' name='password' placeholder='Придумайте пароль' required minLength={8}></input>
                        {(passwordDirty && passwordError) && <span className='form__error-field' id='error-password'>{passwordError}</span>}
                        <button type="submit" disabled={!isFormValid} className='form__submit'>Войти</button>
                    </form>
                    <p className='auth__disclaimer'>Ещё не зарегистрированы? <NavLink to="/signup" className="auth__link">Регистрация</NavLink></p>
                </section>
            </main> : <Navigate to={'/movies'} />}
        </>
    );
}
export default Login;