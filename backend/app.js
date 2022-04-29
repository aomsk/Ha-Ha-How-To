const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PATCH, PUT, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

// /post
const postRouter = require('./routers/posts');
app.use(express.json());
app.use('/posts', postRouter);

// /comment
const commentRouter = require('./routers/comments');
app.use(express.json());
app.use('/comments', commentRouter);

// /categories
const categoriesRouter = require('./routers/categories');
app.use(express.json());
app.use('/categories', categoriesRouter);

// /user
const userRouter = require('./routers/users');
app.use(express.json());
app.use('/users', userRouter);

// /image
// const imageRouter = require('./routers/images');
// app.use(express.json());
// app.use('/image', imageRouter);


app.get('/', (req, res) => {
    res.send('<h1>Node.js CRUD API</h1> <h4>Message: Success</h4> <p>Version: 1.0.0</p>')
})

app.get('/health', (req, res) => {
    res.send();
})

app.listen(port, () => {
    console.log('Demo app is up and listening to port: ', + port)
});