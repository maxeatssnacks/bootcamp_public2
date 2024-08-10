const App = () => {
    return (
        <div>
            <FirstComponent />
            <NamedComponent name="maximus" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));