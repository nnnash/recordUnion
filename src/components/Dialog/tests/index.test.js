import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import {ADD_NOTE} from '../../../redux/actions';

import Dialog from '..';

const mockStore = configureStore();
let store;
let dialog;

jest.mock('react-inlinesvg', () => {
    const SVG = () => '';

    return SVG;
});
jest.mock('../../NotesList', () => {
    const NotesList = ({children}) => children || '';

    return NotesList;
});

describe('Dialog', () => {
    beforeEach(() => {
        store = mockStore({});
        dialog = mount(<Provider store={store}><Dialog /></Provider>);
    });
    describe('toggler', () => {
        it('should show "open dialog" icon first', () => {
            const openIcon = dialog.find('SVG').at(0);
            expect(openIcon.prop('className')).toContain('openIcon');
            expect(openIcon.prop('className')).not.toContain('hidden');

            const closeIcon = dialog.find('SVG').at(1);
            expect(closeIcon.prop('className')).toContain('hidden');
        });
        it('should toggle icons after toggler click', () => {
            dialog.find('.toggler').simulate('click');
            dialog.mount();
            expect(dialog.find('SVG').at(0).prop('className')).toContain('hidden');
            expect(dialog.find('SVG').at(1).prop('className')).not.toContain('hidden');
            dialog.find('.toggler').simulate('click');
            dialog.mount();
            expect(dialog.find('SVG').at(1).prop('className')).toContain('hidden');
            expect(dialog.find('SVG').at(0).prop('className')).not.toContain('hidden');
        });
    });

    describe('popup', () => {
        it('should be hidden first', () =>
            expect(dialog.find('.dialog').prop('className')).toContain('collapsed')
        );
        it('should toggle popup after toggler click', () => {
            dialog.find('.toggler').simulate('click');
            dialog.mount();
            expect(dialog.find('.dialog').prop('className')).not.toContain('collapsed');
            dialog.find('.toggler').simulate('click');
            dialog.mount();
            expect(dialog.find('.dialog').prop('className')).toContain('collapsed');
        });
        it('should render NotesList and form', () => {
            expect(dialog.find('NotesList')).toHaveLength(1);
            expect(dialog.find('form')).toHaveLength(1);
        });
    });

    describe('form', () => {
        beforeEach(() => {
            dialog.find('.toggler').simulate('click');
        });
        it('should dispatch addNote with text from input on click', () => {
            dialog.find('.input').instance().value = 'New note';
            dialog.find('.button').simulate('click');
            expect(store.getActions()).toContainEqual({
                type: ADD_NOTE,
                payload: {
                    noteContent: 'New note',
                },
            })
        });
    });
});

