const ViewButton = (props) => {
    // const clickAll = props.clickAll;
    // const clickActive = props.clickActive;
    // const clickCompleted = props.clickCompleted;
    return (
        <ul class="todo-app__view-buttons">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </ul>);
}

export default ViewButton;