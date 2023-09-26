import appLogo from '../../images/logo.svg';
import { NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function Register(props) {
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('что-то пошло не так');
    const [nameError, setNameError] = useState('что-то пошло не так');
    const [passwordError, setPasswordError] = useState('что-то пошло не так');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(!emailError && !passwordError && !nameError);
    }, [emailError, passwordError, nameError]);

    function blurHandler(e) {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            case 'name':
                setNameDirty(true);
                break;
            default:
                break;
        }
    }

    function handleEmailInput(evt) {
        setRegisterEmail(evt.target.value);
        const reg = /^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-])+\.([a-zA-Z0-9-.])+$/;
        if (!reg.test(String(evt.target.value.toLowerCase()))) {
            setEmailError('Введён некорректный email');
        } else {
            setEmailError(false);
        }
    }
    function handlePasswordInput(evt) {
        setRegisterPassword(evt.target.value);
        if (evt.target.value.length < 8) {
            setPasswordError(`Пароль должен содержать минимум 8 символов. Количество символов сейчас: ${evt.target.value.length}`);
        } else {
            setPasswordError(false);
        }
    }
    function handleNameInput(evt) {
        setRegisterName(evt.target.value);
        if (evt.target.value.length < 2 || evt.target.value.length > 30) {
            setNameError(`Имя должно содержать от 2 до 30 символов. Количество символов сейчас: ${evt.target.value.length}`);
        } else {
            setNameError(false);
        }
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
                        <input onBlur={e => blurHandler(e)} value={registerName} onChange={handleNameInput} type="text" className='form__input' id='name' name='name' placeholder='Ваше имя' required minLength={2} maxLength={30}></input>
                        {(nameDirty && nameError) && <span className='form__error-field' id='error-name'>{nameError}</span>}
                        <label htmlFor="email" className='form__label'>E-mail</label>
                        <input onBlur={e => blurHandler(e)} value={registerEmail} onChange={handleEmailInput} type="email" className='form__input' id='email' name='email' placeholder='Ваш e-mail' required></input>
                        {(emailDirty && emailError) && <span className='form__error-field' id='error-email'>{emailError}</span>}
                        <label htmlFor="password" className='form__label'>Пароль</label>
                        <input onBlur={e => blurHandler(e)} value={registerPassword} onChange={handlePasswordInput} type="password" className='form__input' id='password' name='password' placeholder='Придумайте пароль' required minLength={8}></input>
                        {(passwordDirty && passwordError) && <span className='form__error-field' id='error-password'>{passwordError}</span>}
                        <button type="submit" disabled={!isFormValid} className='form__submit'>Зарегистрироваться</button>
                    </form>
                    <p className='auth__disclaimer'>Уже зарегистрированы? <NavLink to="/signin" className="auth__link">Войти</NavLink></p>
                </section>
            </main> : <Navigate to={'/movies'} />}
        </>
    );
}
export default Register;