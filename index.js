/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import TaskList from './src/screens/TaskList';
import 'moment/locale/pt-br';

AppRegistry.registerComponent(appName, () => TaskList);
