function NoResults(props) {
    return (
        <div className='app-section'>
            <section className='movies no-results'>
                {localStorage.searchQuery && localStorage.searchQuery !== '' && <h2 className="no-results__title">{props.text}</h2>}
            </section>
        </div>
    );
}

export default NoResults;