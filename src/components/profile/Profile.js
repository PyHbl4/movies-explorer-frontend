import React from 'react';
import { useState } from 'react';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFormChanded, setIsFormChanged] = useState(false);
    const [userName, setUserName] = useState(currentUser.name || '');
    const [userEmail, setUserEmail] = useState(currentUser.email || '');

    function handleFormInput(inputValue, userInfo) {
        console.log(inputValue);
        console.log(userInfo);
        if (inputValue === userInfo) {
            setIsFormChanged(false);
        } else {
            setIsFormChanged(true);
        }
    }

    function handleEmailInput(evt) {
        setUserEmail(evt.target.value);
        handleFormInput(evt.target.value, currentUser.email);
    }

    function handleNameInput(evt) {
        setUserName(evt.target.value);
        handleFormInput(evt.target.value, currentUser.name);
    }

    function toggleEditMode() {
        setIsEditMode(prev => !prev);
    }

    async function editUser() {
        const options = {
            name: userName,
            email: userEmail
        };
        await props.handleEditUser(localStorage.jwt, options);
        setIsEditMode(prev => !prev);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} handleToggleMenu={props.handleToggleMenu} logIn={props.logIn} />
            <main className='main profile'>
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <section className="profile__info">
                    <div className="profile__row">
                        <p className="profile__info-title">Имя</p>
                        <input className="profile__info-value" onChange={handleNameInput} disabled={!isEditMode} value={userName} />
                    </div>
                    <div className="profile__row">
                        <p className="profile__info-title">E-mail</p>
                        <input className="profile__info-value" onChange={handleEmailInput} disabled={!isEditMode} value={userEmail} />
                    </div>
                    {isEditMode
                        ?
                        <button type="button" onClick={editUser} className='edit-profile-button' disabled={!isFormChanded}>Сохранить</button>
                        :
                        <>
                            <button type="button" className="edit-profile" onClick={toggleEditMode}>Редактировать</button>
                            <NavLink onClick={props.logOut} to="/" className="logout">Выйти из аккаунта</NavLink>
                        </>
                    }


                </section>
            </main>
        </>
    );
}
export default Profile;