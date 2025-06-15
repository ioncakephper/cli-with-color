const {buildAction}  = require('../../src/commands/build');
const logger = require('../../src/utils/logger');
const path = require('path');

describe('Build Action Tests', () => {
    test('testBuildActionLogsInfoWithValidStringPatternAndOptions', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = 'src/**/*.js';
        const options = { verbose: true };

        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Building with patterns:', patterns, 'and options:', options);
        consoleSpy.mockRestore();
    });

    test('testBuildActionLogsInfoWithValidArrayPatternAndOptions', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = ['src/**/*.js', 'lib/**/*.js'];
        const options = { verbose: true };

        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Building with patterns:', patterns, 'and options:', options);
        consoleSpy.mockRestore();
    });

    test('testBuildActionHandlesEmptyArrayPattern', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = [];
        const options = { verbose: true };

        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Building with patterns:', patterns, 'and options:', options);
        consoleSpy.mockRestore();
    });

    test('testBuildActionThrowsErrorForInvalidPatternType', () => {
        const patterns = 123;
        const options = { verbose: true };

        expect(() => buildAction(patterns, options)).toThrow("Invalid patterns: Expected a string or an array.");
    });

    test('testBuildActionThrowsErrorForInvalidOptionsType', () => {
        const patterns = 'src/**/*.js';
        const options = 'invalidOptions';

        expect(() => buildAction(patterns, options)).toThrow("Invalid options: Expected an object with properties.");
    });

    test('testBuildActionThrowsErrorForNullOptions', () => {
        const patterns = 'src/**/*.js';
        const options = null;

        expect(() => buildAction(patterns, options)).toThrow("Invalid options: Expected an object with properties.");
    });

    test('testBuildActionLoadsDefaultGlobalSettings', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = 'src/**/*.js';
        const options = {};

        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Loaded configuration:', {});
        consoleSpy.mockRestore();
    });

    test('testBuildActionResolvesProjectConfigPath', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = 'src/**/*.js';
        const options = {};

        const projectConfigPath = path.resolve(process.cwd(), 'project.config.json');
        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Loaded configuration:', expect.anything());
        consoleSpy.mockRestore();
    });

    test('testBuildActionLoadsConfigurationFromOptions', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = 'src/**/*.js';
        const options = { config: 'custom.config.json' };

        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Loaded configuration:', expect.anything());
        consoleSpy.mockRestore();
    });

    test('testBuildActionHandlesMissingConfigurationFile', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const patterns = 'src/**/*.js';
        const options = { config: 'nonexistent.config.json' };

        buildAction(patterns, options);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO:'), 'Loaded configuration:', {});
        consoleSpy.mockRestore();
    });

    test('testBuildActionThrowsErrorForNonObjectOptions', () => {
        const patterns = 'src/**/*.js';
        const options = 'notAnObject';

        expect(() => buildAction(patterns, options)).toThrow("Invalid options: Expected an object with properties.");
    });

    test('testBuildActionThrowsErrorForArrayOptions', () => {
        const patterns = 'src/**/*.js';
        const options = [];

        expect(() => buildAction(patterns, options)).toThrow("Invalid options: Expected an object with properties.");
    });
});