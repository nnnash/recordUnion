import {handleActions} from 'redux-actions';

import {
    ADD_NOTE,
    REMOVE_NOTE,
} from './actions';

const defaultState = {
    notes: [],
};

export default handleActions({
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.concat({
            text: payload.noteContent,
        }),
    }),

    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter((_, ind) => ind !== payload.noteId),
    }),
}, defaultState);
