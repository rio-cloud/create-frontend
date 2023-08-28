import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

// Mock ResizeObserver that is used by the ApplicationHeader
const ResizeObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock IntersectionObserver - used by the RioNotification component
const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock'
const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
