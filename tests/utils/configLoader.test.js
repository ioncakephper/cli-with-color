const fs = require('fs');
const logger = require('../../src/utils/logger');
const {loadConfig} = require('../../src/utils/configLoader');

jest.mock('fs');
jest.mock('../../src/utils/logger');

describe('loadConfig', () => {
    test('test_loadConfig_successfulParsing', () => {
        const configPath = 'validConfig.json';
        const configData = { key: 'value' };

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(configData));

        const result = loadConfig(configPath);

        expect(result).toEqual(configData);
        expect(logger.error).not.toHaveBeenCalled();
        expect(logger.warn).not.toHaveBeenCalled();
    });

    test('test_loadConfig_fileNotFound', () => {
        const configPath = 'nonExistentConfig.json';

        fs.existsSync.mockReturnValue(false);

        const result = loadConfig(configPath);

        expect(result).toBeNull();
        expect(logger.warn).toHaveBeenCalledWith(`Configuration file not found at ${configPath}`);
    });

    test('test_loadConfig_invalidJSON', () => {
        const configPath = 'invalidConfig.json';

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('invalid json');

        const result = loadConfig(configPath);

        expect(result).toBeNull();
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining(`Failed to parse configuration file at ${configPath}`));
    });

    test('test_loadConfig_emptyFile', () => {
        const configPath = 'emptyConfig.json';

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('');

        const result = loadConfig(configPath);

        expect(result).toBeNull();
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining(`Failed to parse configuration file at ${configPath}`));
    });

    test('test_loadConfig_successfulWithArgs', () => {
        const configPath = 'validConfigWithArgs.json';
        const configData = { key: 'value' };

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(configData));

        const result = loadConfig(configPath);

        expect(result).toEqual(configData);

    });

    test('test_loadConfig_pathIsDirectory', () => {
        const configPath = 'directoryPath';

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockImplementation(() => { throw new Error('EISDIR: illegal operation on a directory'); });

        const result = loadConfig(configPath);

        expect(result).toBeNull();
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining(`Failed to parse configuration file at ${configPath}`));
    });
});