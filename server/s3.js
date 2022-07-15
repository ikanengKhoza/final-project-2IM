require("dotenv").config();
const fs = require("fs");
const S3 = require("@aws-sdk/client-s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3buc = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	return s3buc.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;
