import appLogo from '../../images/logo.svg';
import userIcon from '../../images/user_icon.svg';
import menuOpenIcon from '../../images/menu_open_btn.svg';
import menuCloseIcon from '../../images/menu_close_btn.svg';
// import { NavLink } from 'react-router-dom';
function Header(props) {
    return (
        <header className="header">
            <div className="wrapper header__wrapper">
                <a className="header__logo" href="/"><img src={appLogo} alt="логотип" /></a>
                {props.loggedIn ?
                    <>
                        <div className="header__nav-links" id='menu-body'>
                            <button type='button' className='menu-button menu-button_close' onClick={props.handleToggleMenu}>
                                <img src={menuCloseIcon} alt="закрыть меню" />
                            </button>
                            <nav className='header__menu'>
                                <a className='header__link header__link_mobile' href='#'>Главная</a>
                                <a className='header__link' href='#'>Фильмы</a>
                                <a className='header__link' href='#'>Сохранённые фильмы</a>
                            </nav>
                            <a className='header__link account-link' href='#'>Аккаунт<img src={userIcon} alt="пользователь" className="user-icon" /></a>
                        </div>
                        <button type='button' className='menu-button menu-button_open' onClick={props.handleToggleMenu}>
                            <img src={menuOpenIcon} alt="открыть меню" />
                        </button>
                    </>
                    :
                    <nav className="header__auth-links">
                        <a className='header__link' href='#'>Регистрация</a>
                        <a className='header__link login-link' href='#'>Войти</a>
                    </nav>
                }
            </div>
        </header>
    )
}
export default Header;