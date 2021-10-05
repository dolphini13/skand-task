"use strict";
const aws = require("@pulumi/aws");

// Create an AWS resource (S3 Bucket)
const SkandPulumi = new aws.s3.Bucket(
  "skand-pulumi",
  {
    acl: "private",
    bucket: "skand-codepipline-demo",
    forceDestroy: false,
    website: {
      indexDocument: "index.html",
    },
  },
  {
    protect: true,
  }
);

// Export the name of the bucket
exports.bucketName = SkandPulumi.id;
