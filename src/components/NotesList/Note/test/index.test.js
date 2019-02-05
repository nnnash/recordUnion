import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import {REMOVE_NOTE} from '../../../../redux/actions';

import Note from '..';

const mockStore = configureStore();
let store;
let note;

jest.mock('react-inlinesvg', () => {
    const SVG = () => '';

    return SVG;
});

describe('Note', () => {
    beforeEach(() => {
        store = mockStore();
        note = mount(<Provider store={store}><Note text="test" id={2} /></Provider>);
    });
    it('should render given note', () => {
        expect(note.find('.text').prop('children')).toEqual('test');
        expect(note.find('SVG')).toHaveLength(1);
    });

    it('dispatches removeNote by click on icon', () => {
        note.find('.iconWrapper').simulate('click');
        expect(store.getActions()).toContainEqual({
            type: REMOVE_NOTE,
            payload: {noteId: 2},
        });
    });

    it('should render validation error on empty line', () => {
        note = mount(<Provider store={store}>
            <Note text="" id={2} />
        </Provider>);
        expect(note.find('.error')).toHaveLength(1);
    });
});
