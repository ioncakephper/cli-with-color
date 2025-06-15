const fs = require('fs');

const logger = require('../../src/utils/logger');

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