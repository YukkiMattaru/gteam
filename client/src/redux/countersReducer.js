import {countersAPI} from "../api/countersAPI";

const SET_USER_COUNTERS = 'counters/SET_USER_COUNTERS'

let initialState = {}

const countersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_COUNTERS:
            return {
                items: action.payload
            }
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

export default countersReducer;