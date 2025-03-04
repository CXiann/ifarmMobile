/**
 * @format
 */
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  /Invalid query/, // Use a regular expression to match part of the warning message
]);
AppRegistry.registerComponent(appName, () => AppWrapper);
