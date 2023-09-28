import { useNavigate } from 'react-router-dom';

function NotFound(props) {
    const hist = useNavigate();
    const goBack = () => {
            hist(-1);
    };
    return (
        <main className='main not-found'>
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <button className="not-found__link" onClick={goBack}>Назад</button>
        </main>
    );
}
export default NotFound;