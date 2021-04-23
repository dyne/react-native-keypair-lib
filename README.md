# react-native-keypair-lib

## Getting started

`$ npm install react-native-keypair-lib --save`

### Mostly automatic installation

`$ react-native link react-native-keypair-lib`


## Usage (Android)


Make alterations to the following files:

* `android/settings.gradle`

```gradle
...
include ':react-native-keypair-lib'
project(':react-native-keypair-lib').projectDir = new File(settingsDir, '../node_modules/react-native-keypair-lib/android')
```

* `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    implementation project(':react-native-keypair-lib')
}
```

* register module (in MainActivity.java)

  * For react-native below 0.19.0 (use `cat ./node_modules/react-native/package.json | grep version`)

```java
import com.reactlibrary.ReactNativeKeypairLibPackage;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new ReactNativeKeypairLibPackage())      // <------- add package
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

}
```

  * For react-native 0.19.0 and higher
```java
import com.reactlibrary.ReactNativeKeypairLibPackage; // <------- add package

public class MainActivity extends ReactActivity {
   // ...
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(), // <---- add comma
        new ReactNativeKeypairLibPackage() // <---------- add package
      );
    }
```

  * For react-native 0.29.0 and higher ( in MainApplication.java )
```java
import com.reactlibrary.ReactNativeKeypairLibPackage; // <------- add package

public class MainApplication extends Application implements ReactApplication {
   // ...
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(), // <---- add comma
        new ReactNativeKeypairLibPackage() // <---------- add package
      );
    }
```


## Usage

```javascript
import { sanitizeAnswers } from 'react-native-keypair-lib';

const answers = {
    question1: "L'Aquila",
    question2: "C arl",
    question3: "88 ggg",
    question4: "null",
    question5: "null",
};

sanitizeAnswers(answers);
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
import { recoveryKeypair } from 'react-native-keypair-lib';

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const username = "user";

const data = await recoveryKeypair(contractClientSide, answers, PBKDF);
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
import {verifyAnswers } from 'react-native-keypair-lib';

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

const data = await verifyAnswers(contractClientSide, answers, PBKDF, publicKey);
```
outcome:

```json
true
``` 
