'use strict';
jest.dontMock('../__JSFILENAME__');

describe('__REACT_CLASS__', () => {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const TestUtils = require('react-addons-test-utils');
    let __REACT_CLASS__;

    beforeEach(() => {
        __REACT_CLASS__ = require('../__JSFILENAME__');
    });

    it('should exists', () => {
        const props = {};
        const __CLASSINSTANCE__ = TestUtils.renderIntoDocument( <__REACT_CLASS__ {...props} /> );
        expect(TestUtils.isCompositeComponent(__CLASSINSTANCE__)).toBeTruthy();
    });

    it('should render', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<__REACT_CLASS__ />);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('div');
        expect(result).toEqual(<div></div>);
    });
});
