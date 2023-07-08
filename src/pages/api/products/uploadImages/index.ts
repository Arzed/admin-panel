import { Form } from '@ts-stack/multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types'
import { mongooseConnect } from '@/lib/mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const bucketName = 'images-upload-test';

interface FormProps {
    fields: any
    files: any
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect();

    const form = new Form();
    const {fields,files}: FormProps = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files})
        });
    });
    const client = new S3Client({
        endpoint: process.env.AWS_ENDPOINT,
        region: process.env.AWS_DEFAULT_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
        }
    });
    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path) as string
        }))
        const link = `https://is3.cloudhost.id/${bucketName}/${newFilename}`;
        links.push(link);
        console.log(links)
    }
    return res.json({links})
}

export const config = {
    api: {bodyParser: false},
};