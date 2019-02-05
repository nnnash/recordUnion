import reducers from '../reducer';
import {ADD_NOTE, REMOVE_NOTE} from '../actions';

const defaultStore = {
    notes: [
        {text: 'default'},
    ],
};
let store;

describe('reducers', () => {
    beforeEach(() => {
        store = {...defaultStore};
    });
    it('addNote should add note to store', () => {
        expect(reducers(store, {
            type: ADD_NOTE,
            payload: {noteContent: 'the second'},
        })).toEqual({
            notes: [
                defaultStore.notes[0],
                {text: 'the second'},
            ],
        });
    });
    it('removeNote should remove note by index', () => {
        store.notes.push({text: 'the second'});
        expect(reducers(store, {
            type: REMOVE_NOTE,
            payload: {noteId: 0},
        })).toEqual({
            notes: [
                {text: 'the second'},
            ],
        })
    });
});
