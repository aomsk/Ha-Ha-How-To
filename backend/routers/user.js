const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
var uuid = require('uuid');
const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
  
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'user-howto';

//get user by email
router.get('/', async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'email': req.query.email,
            // 'userId': req.query.userId,
        }
    }
    await dynamodb.get(params).promise().then(response => {
        res.json(response.Item);
    }, error => {
        console.log(error);
        res.status(500).send(error);
    })
})

//create user
router.post('/', async (req, res) => {
    const password_encrypted = await bcrypt.hash(req.body.password, 5)
    const userId = uuid.v1();
    const req_body = {
        "email": req.body.email,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        "password": password_encrypted,
        "userId": userId
    }
    const params = {
        TableName: dynamodbTableName,
        Item: req_body
    }
    await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: "SAVE",
            Message: "SUCCESS",
            Item: req_body
        }
        res.json(body);
    }, error => {
        res.status(500).send(error)
    })
})

module.exports = router;