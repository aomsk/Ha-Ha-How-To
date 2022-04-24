const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
  
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'serch-howto';

//get all categories
router.get("/categories", async (req, res) => {
    const params = {
        TableName: dynamodbTableName
    }
    try {
        const allcategories = await scanDynamoRecords(params, []);
        const body = {
            categories: allcategories
        }
        res.json(body);
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
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