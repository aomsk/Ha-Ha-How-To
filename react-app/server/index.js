import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import { upload as uploadFile } from './s3.js'
import multer from 'multer';
import fs from 'fs';
import util from 'util';


const unlinkFile = util.promisify(fs.unlink)

var upload = multer(
    { dest: 'uploads/' }
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "/public")));

app.post(
    '/images',
    upload.single('image'),
    async (req, res) => {
    const file = req.file;
    const description = req.body.description;
    // console.log('post okay');
    // console.log(file);
    const result = await uploadFile(file)
    console.log('description: ' + description);
    await unlinkFile(file.path)
    }
);

var listener = app.listen(3000, () => {
    console.log("server started on port " + listener.address().port);
})
