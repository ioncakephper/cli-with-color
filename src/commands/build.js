const path = require('path');
const logger = require('../utils/logger');
const { loadConfig } = require('../utils/configLoader');

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
    let config = {};
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
    logger.info("Building with patterns:", patterns, "and options:", options);
}

module.exports = { buildAction };