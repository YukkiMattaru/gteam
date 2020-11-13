import {countersAPI} from "../api/countersAPI";

const SET_USER_COUNTERS = 'counters/SET_USER_COUNTERS'

let initialState = {}

const countersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_COUNTERS:
            return action.payload
        default:
            return state;
    }
}

const setUserCounters = (counters) => {
    return ({
        type: SET_USER_COUNTERS,
        payload: counters
    })
}

export const countersThunk = () => async (dispatch) => {
    let response = await countersAPI.getAllUserCounters();
    if (response.data.resultCode === 0) {
        dispatch(setUserCounters(response.data.body.counters))
    }
}

export const deleteCounterThunk = (serialNumber, code) => async (dispatch) => {
    let response = await countersAPI.deleteCounter(serialNumber, code)
    if (response.data.resultCode === 0) {
        dispatch(countersThunk());
    }
}

export const countersAddThunk = (serialNumber) => async (dispatch) => {
    let response = await countersAPI.addNewCounter(serialNumber);
    if (response.data.resultCode === 0) {
        dispatch(countersThunk());
    }
}

export default countersReducer;