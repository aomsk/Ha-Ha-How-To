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

//get all users
router.get('/all', async (req, res) => {
    const params = {
        TableName: dynamodbTableName
    }
    try {
        const allUsers = await scanDynamoRecords(params, []);
        const body = {
            users: allUsers
        }
        res.json(body);
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
})

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
router.post('/create-user', async (req, res) => {
    const password_encrypted = await bcrypt.hash(req.body.password, 5)
    const userId = uuid.v1();
    const req_body = {
        "email": req.body.email,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        "password": password_encrypted,
        "userId": userId,
        "createAt": req.body.createAt,
        "updateAt": req.body.updateAt,
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

//edit user
router.patch("/edit-user", async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'userId': req.body.userId
        },
        UpdateExpression: `set ${req.body.updateKey} = :value`,
        ExpressionAttributeValues: {
            ':value': req.body.updateValue
        },
        ReturnValues: 'UPDATED_NEW'
    }
    await dynamodb.update(params).promise().then(response => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
        }
        res.json(body);
    }, error => {
        res.status(500).send(error)
    })
})

async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = router;