import React, {Fragment} from 'react';

import {withDelayAppear} from './hocs';
import NotesList from './NotesList';
import Dialog from './Dialog';
import './style.css';

const DelayedNotesList = withDelayAppear(NotesList);
const DelayedDialog = withDelayAppear(Dialog);

export default () => (
    <Fragment>
        <DelayedNotesList delay={2000} noteDelay={2000} />
        <DelayedDialog delay={1000} />
    </Fragment>
);
