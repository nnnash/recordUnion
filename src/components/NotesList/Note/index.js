import React from 'react';
import {connect} from 'react-redux';
import {compose, withHandlers, withProps} from 'recompose';
import SVG from 'react-inlinesvg';
import validate from 'validate.js';

import {removeNote} from '../../../redux/actions';
import {withAppearAnimation} from '../../hocs';

import closeIcon from '../../closeIcon.svg';

import css from './style.css';

const MAX_LEN = 100;

const Note = ({text, onRemoveNote, validations}) => (
    <div className={css.note}>
        <span className={css.text}>{text}</span>
        <span className={css.iconWrapper} onClick={onRemoveNote}>
            <SVG src={closeIcon} className={css.icon} />
        </span>
        {validations.length > 0 && (
            <div className={css.error}>
                {validations.map((error, ind) => (
                    <div key={ind}>
                        <span>Error: </span>
                        <span>{error}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default compose(
    connect(null, {removeNote}),
    withHandlers({
        onRemoveNote: ({id, removeNote}) => () => {
            removeNote(id);
        },
    }),
    withProps(({text}) => ({
        validations: validate.single(text, {
            presence: {
                allowEmpty: false,
                message: 'Shouldn’t be empty',
            },
            length: {
                maximum: MAX_LEN,
                message: `Number of characters shouldn’t exceed ${MAX_LEN}`,
            },
        }) || [],
    })),
    withAppearAnimation(css),
)(Note);
