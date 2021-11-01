// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import mswServerNode from 'shared/testUtils/mswServerNode';

// Establish API mocking before all tests.
beforeAll(() => mswServerNode.listen({ onUnhandledRequest: 'warn' }));
// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => mswServerNode.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => mswServerNode.close());
