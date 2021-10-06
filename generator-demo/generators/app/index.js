const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    const reactInfoPrompt = [
      {
        type: "input",
        name: "projectName",
        message: "Name of your app",
        default: "skand-yeoman-demo",
      },
      {
        type: "input",
        name: "version",
        message: "App version",
        default: "0.0.0",
      },
    ];
    this.templateDir = "react";
    this.projectInfo = await this.prompt(reactInfoPrompt);
  }

  writing() {
    this.fs.copy(
      this.templatePath(this.templateDir + "/"),
      this.destinationPath(`${this.projectInfo.projectName}`)
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/package.json"),
      this.destinationPath(`${this.projectInfo.projectName}/package.json`),
      {
        projectName: this.projectInfo.projectName,
        version: this.projectInfo.version,
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/README.md"),
      this.destinationPath(`${this.projectInfo.projectName}/README.md`),
      {
        projectName: this.projectInfo.projectName,
      }
    );

    // calls pulumi and codepipeline options here
    this.composeWith(require.resolve("../pulumi"), this.projectInfo);
    this.composeWith(require.resolve("../pipeline"), this.projectInfo);
  }
};
