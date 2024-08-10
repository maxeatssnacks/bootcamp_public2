const App = () => {
    return (
        <div>
            <Person name="Max" age={29} hobbies={["golfing", "crypto", "running"]}></Person>
            <Person name="Jason" age={29} hobbies={["golfing", "crypto", "volleyball"]}></Person>
            <Person name="Ally" age={27} hobbies={["walking", "reading", "cooking"]}></Person>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));