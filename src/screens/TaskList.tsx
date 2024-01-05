import React, {Component} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

import commonStyles from '../commonStyles.ts';
import Task from '../components/Task.tsx';

const todayImage =
  require('../../assets/imgs/today.jpg') as ImageSourcePropType;

export default class TaskList extends Component {
  render() {
    function getToday() {
      moment.updateLocale('pt-br', {});
      return moment().locale('pt-br').format('ddd, D [de] MMMM');
    }

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{getToday()}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <Task
            desc={'Comprar Livro'}
            estimateAt={new Date()}
            doneAt={new Date()}
          />
          <Task desc={'Ler Livro'} estimateAt={new Date()} doneAt={undefined} />
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
