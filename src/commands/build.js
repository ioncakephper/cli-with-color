const path = require('path');
const logger = require('../utils/logger');
const { loadConfig } = require('../utils/configLoader');

/**
 * Executes the build action using specified patterns and options.
 *
 * Validates the input patterns and options, ensuring patterns are either a string
 * or an array, and options is a non-null object. Loads configuration from a specified
 * path in options, or defaults to project and global configuration files. If no valid
 * configuration is found, uses default global settings.
 *
 * Logs the loaded configuration and the build process details.
 *
 * @param {string|string[]} patterns - The patterns to use for the build process.
 * @param {Object} options - The options object containing configuration details.
 * @throws {Error} If patterns are not a string or array, or if options is not a valid object.
 */
function buildAction(patterns, options) {
    // Validate patterns
    if (typeof patterns !== 'string' && !Array.isArray(patterns)) {
        throw new Error("Invalid patterns: Expected a string or an array.");
    }

    // Validate options
    if (typeof options !== 'object' || Array.isArray(options) || options === null) {
        throw new Error("Invalid options: Expected an object with properties.");
    }

    // Load configuration
    let config;
    if (options.config) {
        config = loadConfig(options.config);
    }
    if (!config) {
        const projectConfigPath = path.resolve(process.cwd(), 'project.config.json');
        config = loadConfig(projectConfigPath);
    }
    if (!config) {
        const globalConfigPath = path.resolve(__dirname, '../config/global.config.json');
        config = loadConfig(globalConfigPath);
    }
    if (!config) {
        config = { /* default global settings */ };
    }

    logger.info("Loaded configuration:", config);
    logger.info("Options", options);

    // Override config with options
    options = { ...config, ...options };

    patterns = patterns.length > 0 ? patterns : options.patterns;
    

    logger.info("Loaded configuration:", config);
    logger.info("Building with patterns:", patterns, "and options:", options);
}

module.exports = { buildAction };