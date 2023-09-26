
function FilterCheckbox(props) {
    function toggleButton() {
        props.toggleCheckbox();
    }
    
    return (
        <div className="filter-block">
            <button onClick={toggleButton}
                    type="button"
                    className={`filter-button${props.shortsOnly?' active':''}`}>
                <span className="filter-button__toggler"></span>
            </button>
            <p className="filter-block__description">Короткометражки</p>
        </div>
    );
}
export default FilterCheckbox;