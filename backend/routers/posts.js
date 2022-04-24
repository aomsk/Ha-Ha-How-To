const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
var uuid = require('uuid');
AWS.config.update({
    region: "us-east-1",
});
  
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'post-howto';

//create post
router.post("/create-post", async (req, res) => {
    const postId = uuid.v1();
    const req_body = {
        'postId': postId,
        'title': req.body.title,
        'content': req.body.content,
        'author': req.body.author,
        'categories': req.body.categories,
        'createAt': req.body.createAt,
        'createAtSort': req.body.createAtSort,
        // 'author_avatar_urls': [],
        'editAt': req.body.editAt,
        'images': req.body.images,
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

//get post by postId
router.get("/", async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'postId': req.query.postId,
        }
    }
    await dynamodb.get(params).promise().then(response => {
        res.json(response.Item);
    }, error => {
        console.log(error);
        res.status(500).send(error);
    })
})

//get all posts
router.get("/all", async (req, res) => {
    const params = {
        TableName: dynamodbTableName
    }
    try {
        const allPosts = await scanDynamoRecords(params, []);
        // const body = {
        //     allPosts
        // }
        res.json(allPosts);
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
})

//edit post
router.patch("/edit-post", async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'postId': req.body.postId
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

//delete post
router.delete("/delete-post", async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'postId': req.body.postId
        },
        ReturnValues: 'ALL_OLD'
    }
    await dynamodb.delete(params).promise().then(response => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
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