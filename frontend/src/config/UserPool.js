import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    // region: 'us-east-1',
    // IdentityPoolId: '',
    UserPoolId: 'us-east-1_4idH8wV8E',
    ClientId: '2ca43ssmqkl5j5ifjv949nnnrq'
}

export default new CognitoUserPool(poolData)