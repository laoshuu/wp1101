import React, { Component } from 'react';
import EventList from '../Component/eventList';
import Footer from '../Component/footer';

const plans = [];

class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "", activeCnt: 0, completeCnt: 0 };
    }

    handleNewEvent = (e) => {
        if (e.code === 'Enter') {
            var object = { order: "", status: "active" };
            object.order = this.state.value;
            plans.push(object);
            this.setState({ value: "" });
            this.setState((s) => ({ activeCnt: s.activeCnt + 1 }))
        }
    }
    changeInputState = (e) => {
        this.setState({ value: e.target.value })
    }

    addItemCnt = () => { this.setState((s) => ({ activeCnt: s.activeCnt + 1, completeCnt: s.completeCnt - 1 })) }
    subItemCnt = () => { this.setState((s) => ({ activeCnt: s.activeCnt - 1, completeCnt: s.completeCnt + 1 })) }
    deleteActive = () => { this.setState((s) => ({ activeCnt: s.activeCnt - 1 })) }
    deleteComplete = () => { this.setState((s) => ({ completeCnt: s.completeCnt - 1 })) }

    // clickAll = () => { alert("hello") }
    // clickActive = () => { alert("hola") }
    // clickCompleted = () => { alert("bonjour") }


    render() {
        return (
            <div id="root" class="todo-app__root">
                <header class="todo-app__header">
                    <h1 class="todo-app__title">todos</h1>
                </header>
                <section class="todo-app__main">
                    <input class="todo-app__input" value={this.state.value} onChange={this.changeInputState} onKeyPress={this.handleNewEvent} />
                    <ul id="todo-list" class="todo-app__list">
                        {plans.map((event) => (<EventList event={event} addItemCnt={this.addItemCnt} subItemCnt={this.subItemCnt}
                            deleteActive={this.deleteActive} deleteComplete={this.deleteComplete} />))}
                    </ul>
                </section>
                <Footer activeCnt={this.state.activeCnt} completeCnt={this.state.completeCnt}
                // clickAll={this.clickAll} clickActive={this.clickActive} clickCompleted={this.clickCompleted} 
                />
            </div>
        )

    }

}

export default Todos;