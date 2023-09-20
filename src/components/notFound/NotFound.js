import { NavLink } from 'react-router-dom';

function NotFound(props) {
    return (
        <main className='main not-found'>
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <NavLink to="/" className='not-found__link'>Назад</NavLink>
        </main>
    );
}
export default NotFound;