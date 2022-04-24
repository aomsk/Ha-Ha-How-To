const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
var uuid = require('uuid');
AWS.config.update({
    region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'comment-howto';

//get comment by commentId
// router.get("/", async (req, res) => {
//     const params = {
//         TableName: dynamodbTableName,
//         Key: {
//             'commentId': req.query.commentId,
//         }
//     }
//     await dynamodb.get(params).promise().then(response => {
//         res.json(response.Item);
//     }, error => {
//         console.log(error);
//         res.status(500).send(error);
//     })
// })

//get all comments
router.get("/all", async (req, res) => {
    const params = {
        TableName: dynamodbTableName
    }
    try {
        const allComments = await scanDynamoRecords(params, []);
        const body = {
            comments: allComments
        }
        res.json(body);
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
})

//create comment
router.post("/create-comment", async (req, res) => {
    const commentId = uuid.v1();
    const req_body = {
        'commentId': commentId,
        'content': req.body.content,
        'author': req.body.author,
        'authorName': req.body.authorName,
        'authorEmail': req.body.authorEmail,
        // 'author_avatar_urls': [],
        'createAt': req.body.createAt,
        'createAtSort': req.body.createAtSort,
        'editAt': req.body.editAt,
        'postId': req.body.postId
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

//edit comment by commentId
router.patch("/edit-comment", async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'commentId': req.body.commentId
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

//delete comment by commentId
router.delete("/delete-comment", async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'commentId': req.body.commentId
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