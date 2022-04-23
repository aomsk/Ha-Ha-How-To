import fs from 'fs';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
const bucketName = "how-to-website-bucket";

// uploads a file to s3
export function upload(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  
    const run = async () => {
      // Create an object and upload it to the Amazon S3 bucket.
      try {
        const results = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(
            "Successfully uploaded the image to https://" +
            uploadParams.Bucket +
            ".s3.amazonaws.com/" +
            uploadParams.Key
        );
        return results; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }
    };
    return run();
}
