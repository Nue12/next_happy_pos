import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";
import QRCode from "qrcode";

// Set S3 endpoint to DigitalOcean Spaces
const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const qrCodeImageUpload = async (
  location_id: number,
  table_id: number
) => {
  const data = {
    Bucket: "msquarefdc",
    Key: `happy-pos/qrcode/phone_htet_aung/locationId-${location_id}-tableId-${table_id}.png`,
    ACL: "public-read",
    Body: Buffer.from(""),
  };

  try {
    const qrImageData = await QRCode.toDataURL("https://google.com");
    const buf = Buffer.from(
      qrImageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    data.Body = buf;
    const command = new PutObjectCommand(data);
    const response = await s3Client.send(command);
    console.log(response);
  } catch (err) {
    console.log("error");
    console.error(err);
  }
};

// Change bucket property to your Space name
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `happy-pos/msquare/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);
