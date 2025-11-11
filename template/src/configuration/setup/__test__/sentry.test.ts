import type { ErrorEvent, EventHint } from '@sentry/core';
import { cloneDeep } from 'lodash';

import { config } from '../../../config';
import { filterSentryEvent } from '../sentry';

describe('filterSentryEvent', () => {
    const errorEventTemplate: ErrorEvent = {
        type: undefined,
        event_id: 'test-event-id',
        message: 'test event message',
        request: {
            url: 'https://localhost:3000/test-event-url',
        },
        breadcrumbs: [{ type: 'sentry test', level: 'error', data: { key: 'value' } }],
    };

    it('does not touch any values for unfiltered events', () => {
        // given
        const event = cloneDeep(errorEventTemplate);

        // when
        const result = filterSentryEvent(event, {});

        // then
        expect(result).toStrictEqual(errorEventTemplate);
    });

    it('does not crash for minimal events and hints', () => {
        // when
        const result = filterSentryEvent({ type: undefined }, {});

        // then
        expect(result).toStrictEqual({ type: undefined });
    });

    const IGNORED_TYPE_ERRORS = ['Failed to fetch', 'Load failed', 'NetworkError'];

    it.each(IGNORED_TYPE_ERRORS)('should filter out ignored errors', errorMessage => {
        // given
        const event = cloneDeep(errorEventTemplate);
        const hint: EventHint = { originalException: new TypeError(errorMessage) };

        // when
        const result = filterSentryEvent(event, hint);

        // then
        expect(result).toBeNull();
    });

    it('should filter out Outlook link scanning errors', () => {
        // given
        const event = cloneDeep(errorEventTemplate);
        event.exception = {
            values: [
                {
                    type: 'UnhandledRejection',
                    value: 'prefix Non-Error promise rejection captured with value: Object Not Found Matching Id suffix',
                },
            ],
        };
        const hint: EventHint = {};

        // when
        const result = filterSentryEvent(event, hint);

        // then
        expect(result).toBeNull();
    });

    it('should use the full OAuth redirect URL and mask sensitive parameters', () => {
        // given
        const redirectURL = `${config.login.redirectUri}?code=sensitive-code&state=sensitive-state&session_state=sensitive-session-state`;
        vi.spyOn(window, 'location', 'get').mockReturnValue({ href: redirectURL } as Location);

        const event = cloneDeep(errorEventTemplate);
        const truncatedURL = `${
            // biome-ignore lint/style/noNonNullAssertion: It's there. Trust me, Bro.
            redirectURL.substring(0, config.login.redirectUri!.length + 20)
        }...`;
        event.request = { url: truncatedURL };

        const hint: EventHint = {};

        // when
        const result = filterSentryEvent(event, hint);

        // then
        const expectedEvent = cloneDeep(errorEventTemplate);
        expectedEvent.request = {
            url: `${config.login.redirectUri}?code=%5BFiltered+by+client%5D&state=%5BFiltered+by+client%5D&session_state=%5BFiltered+by+client%5D`,
        };
        expect(result).toStrictEqual(expectedEvent);
    });
});
