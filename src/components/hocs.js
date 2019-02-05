import React from 'react';
import {branch, renderNothing, compose, withStateHandlers, lifecycle} from 'recompose';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const withDelayAppear = compose(
    withStateHandlers(
        {isHidden: true},
        {
            toggleHidden: () => () => ({
                isHidden: false,
            }),
        },
    ),
    lifecycle({
        componentDidMount() {
            setTimeout(() => this.props.toggleHidden(), this.props.delay);
        },
    }),
    branch(
        ({isHidden}) => isHidden,
        renderNothing,
    ),
);

export const withAppearAnimation = css => Comp => props => (
    <ReactCSSTransitionGroup
        transitionName={css}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
    >
        <Comp {...props} />
    </ReactCSSTransitionGroup>
);
