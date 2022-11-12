const ViewButton = (props) => {
    const clickAll = props.clickAll;
    const clickActive = props.clickActive;
    const clickCompleted = props.clickCompleted;
    return (
        <ul class="todo-app__view-buttons">
            <button onClick={clickAll}>All</button>
            <button onClick={clickActive}>Active</button>
            <button onClick={clickCompleted}>Completed</button>
        </ul>);
}

export default ViewButton;