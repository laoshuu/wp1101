import ViewButton from './view_button';
const Footer = (props) => {
    const activeCnt = props.activeCnt;
    const completeCnt = props.completeCnt;
    const clickAll = props.clickAll;
    const clickActive = props.clickActive;
    const clickCompleted = props.clickCompleted;

    if ((activeCnt + completeCnt) !== 0) {
        return (

            <footer class="todo-app__footer" id="todo-footer">
                <div class="todo-app__total">{activeCnt} left</div>
                <ViewButton clickAll={clickAll} clickActive={clickActive} clickCompleted={clickCompleted} />
                <div class="todo-app__clean">
                    <button>Clear completed</button>
                </div>
            </footer>);
    }
    else { return null }
}

export default Footer;