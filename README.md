# react-native-keypair-lib

## Getting started

`$ npm install react-native-keypair-lib --save`

### Mostly automatic installation

`$ react-native link react-native-keypair-lib`

## Usage
```javascript
import ReactNativeKeypairLib from 'react-native-keypair-lib';

ReactNativeKeypairLib.getSafetyQuestions('en_GB');
```

outcome:

```json
{
    "question1":"Where my parents met?",
    "question2":"What is the name of your first pet?",
    "question3":"What is your home town?",
    "question4":"What is the name of your first teacher?",
    "question5":"What is the surname of your mother before wedding?"
}
``` 

```javascript
import ReactNativeKeypairLib from 'react-native-keypair-lib';

const answers = {
    question1: "L'Aquila",
    question2: "C arl",
    question3: "88 ggg",
    question4: "null",
    question5: "null",
};

ReactNativeKeypairLib.sanitizeAnswers(answers);
```
outcome:

```json
{
    "question1": "laquila",
    "question2": "carl",
    "question3": "88ggg",
    "question4": "null",
    "question5": "null",
}
``` 

```javascript
import ReactNativeKeypairLib from 'react-native-keypair-lib';

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const username = "user";

const data = await ReactNativeKeypairLib.recoveryKeypair(answers, PBKDF, username);
```
outcome:

```json
{
    "hashedAnswers": {
        "question1.hash": "XdJytPMWt3anuOPQiUs34eQr49XTsgS4pYNsxQWXprE=",
        "question2.hash": "2hauYmg/8TGnG5IeCTzlFKHvw1XpxbKaMdmEUbUNQ2c=",
        "question3.hash": "ABPAH+DQlCCbi9PSO4+W26vNAd3SoDnuuoLRiRrPDWE=",
        "question4.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
        "question5.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
    },
    "user": {
        "keypair": {
        "private_key": "VUVdIyPeC+x3o66b+n06Jxc4c3p9TBFfaSiaEPx5FmI=",
        "public_key":
            "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=",
        },
    },
}
``` 

```ts
import ReactNativeKeypairLib from 'react-native-keypair-lib';

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const publicKey =
    "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=";
const username = "user";

const data = await ReactNativeKeypairLib.verifyAnswers(answers, PBKDF, username, publicKey);
```
outcome:

```json
true
``` 
