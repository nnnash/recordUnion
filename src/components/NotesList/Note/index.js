import React from 'react';
import {connect} from 'react-redux';
import {compose, withHandlers, withProps} from 'recompose';
import SVG from 'react-inlinesvg';
import validate from 'validate.js';

import {removeNote} from '../../../redux/actions';
import {withAppearAnimation, withDelayAppear} from '../../hocs';

import closeIcon from '../../closeIcon.svg';

import css from './style.css';

const MAX_LEN = 100;
const EMOJI_REG_EXP = /^(?:(?!(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])).)*$/;

const Validation = withDelayAppear(({errors}) => (
    <div className={css.error}>
        {errors.map((error, ind) => (
            <div key={ind}>
                <span>Error: </span>
                <span>{error}</span>
            </div>
        ))}
    </div>
));

const Note = ({text, onRemoveNote, validations}) => (
    <div className={css.note}>
        <div className={css.firstLine}>
            <span className={css.text}>{text}</span>
            <span className={css.iconWrapper} onClick={onRemoveNote}>
                <SVG src={closeIcon} className={css.icon} />
            </span>
        </div>
        {validations.length > 0 && <Validation delay={500} errors={validations} />}
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
            format: {
                pattern: EMOJI_REG_EXP,
                message: "Shouldn’t contain emojis"
            },
        }) || [],
    })),
    withAppearAnimation(css),
)(Note);
