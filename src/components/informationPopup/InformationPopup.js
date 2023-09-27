function InformationPopup(props) {
    return (
        <div className={`information-popup${props.isOpen ? ' active' : ''}`}>
            <div className="information-popup__wrapper">
                <button onClick={props.onClose} type="button" className="information-popup__close">
                    <span></span>
                    <span></span>
                </button>
                <p className="information-popup__title">
                    {props.popupTitle || 'Заголовок ошибки!'}
                </p>
                <p className="information-popup__message">
                    {props.popupMessage || 'Сообщение об ошибке!'}
                </p>
            </div>
        </div>
    );
}
export default InformationPopup;