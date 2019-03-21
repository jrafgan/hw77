import {CATCH_ERROR, CHANGE_VALUE, CLOSE_NOTIFICATION, FETCH_SUCCESS, POST_SUCCESS} from "./actions";

const initialState = {
    apiMessages: [],
    author: '',
    message: '',
    dateTime: '',
    id: '',
    error: '',
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_VALUE:
            const {name, value} = action.e.currentTarget;
            return {...state, [name]: value};

        case FETCH_SUCCESS:
            let dateTime = action.res[action.res.length - 1].dateTime;
            return {...state, apiMessages: action.res, dateTime: dateTime};

        case POST_SUCCESS:
            let copy = state.apiMessages;
            copy.push(...action.res);
            return {...state, apiMessages: [...copy], dateTime: action.res[0].dateTime};

        case CATCH_ERROR:
            return {...state, error: action.err};

        case CLOSE_NOTIFICATION:
            return {...state, error: ''};

        default:
            return state;
    }
};

export default Reducer;