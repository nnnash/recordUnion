export const ADD_NOTE = 'ADD_NOTE';
export const addNote = noteContent => ({
    type: ADD_NOTE,
    payload: {noteContent},
});

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const removeNote = noteId => ({
    type: REMOVE_NOTE,
    payload: {noteId},
});
