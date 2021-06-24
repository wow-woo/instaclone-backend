import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_P_key,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const AWSUpload = async (folderName, file, id) => {
  const { filename, createReadStream } = await file;
  const objName = folderName + "/" + id + "_" + Date.now() + "_" + filename;
  const readStream = createReadStream();

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: process.env.BUCKET,
      Key: objName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  console.log("Location ", Location);
  return Location;
};
