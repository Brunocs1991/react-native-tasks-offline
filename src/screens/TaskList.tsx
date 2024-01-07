import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import commonStyles from '../core/styles/globalStyles.ts';
import Task from '../components/Task.tsx';
import {TypeTask} from '../core/types/TypeTask.ts';
import {getDateFormated} from '../core/utils/commonFunctions.ts';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask.tsx';

const todayImage =
  require('../../assets/imgs/today.jpg') as ImageSourcePropType;

interface TaskListProps {
  onCancel: () => void;
  isVisible: boolean;
}

interface TaskListState {
  tasks: TypeTask[];
  showDoneTasks: boolean;
  showAddTask: boolean;
  visibleTasks: TypeTask[];
}

export default class TaskList extends Component<TaskListProps, TaskListState> {
  state = {
    showDoneTasks: true,
    showAddTask: true,
    visibleTasks: [],
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
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask: false})}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.tootleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{getDateFormated()}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={(item: TypeTask) => `${item.id}`}
            renderItem={({item}) => (
              <Task {...item} toogleTask={this.toogleTask} />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }

  tootleFilter = () => {
    this.setState(prevState => {
      return {showDoneTasks: !prevState.showDoneTasks};
    }, this.filterTasks);
  };

  componentDidMount = () => {
    this.filterTasks();
  };

  isPending = (task: TypeTask) => {
    return task.doneAt === undefined;
  };
  filterTasks = () => {
    let visibleTasks: TypeTask[];
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      visibleTasks = this.state.tasks.filter(this.isPending);
    }
    this.setState({visibleTasks});
  };

  toogleTask = (taskId: number) => {
    this.setState(prevState => {
      const updatedTasks = prevState.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            doneAt: task.doneAt ? undefined : new Date(),
          };
        }
        return task;
      });
      return {tasks: updatedTasks};
    }, this.filterTasks);
  };
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
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
});
