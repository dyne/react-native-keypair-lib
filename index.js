// main index.js
const REGULAR_EXPRESSION = /\W/gi;
const EMPTY_STRING  = "";
const DEFAULT_USER  = "user";
var zenroom = require("zenroom");
const ReactNativeKeypairLib = {
    sanitizeAnswers: function(answers){
        for (const key in answers) {
            if (answers[key]) {
              answers[key] = answers[key]
                .replace(REGULAR_EXPRESSION, EMPTY_STRING)
                .toLowerCase();
            }
          }
          return answers;
    },
    recoveryKeypair: async function(clientSideContractText, answers, PBKDF, username){
        const user = username ? username : DEFAULT_USER;
        const keys = {
            userChallenges: answers,
            username: user,
            key_derivation: PBKDF,
          };
          const data  = {};
          const execution = await zenroom.zencode_exec(clientSideContractText, {
            data: JSON.stringify(data),
            keys: JSON.stringify(keys),
          });
          return JSON.parse(execution.result);
    },
    verifyAnswers: async function(clientSideContractText, answers, PBKDF, username, userPublicKey){
        const execution = await recoveryKeypair(clientSideContractText, answers, PBKDF, username);
        return userPublicKey === execution[username].keypair.public_key;
    }
}
export default ReactNativeKeypairLib;