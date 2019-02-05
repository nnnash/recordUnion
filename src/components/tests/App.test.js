import React from 'react';
import {mount} from 'enzyme';

import App from '../App';

jest.mock('../NotesList', () => {
    const NotesList = ({children}) => children || '';

    return NotesList;
});
jest.mock('../Dialog', () => {
    const Dialog = ({children}) => children || '';

    return Dialog;
});
jest.mock('../hocs', () => {
    const {mapProps} = require('recompose');
    const withDelayAppear = mapProps(({delay, ...rest}) => rest);

    return {
        withDelayAppear: withDelayAppear,
    };
});

describe('App.js', () => {
    it('should render both Dialog and NotesList', () => {
        expect(mount(<App />)).toMatchSnapshot();
    });
});
