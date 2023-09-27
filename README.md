This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started(For Development)

## Setting Up React Native Environment
>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Setting Up React Native + Realm Environment
>**Note**: Make sure you have completed the [Install Realm - React Native SDK](https://www.mongodb.com/docs/realm/sdk/react-native/install/#install-realm-using-npm) instructions till "(7) Run the App" step, before proceeding.

## Setting Up Atlas Device Sync +Realm App Service Environment 
>**Note**: Make sure you have completed the Prerequisite on [Device Sync - React Native SDK](https://www.mongodb.com/docs/realm/sdk/react-native/quick-start/#:~:text=%7D%3B-,Add%20Atlas%20Device%20Sync%20(Optional),-After%20getting%20your) before proceeding.


## Prerequisite steps after cloning source code 
1. Install all the required packages in "package.json" file.

2. Create a .env file with the variable of API_ID=<YOUR_MONGO_APP_ID> in the root folder. 


## Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


