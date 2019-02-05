import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import NotesList from '..';
import Note from '../Note';

const mockStore = configureStore();
const defaultStore = {
    notes: [
        {text: 'test 1'},
        {text: 'test 2'},
    ],
};

jest.mock('../Note', () => {
    const Note = ({children}) => children || '';

    return Note;
});
jest.mock('../../hocs', () => {
    const {mapProps} = require('recompose');
    const withDelayAppear = mapProps(({delay, ...rest}) => rest);

    return {
        withDelayAppear: withDelayAppear,
    };
});

describe('NotesList', () => {
    it('should render Notes from redux', () => {
        const store = mockStore(defaultStore);
        const notesList = mount(<Provider store={store}><NotesList /></Provider>);

        expect(notesList.find(Note)).toHaveLength(2);
        expect(notesList.find(Note).at(1).prop('text')).toEqual('test 2');
    });
});
