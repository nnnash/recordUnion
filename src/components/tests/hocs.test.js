import React from 'react';
import {mount} from 'enzyme';

jest.useFakeTimers();

import {withDelayAppear} from '../hocs';

const Element = () => <div />;
const DelayedElement = withDelayAppear(Element);

describe('withDelayAppear', () => {
    it('should render nothing immediately', () => {
        const element = mount(<DelayedElement delay={1000} />);

        expect(element.find('Nothing')).toHaveLength(1);
    });

    it('should render element after delay', () => {
        const element = mount(<DelayedElement delay={1000} />);
        expect(element.find('Nothing')).toHaveLength(1);
        jest.runAllTimers();
        element.mount();
        expect(element.find('Nothing')).toHaveLength(0);
        expect(element.find(Element)).toHaveLength(1);
    });
});
