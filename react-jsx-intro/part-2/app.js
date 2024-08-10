const App = () => {
    return (
        <div>
            <Tweet username="maxeatssnacks" name="max" message="Here comes the sun." date="8/9/2024" />
            <Tweet username="jjtellex" name="jason" message="Do do do do." date="7/4/2024" />
            <Tweet username="monstermash" name="gregory" message="Aaaaaaaaaaah" date="3/15/2024" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));