const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    const pipeline = [
      {
        type: "confirm",
        name: "confirmation",
        message: "Do you want to generate AWS Codepipeline buildspec?",
        default: "skand-yeoman-demo",
      },
    ];
    this.templateDir = "codepipeline";
    this.pipelineInfo = await this.prompt(pipeline);
  }

  // if user doesnt wish to generate, dont create buildspec
  writing() {
    if (!this.pipelineInfo.confirmation) return;

    this.fs.copy(
      this.templatePath(this.templateDir + "/"),
      this.destinationPath(`${this.options.projectName}`)
    );
  }
};
