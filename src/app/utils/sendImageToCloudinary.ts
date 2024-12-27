import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  // Configuration

  return new Promise((resolve, reject) => {
    // Upload an image
    // const uploadResult = await

    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);

        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('File deleted successfully');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null,path.join(process.cwd(), 'uploads/'));
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
