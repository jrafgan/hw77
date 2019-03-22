import axios from '../axios_url'

export const CHANGE_VALUE = 'CHANGE_VALUE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const POST_SUCCESS = 'POST_SUCCESS';
export const CATCH_ERROR = 'CATCH_ERROR';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const ADD_FILE = 'ADD_FILE';
export const SUBMIT_HANDLER = 'SUBMIT_HANDLER';
export const REPLY_TO = 'REPLY_TO';

export const changeValue = (e) => {
    return {type: CHANGE_VALUE, e}
};

export const fetchSuccess = (res) => {
    return {type: FETCH_SUCCESS, res}
};

export const postSuccess = (res) => {
    return {type: POST_SUCCESS, res}
};

export const catchError = (err) => {
    return {type: CATCH_ERROR, err}
};

export const addFile = e => {
  return {type: ADD_FILE, e}
};

export const submitHandler = e => {
  return {type: SUBMIT_HANDLER, e}
};

export const replyTo = text => {
    return {type: REPLY_TO, text}
};

export const getMessages = () => {
    return (dispatch, getState) => {

        axios.get('/messages').then(response => {
                dispatch(fetchSuccess(response.data));
        }).catch(error => {
            dispatch(catchError(error));
        });
    };

};


export const checkNewMessage = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.dateTime !== '') {
            axios.get('/messages?dateTime=' + state.dateTime).then(response => {
                if (response.data.length !== 0) {
                    dispatch(postSuccess(response.data));
                }
            }).catch(error => {
                dispatch(catchError('Wrong dateTime requested ' + error));
            });
        }
    }
};

export const sendToServer = (e) => {
    e.preventDefault();
    return (dispatch, getState) => {
        const state = getState();
        const formData = new FormData();
        formData.append('author', state.author);
        formData.append('message', state.message);
        formData.append('image', state.image);
        formData.append('replyToMessage', state.replyToMessage);
        axios.post('/messages', formData).then(response => {
        }).catch(error => {
            dispatch(catchError('Message can not be empty ' + error));
        });
    };

};