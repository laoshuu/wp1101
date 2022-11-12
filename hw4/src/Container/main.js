import React, { Component } from 'react';
// import { useState } from 'react';
import EventList from '../Component/eventList';
import Footer from '../Component/footer';

const plans = [];

class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "", activeCnt: 0, completeCnt: 0, plans: plans };

    }

    handleNewEvent = (e) => {
        if (e.code === 'Enter') {
            var object = { order: "", status: "active", checked: false };
            object.order = this.state.value;
            plans.push(object);
            this.setState({ value: "" });
            this.setState((s) => ({ activeCnt: s.activeCnt + 1 }))
            this.setState({ plans: plans })
        }
    }
    changeInputState = (e) => {
        this.setState({ value: e.target.value })
    }

    addItemCnt = () => { this.setState((s) => ({ activeCnt: s.activeCnt + 1, completeCnt: s.completeCnt - 1 })) }
    subItemCnt = () => { this.setState((s) => ({ activeCnt: s.activeCnt - 1, completeCnt: s.completeCnt + 1 })) }
    deleteActive = () => { this.setState((s) => ({ activeCnt: s.activeCnt - 1 })) }
    deleteComplete = () => { this.setState((s) => ({ completeCnt: s.completeCnt - 1 })) }

    updatePlans = (id, status, order) => {
        if (status === "active") { plans[id].status = "completed"; plans[id].checked = true; plans[id].order = order }
        else { plans[id].status = "active"; plans[id].checked = false; plans[id].order = order }
        // plans[id].status = status;
        this.setState({ plans: plans });
        // console.log(plans);
        // console.log(this.state.plans)
    }

    clickAll = () => {
        let newPlans = [];
        for (let i = 0; i < plans.length; i++) {
            newPlans.push(plans[i]);
        }
        this.setState(() => ({ plans: newPlans }));
        console.log(plans);
    }
    clickActive = () => {
        let newPlans = [];
        for (let i = 0; i < plans.length; i++) {
            if (plans[i].status === "active")
                newPlans.push(plans[i]);
        }
        console.log(newPlans);
        this.setState({ plans: newPlans });
        console.log(plans);
        console.log(this.state.plans)
    }
    clickCompleted = () => {
        let newPlans = [];
        for (let i = 0; i < plans.length; i++) {
            if (plans[i].status === "completed")
                newPlans.push(plans[i]);
        }
        this.setState({ plans: newPlans });
        console.log(plans);
    }


    render() {
        return (
            <div id="root" class="todo-app__root">
                <header class="todo-app__header">
                    <h1 class="todo-app__title">todos</h1>
                </header>
                <section class="todo-app__main">
                    <input class="todo-app__input" value={this.state.value} onChange={this.changeInputState} onKeyPress={this.handleNewEvent} />
                    <ul id="todo-list" class="todo-app__list">
                        {this.state.plans.map((event) => (<EventList event={event} addItemCnt={this.addItemCnt} subItemCnt={this.subItemCnt}
                            deleteActive={this.deleteActive} deleteComplete={this.deleteComplete} updatePlans={this.updatePlans}
                            itemCnt={this.state.activeCnt + this.state.completeCnt} />))}
                    </ul>
                </section>
                <Footer activeCnt={this.state.activeCnt} completeCnt={this.state.completeCnt}
                    clickAll={this.clickAll} clickActive={this.clickActive} clickCompleted={this.clickCompleted} />
            </div>
        )

    }

}

export default Todos;