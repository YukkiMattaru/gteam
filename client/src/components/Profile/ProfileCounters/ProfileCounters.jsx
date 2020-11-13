import React from 'react';
import {requiredField} from "../../common/FormsControls/validators";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunk} from "../../../redux/authReducer";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {countersAddThunk, deleteCounterThunk} from "../../../redux/countersReducer";

const CountersForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        {createField("Серийный номер", "serialNumber", [], Input)}
        <div>
            <button>Добавить</button>
        </div>
    </form>
}

const CountersReduxForm = reduxForm({
    form: 'counters'
})(CountersForm)

const CounterItem = (props) => {
    let styles = {
        "marginBottom": "10px",
        "padding": "5px 15px",
        "backgroundColor": "lightgrey",
        "boxSizing": "borderBox"
    }
    return <div style={styles}>
        <p>Серийный номер: {props.serialNumber}</p>
        {
            (props.lastValue ? <div><p>Последние показания:</p>
                    <ol>
                        <li key={"t1"}>{props.lastValue.energy.t1 || "-"}</li>
                        <li key={"t2"}>{props.lastValue.energy.t2 || "-"}</li>
                        <li key={"t3"}>{props.lastValue.energy.t3 || "-"}</li>
                        <li key={"t4"}>{props.lastValue.energy.t4 || "-"}</li>
                    </ol>
                    <p>Дата обновления: {props.lastValue.date || "-"}</p></div>
                : "")
        }
        {
            (props.active ? <button onClick={() => props.deleteCounter(props.serialNumber, 0)}>Выключить счетчик</button>
        : <button onClick={() => props.deleteCounter(props.serialNumber, 1)}>Включить счетчик</button>)}
    </div>
}

const Counters = (props) => {
    const onSubmit = (formData) => {
        props.countersAddThunk(formData.serialNumber);
    }

    const deleteCounter = (serialNumber, code) => {
        props.deleteCounterThunk(serialNumber, code);
    }

    return <div>
        <h2>Счетчики пользователя</h2>
        {props.counters.length ? props.counters.map(counter => {
            return <CounterItem serialNumber={counter._id}
                                lastValue={counter.value ? counter.value[counter.value.length - 1] : null}
                                deleteCounter={deleteCounter} active={counter.active}/>
        }) : ""}
        <p>Добавить счетчик</p>
        <CountersReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    counters: state.counters
})

export default connect(mapStateToProps, {loginThunk, countersAddThunk, deleteCounterThunk})(Counters)