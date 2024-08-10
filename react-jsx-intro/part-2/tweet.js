const Tweet = (props) => {
    return (
        <div className="tweet">
            <h3 className="name">{props.name}</h3>
            <h6 className="username">@{props.username}</h6>
            <p className="message">{props.message}</p>
            <p className="date">{props.date}</p>
        </div>
    )
}