function toggleButton(evt) {
    evt.target.classList.toggle('active');
}
function FilterCheckbox() {
    return (
        <div className="filter-block">
            <button onClick={toggleButton} type="button" className="filter-button">
                <span className="filter-button__toggler"></span>
            </button>
            <p className="filter-block__description">Короткометражки</p>
        </div>
    );
}
export default FilterCheckbox;