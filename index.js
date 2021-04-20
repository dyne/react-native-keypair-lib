// main index.js

import {QUESTION_FOLDER, QUESTION_FILE_PREPEND} from "@env";
import * as RNFS from "react-native-fs";
const DEFAULT_CLIENT_SIDE_CONTRACT = __dirname + "/zencode/Keypair-Creation-Client-Side.zen";
const REGULAR_EXPRESSION = /\W/gi;
const EMPTY_STRING  = "";
const DEFAULT_USER  = "user";
const DEFAULT_LOCALE = "en_GB";
const DEFAULT_QUESTION_FOLDER = "/props/";

const ReactNativeKeypairLib = {
    getSafetyQuestions: function(userLocale){
        const locale = userLocale ? userLocale : DEFAULT_LOCALE;
        const questionFolder = QUESTION_FOLDER ? QUESTION_FOLDER : DEFAULT_QUESTION_FOLDER;
        const prependFileName = QUESTION_FILE_PREPEND ? QUESTION_FILE_PREPEND : "questions-";
        const propertiesFileName = questionFolder + prependFileName + locale +".json";
        const defaultPropertiesFileName = __dirname + "/props/questions-en_GB.json";
        return readJSONFromFile(propertiesFileName, defaultPropertiesFileName);
    },
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
    recoveryKeypair: async function(answers, PBKDF, username){
        const CLIENT_SIDE_CONTRACT = readStringFromFile(
            DEFAULT_CLIENT_SIDE_CONTRACT
          );
        const user = username ? username : DEFAULT_USER;
        const keys = {
            userChallenges: answers,
            username: user,
            key_derivation: PBKDF,
          };
          const data  = {};
        
          const execution = await zencode_exec(CLIENT_SIDE_CONTRACT, {
            data: JSON.stringify(data),
            keys: JSON.stringify(keys),
          });
        
          return JSON.parse(execution.result);
    },
    verifyAnswers: async function(answers, PBKDF, username, userPublicKey){
        const execution = await recoveryKeypair(answers, PBKDF, username);
        return userPublicKey === execution[username].keypair.public_key;
    }
}

const readJSONFromFile = async function (filePath, defaultFilePath) {
    return JSON.parse(readStringFromFile(filePath, defaultFilePath));
};
  
const readStringFromFile = async function (filePath, defaultFilePath) {
    try {
        const file = await RNFS.readFile(filePath);
        return file.toString();
    } catch (err) {
        const file = await RNFS.readFile(defaultFilePath);
        return file.toString();
    }
};

export default ReactNativeKeypairLib;