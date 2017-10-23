import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';

export class UploadRoute extends BaseRoute {

  public static create(router: Router) {

    router.post('/sample/upload', (req: Request, res: Response, next: NextFunction) => {
      new UploadRoute().uploadFile(req, res, next);
    });

    router.get('/sample/form', (req: Request, res: Response, next: NextFunction) => {
      new UploadRoute().displayForm(req, res, next);
    });
  }

  constructor() {
    super();
  }
  public uploadFile(req: Request, res: Response, next: NextFunction) {
    // AWS.config = new AWS.Config();
    AWS.config.accessKeyId = 'AKIAJ32HVQMQ654J56IA';
    AWS.config.secretAccessKey = '';
    const s3 = new AWS.S3({region: 'us-west-1'});
    const myBucket = 'mister-m-codes-2018';
    const myKey = ''

    const storageConfig = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, './uploads/');
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      }
    });

    const upload = multer({ storage: storageConfig}).single('sampleUpload');
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.end('Error uploading file');
      }
      console.log(req['file']['path']);

      //const theFile = fs.createReadStream(req['file']['path']);
      /*
      s3.createBucket({Bucket: myBucket}, (err, data) => {
        if (err) {
          console.log(err, 'Problem uploading to S3');
          return res.end('Proble uploading to S3');
        }

      });
*/
console.log(req['file']);
const filename = req['file']['originalname'];

const options = {
  link: ''
};
fs.readFile(req['file']['path'], (err, data) => {
  if (err) {
      console.log('error reading file from path ', req['file']['path']);
  } else {
    const params = {
      Bucket: myBucket,
      Key: filename,
      ACL: 'public-read',
      Body: data
    };
    s3.putObject(params, (err, data) => {
      if (err) {
        return console.log('Error uploading the file at method putObject', err);
      }
      console.log('File Uploaded to S3');
      s3.getSignedUrl('getObject', {Bucket: myBucket, Key: filename}, (err, url) => {
        options.link = url;
         // res.end('File is uploaded' + filename);
         console.log(url);
        return this.render(req, res, 'confirm-upload.hbs', options);
      });

    });
  }
});



    });
  } // end uploadFile

  public displayForm(req: Request, res: Response, next: NextFunction) {
    this.render(req, res, 'upload.hbs');
  }
}
