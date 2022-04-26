const express = require("express");
const router = express.Router();

require("dotenv").config()

const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.REGION,
})

const BUCKET = process.env.BUCKET
const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log('file : ', file);
            cb(null, file.originalname)
        }
    })
})

//upload image
router.post('/upload', upload.single('file'), async function (req, res, next) {
    console.log(req.file);
    // res.send('Successfully uploaded ' + req.file.location + ' location!')
    const body = {
        Message: 'UPLOAD IMAGE SUCCESS',
        originalname: req.file.originalname,
        location: req.file.location
    }
    res.json(body);
})

//delete one image
router.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    // res.send("Delete Image Successfully")
    const body = {
        Message: 'DELETE IMAGE SUCCESS',
        image: filename
    }
    res.json(body);

})

module.exports = router;