"use strict";
const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config();
const bucketName = config.require("bucketName");

// Create a new S3 Bucket
const bucket = new aws.s3.Bucket(bucketName, {
  website: {
    indexDocument: "index.html",
  },
});

// get origin access identification for s3Distribution later on
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
  bucketName
);

const s3Distribution = new aws.cloudfront.Distribution("s3Distribution", {
  origins: [
    {
      domainName: bucket.bucketRegionalDomainName,
      originId: bucket.arn,
      s3OriginConfig: {
        originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
      },
    },
  ],
  enabled: true,
  isIpv6Enabled: true,
  defaultRootObject: "index.html",
  defaultCacheBehavior: {
    allowedMethods: ["GET", "HEAD"],
    cachedMethods: ["GET", "HEAD"],
    targetOriginId: bucket.arn,
    forwardedValues: {
      queryString: false,
      cookies: {
        forward: "none",
      },
    },
    viewerProtocolPolicy: "allow-all",
    minTtl: 0,
    defaultTtl: 3600,
    maxTtl: 86400,
  },
  priceClass: "PriceClass_All",
  restrictions: {
    geoRestriction: {
      restrictionType: "none",
    },
  },
  viewerCertificate: {
    cloudfrontDefaultCertificate: true,
  },
});

// Export the name of the bucket
exports.bucketName = bucket.id;
exports.bucket = bucket;
exports.originAccessIdentity = originAccessIdentity;
exports.cloudfrontDistribution = s3Distribution;
