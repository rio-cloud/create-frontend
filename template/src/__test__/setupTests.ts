import * as matchers from '@testing-library/jest-dom/matchers';
import createFetchMock from 'vitest-fetch-mock';

expect.extend(matchers);

// Let the UIKIT components (like the tooltip) recognize the test as being from desktop since
// tooltips are not displayed on mobile.
document.documentElement.classList.add('ua-desktop');

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock'
const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

// RTL internally only supports `jest.advanceTimersByTime`. See:
// https://github.com/testing-library/react-testing-library/blob/main/src/pure.js#L51
// Therefore, we need to mock it with the Vitest version. Otherwise, tests
// using fake timers might break by e.g. timing out.
vi.stubGlobal('jest', {
    advanceTimersByTime: (time: number) => vi.advanceTimersByTime(time),
});
