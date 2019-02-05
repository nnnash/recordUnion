import React from 'react';
import {connect} from 'react-redux';

import {withDelayAppear} from '../hocs';
import Note from './Note';

import css from './style.css';

const ListedNote = withDelayAppear(props => (
    <li><Note {...props} /></li>
));

const NotesList = ({notes, noteDelay}) => (
    <ul className={css.notesList}>
        {notes.map((note, ind) => (
            <ListedNote key={ind} id={ind} text={note.text} delay={noteDelay} />
        ))}
    </ul>
);

export default connect(
    ({notes}) => ({notes}),
)(NotesList);
