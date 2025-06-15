#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const logger = require('../src/utils/logger'); // Import the logger

const {buildAction} = require('../src/commands/build');

// Read package.json
const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const program = new Command();

// Set program name, description, and version
program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

// Add your command definitions here
program
  .command("build [patterns...]", { isDefault: true })
  .alias("b")
  .description("Build the project with specified patterns")
  .summary("Builds the project using the provided patterns.")
  .action((patterns, options) => {
    try {
      // Add your start logic here
      buildAction(patterns, options);
    } catch (error) {
      logger.error("An error occurred while executing the build command:", error.message);
    }
  });

// Help output settings
program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
});

program.parse(process.argv);

module.exports = program;