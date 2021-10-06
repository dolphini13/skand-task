const Generator = require("yeoman-generator");

// ask for re gion, appname and bucket name!
module.exports = class extends Generator {
  async prompting() {
    const pulumiInfo = [
      {
        type: "input",
        name: "region",
        message: "Pulumi Config: S3 Region",
        default: "us-east-1",
      },
      {
        type: "input",
        name: "pulumiAppName",
        message: "Pulumi Application Name",
        default: "yeoman-app",
      },
      {
        type: "input",
        name: "pulumiBucketname",
        message: "S3 Bucket Name",
        default: "yeoman-bucket",
      },
    ];
    this.templateDir = "pulumi";
    this.pulumiInfo = await this.prompt(pulumiInfo);
  }

  writing() {
    this.fs.copy(
      this.templatePath(this.templateDir + "/"),
      this.destinationPath(`${this.options.projectName}/pulumi/`)
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/package.json"),
      this.destinationPath(`${this.options.projectName}/pulumi/package.json`),
      {
        pulumiAppName: this.pulumiInfo.pulumiAppName,
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/Pulumi.yaml"),
      this.destinationPath(`${this.options.projectName}/pulumi/Pulumi.yaml`),
      {
        pulumiAppName: this.pulumiInfo.pulumiAppName,
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/Pulumi.dev.yaml"),
      this.destinationPath(
        `${this.options.projectName}/pulumi/Pulumi.dev.yaml`
      ),
      {
        pulumiAppName: this.pulumiInfo.pulumiAppName,
        region: this.pulumiInfo.region,
        pulumiBucketname: this.pulumiInfo.pulumiBucketname,
      }
    );
  }
};
