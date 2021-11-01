import xButton from "../Container/img/x.png";
import React, { Component } from 'react';

class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event, checked: false,
            addItemCnt: this.props.addItemCnt, subItemCnt: this.props.subItemCnt,
            deleteActive: this.props.deleteActive, deleteComplete: this.props.deleteComplete,
            style: null
        };
    }

    handleClick = () => {
        if (this.state.event.status === "active") {
            this.setState({ checked: true });
            this.state.subItemCnt();
            this.setState({ event: { status: "completed", order: this.state.event.order } })
            this.setState({ style: { textDecoration: "line-through", opacity: "0.5" } })
        }
        else {
            this.setState({ checked: false });
            this.state.addItemCnt();
            this.setState({ event: { status: "active", order: this.state.event.order } })
            this.setState({ style: null })
        }
    }

    handleDelete = () => {
        if (this.state.event.status === "active") { this.state.deleteActive() }
        else if (this.state.event.status === "completed") { this.state.deleteComplete() }
        this.setState({ event: { status: "deleted", order: this.state.event.order } });
    }

    render() {
        if (this.state.event.status === "deleted") { return null }
        else {
            return (
                <li class="todo-app__item">
                    <div class="todo-app__checkbox" onClick={this.handleClick} >
                        <input type="checkbox" checked={this.state.checked} />
                        <label />
                    </div>
                    <h1 class="todo-app__item-detail" style={this.state.style}>{this.state.event.order}</h1>
                    <img src={xButton} alt="pic" class="todo-app__item-x" onClick={this.handleDelete} />
                </li>)
        }

    }
}

export default EventList;