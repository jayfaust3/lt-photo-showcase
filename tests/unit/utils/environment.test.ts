import { after, before } from 'node:test';
import { getEnvVar } from '../../../src/utils';

describe('getEnvVar tests', function () {
    const testKey = 'KEY';
    const testValue = 'VALUE';

    describe('when the given variable is set', function () {
        beforeAll(function () {
            process.env[testKey] = testValue;
        });

        afterAll(function () {
            delete process.env[testKey];
        });

        it('returns the value', function () {
            expect(getEnvVar(testKey)).toEqual(testValue);
        });
    });
    
    describe('when the given variable is not set', function () {
        describe('when a default value is given', function () {
            const defaultValue = 'default';

            it('returns the default value', function () {
                expect(getEnvVar(testKey, defaultValue)).toEqual(defaultValue);
            });
        });

        describe('when no default value is given', function () {
            it('throws an error', function () {
                expect(() => getEnvVar(testKey)).toThrow(new Error(`Unable to find value for environment variable: '${testKey}'`));
            });
        });
    });
});
