const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

require("dotenv").config()

const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PATCH, PUT, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

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

app.post('/upload', upload.single('file'), async function (req, res, next) {
    console.log(req.file);
    // res.send('Successfully uploaded ' + req.file.location + ' location!')
    const body = {
        Message: 'UPLOAD IMAGE SUCCESS',
        originalname: req.file.originalname,
        location: req.file.location
    }
    res.json(body);
})

// delete one image
app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    // res.send("Delete Image Successfully")
    const body = {
        Message: 'DELETE IMAGE SUCCESS',
    }
    res.json(body);

})

// /post
const postRouter = require('./routers/posts');
app.use(express.json());
app.use('/posts', postRouter);

// /comment
const commentRouter = require('./routers/comments');
app.use(express.json());
app.use('/comments', commentRouter);

// /serch
const serchRouter = require('./routers/serch');
app.use(express.json());
app.use('/serch', serchRouter);

// /user
const userRouter = require('./routers/user');
app.use(express.json());
app.use('/user', userRouter);

// /users
const usersRouter = require('./routers/users');
app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('<h1>Node.js CRUD API</h1> <h4>Message: Success</h4> <p>Version: 1.0.0</p>')
})

app.get('/health', (req, res) => {
    res.send();
})

app.listen(port, () => {
    console.log('Demo app is up and listening to port: ', + port)
});