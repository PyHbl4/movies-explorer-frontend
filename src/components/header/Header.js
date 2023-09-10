import appLogo from '../../images/logo.svg';
import userIcon from '../../images/user_icon.svg';
import menuOpenIcon from '../../images/menu_open_btn.svg';
import menuCloseIcon from '../../images/menu_close_btn.svg';
import { NavLink } from 'react-router-dom';
function Header(props) {
    return (
        <header className="header">
            <div className="wrapper header__wrapper">
                <NavLink to="/" className="header__logo"><img src={appLogo} alt="логотип" /></NavLink>
                {props.loggedIn ?
                    <>
                        <div className="header__nav-links" id='menu-body'>
                            <button type='button' className='menu-button menu-button_close' onClick={props.handleToggleMenu}>
                                <img src={menuCloseIcon} alt="закрыть меню" />
                            </button>
                            <nav className='header__menu'>
                                <NavLink onClick={props.handleToggleMenu} to="/" className={({ isActive }) => `header__link header__link_mobile${isActive ? " header__link_active" : ""}`}>Главная</NavLink>
                                <NavLink onClick={props.handleToggleMenu} to="/movies" className={({ isActive }) => `header__link${isActive ? " header__link_active" : ""}`}>Фильмы</NavLink>
                                <NavLink onClick={props.handleToggleMenu} to="/saved-movies" className={({ isActive }) => `header__link${isActive ? " header__link_active" : ""}`}>Сохранённые фильмы</NavLink>
                            </nav>
                            <NavLink onClick={props.handleToggleMenu} to="/profile" className="header__link account-link">Аккаунт<img src={userIcon} alt="пользователь" className="user-icon" /></NavLink>
                        </div>
                        <button type='button' className='menu-button menu-button_open' onClick={props.handleToggleMenu}>
                            <img src={menuOpenIcon} alt="открыть меню" />
                        </button>
                    </>
                    :
                    <nav className="header__auth-links">
                        <NavLink to="/sign-up" className={({ isActive }) => `header__link${isActive ? " header__link_active" : ""}`}>Регистрация</NavLink>
                        <NavLink to="/sign-in" className={({ isActive }) => `header__link login-link${isActive ? " header__link_active" : ""}`}>Войти</NavLink>
                    </nav>
                }
            </div>
        </header>
    )
}
export default Header;