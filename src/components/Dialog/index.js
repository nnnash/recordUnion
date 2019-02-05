import React from 'react';
import {connect} from 'react-redux';
import {compose, withStateHandlers} from 'recompose';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import {withAppearAnimation} from '../hocs';

import {addNote} from '../../redux/actions';

import NotesList from '../NotesList';

import openIcon from './dialogIcon.svg';
import closeIcon from '../closeIcon.svg';
import arrowIcon from './arrowIcon.svg';
import css from './style.css';

const Dialog = ({onAddNote, setInput, isDialogCollapsed, toggleVisibility}) => (
    <div className={css.dialogWrapper}>
        <div className={css.toggler} onClick={toggleVisibility}>
            <SVG src={openIcon} className={cn(css.icon, css.openIcon, !isDialogCollapsed && css.hidden)} />
            <SVG src={closeIcon} className={cn(css.icon, isDialogCollapsed && css.hidden)} />
        </div>
        <div className={cn(css.dialog, isDialogCollapsed && css.collapsed)}>
            <div className={css.header}>
                <span>Notes</span>
            </div>
            <div className={cn(css.block, css.notesWrapper)}>
                <NotesList noteDelay={1000} />
            </div>
            <form className={cn(css.block, css.form)}>
                <input
                    ref={setInput}
                    type="text"
                    className={css.input}
                    placeholder="Write note here..."
                />
                <button onClick={onAddNote} className={css.button}>
                    <SVG className={css.arrow} src={arrowIcon} />
                </button>
            </form>
        </div>
    </div>
);

export default compose(
    connect(null, {addNote}),
    withStateHandlers(
        {
            input: null,
            isDialogCollapsed: true,
        },
        {
            setInput: () => elem => ({
                input: elem,
            }),
            toggleVisibility: ({isDialogCollapsed}) => () => ({
                isDialogCollapsed: !isDialogCollapsed,
            }),
            onAddNote: ({input}, {addNote}) => e => {
                addNote(input.value);
                input.value = '';
                e.preventDefault();
            },
        },
    ),
    withAppearAnimation(css),
)(Dialog);
