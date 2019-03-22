import {
    ADD_FILE,
    CATCH_ERROR,
    CHANGE_VALUE,
    CLOSE_NOTIFICATION,
    FETCH_SUCCESS,
    POST_SUCCESS,
    REPLY_TO
} from "./actions";

const initialState = {
    apiMessages: [],
    author: '',
    message: '',
    dateTime: '',
    id: '',
    error: '',
    image: null,
    replyToMessage: '',
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_VALUE:
            const {name, value} = action.e.currentTarget;
            return {...state, [name]: value};

        case ADD_FILE:
            return {
                ...state,
                [action.e.target.name]: action.e.target.files[0]
            };

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

        case REPLY_TO:

            return {
                ...state,
                replyToMessage: action.text
        };

        default:
            return state;
    }
};

export default Reducer;