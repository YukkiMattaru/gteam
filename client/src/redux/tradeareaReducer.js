import {tradeareaAPI} from "../api/tradeareaAPI";


const SET_DEALS = 'counters/SET_DEALS'

let initialState = {}

const tradeareaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEALS:
            return action.payload
        default:
            return state;
    }
}

export const setDeals = (deals) => {
    return ({
        type: SET_DEALS,
        payload: deals
    })
}

export const dealsThunk = () => async (dispatch) => {
    let response = await tradeareaAPI.getAllDeals();
    if (response.data.resultCode === 0) {
        dispatch(setDeals(response.data.body.deals))
    }
}


export default tradeareaReducer;