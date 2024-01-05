import React, {Component} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import commonStyles from '../commonStyles.ts';
import Task from '../components/Task.tsx';
import {getDateFormated} from '../common/commonMethods.ts';

const todayImage =
  require('../../assets/imgs/today.jpg') as ImageSourcePropType;

export default class TaskList extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{getDateFormated()}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <Task
            desc={'Comprar Livro'}
            estimateAt={new Date()}
            doneAt={new Date()}
          />
          <Task
            desc={'Ler Livro'}
            estimateAt={new Date('2023-02-01T18:24:00.000-03:00')}
          />
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
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
});
