const fs = require('fs');

const logger = require('../../src/utils/logger');

/**
 * Loads and parses a JSON configuration file from the specified path.
 *
 * @param {string} configPath - The path to the configuration file.
 * @returns {Object|null} The parsed configuration object, or null if the file
 * does not exist or cannot be parsed.
 *
 * Logs a warning if the configuration file is not found, and logs an error
 * if the file cannot be parsed.
 */
function loadConfig(configPath) {
    if (!fs.existsSync(configPath)) {
        logger.warn(`Configuration file not found at ${configPath}`);
        return null;
    }
    
    try {
        const configFile = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(configFile);
    } catch (error) {
        logger.error(`Failed to parse configuration file at ${configPath}: ${error.message}`);
        return null;
    }
}

module.exports = { loadConfig };