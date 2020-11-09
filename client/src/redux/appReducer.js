import {getUserData} from "./authReducer";

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
    let promise = dispatch(getUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(initializingSuccess())
        })
}

export default appReducer;