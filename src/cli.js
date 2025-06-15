#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

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
  .command("build [patterns...]", {isDefault: true})
  .alias("b")
  .description("Build the project with specified patterns")
  .summary("Builds the project using the provided patterns.")
  .action((patterns, options) => {
    require("../src/commands/build.js")(patterns, options);
    console.log("Starting the application...");
    // Add your start logic here
  });

// Help output settings
program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
});

program.parse(process.argv);

module.exports = program;
