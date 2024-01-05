import React, {Component} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const todayImage =
  require('../../assets/imgs/today.jpg') as ImageSourcePropType;
export default class TaskList extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background} />
        <View style={styles.taskContainer}>
          <Text>Taks Offline</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskContainer: {
    flex: 7,
  },
});
