
function FilterCheckbox(props) {
    function toggleButton(evt) {
        props.toggleCheckbox();
        evt.target.classList.toggle('active');
    }
    
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