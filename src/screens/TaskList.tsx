import React, {Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import todayImagem from '../../assets/imgs/today.jpg';

export default class TaskList extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={todayImagem} style={styles.background} />
        <View style={styles.taskContainer}>
          <Text>TaskList</Text>
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
