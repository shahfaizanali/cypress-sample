const md5 = require('md5');
const S3 = require('aws-sdk/clients/s3');
const FileUtils = require('./file-util');

const s3Host = 'http://localhost:9090';

class Util {
  static getRandomName = () =>
    Math.random()
      .toString(36)
      .substring(2, 8);

  static getRandomID = () => Math.floor(Math.random() * 899999 + 100000);

  static folderPath = (id, strLen = 6) =>
    `${md5(id.toString())
      .substring(0, strLen)
      .match(/.{1,2}/g)
      .join('/')}/${id}`;

  static uploadToS3 = ([s3BucketName, filePath, uploadPath]) => {
    const s3 = new S3({ endpoint: s3Host, s3ForcePathStyle: true });
    s3.config.update({
      credentials: { accessKeyId: 'e2e', secretAccessKey: 'e2e' },
    });
    const params = {
      Bucket: s3BucketName,
      Key: uploadPath,
      Body: FileUtils.read(filePath),
    };
    return s3.upload(params).promise();
  };
}

module.exports = Util;
