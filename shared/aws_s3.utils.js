import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_P_key,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const AWSUpload = async (type, file, id) => {
  console.log("iddddddd ", id);
  const { filename, createReadStream } = await file;
  const objName = type + "_" + id + "_" + Date.now() + "_" + filename;
  const readStream = createReadStream();

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "big-cloud-instaclone",
      Key: objName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  console.log("Location ", Location);
  return Location;
};
