import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getHttpsRetryCommand } from '../src/tasks.js';

describe('getHttpsRetryCommand', () => {
    it('builds a copyable HTTPS retry command from the final project config', () => {
        assert.equal(
            getHttpsRetryCommand({ appName: 'bar', outputDir: 'foo/bar', silent: false }),
            'npm create --yes @rio-cloud/frontend bar foo/bar -- --https'
        );
    });

    it('retains silent mode in the HTTPS retry command', () => {
        assert.equal(
            getHttpsRetryCommand({ appName: 'bar', outputDir: '/projects/bar', silent: true }),
            'npm create --yes @rio-cloud/frontend bar /projects/bar -- --silent --https'
        );
    });
});
