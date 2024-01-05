import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import commonStyles from '../core/styles/globalStyles.ts';
import Task from '../components/Task.tsx';
import {TypeTask} from '../core/types/TypeTask.ts';
import {getDateFormated} from '../core/utils/commonFunctions.ts';

const todayImage =
  require('../../assets/imgs/today.jpg') as ImageSourcePropType;

export default class TaskList extends Component {
  state: {tasks: TypeTask[]} = {
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar Livro',
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Ler Livro',
        estimateAt: new Date(),
      },
    ],
  };

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
          <FlatList
            data={this.state.tasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item} />}
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
