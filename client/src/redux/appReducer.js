import {getUserData} from "./authReducer";
import {countersThunk} from "./countersReducer";

const INITIALIZED_SUCCESS = 'application/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializingSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let getUser = dispatch(getUserData());
    let getCounters = dispatch(countersThunk())

    Promise.all([getUser, getCounters])
        .then(() => {
            dispatch(initializingSuccess())
        })
}

export default appReducer;