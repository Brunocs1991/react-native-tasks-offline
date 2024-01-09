import React, {Component} from 'react';
import {
  Alert,
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

import globalStyles from '../core/styles/globalStyles.ts';
import Task from '../components/Task.tsx';
import {TypeTask} from '../core/types/TypeTask.ts';
import {getDateFormated} from '../core/utils/commonFunctions.ts';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask.tsx';
import {TypeSaveTask} from '../core/types/TypeSaveTask.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};

export default class TaskList extends Component<TaskListProps, TaskListState> {
  state = {
    ...initialState,
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask: false})}
          onSave={this.addTask}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.tootleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={globalStyles.colors.secondary}
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
              <Task
                {...item}
                onToogleTask={this.toogleTask}
                onDelete={this.deleteTaks}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.setState({showAddTask: true})}>
          <Icon name={'plus'} size={20} color={globalStyles.colors.secondary} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  deleteTaks = (id: number) => {
    this.setState(prevState => {
      return {
        tasks: [...prevState.tasks.filter(task => task.id !== id)],
      };
    }, this.filterTasks);
  };

  addTask = (newTask: TypeSaveTask) => {
    if (!newTask?.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descricao não informada!');
      return;
    }
    const task: TypeTask = {
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
    };
    this.setState(prevState => {
      return {
        tasks: [...prevState.tasks, task],
        showAddTask: false,
      };
    }, this.filterTasks);
  };
  tootleFilter = () => {
    this.setState(prevState => {
      return {showDoneTasks: !prevState.showDoneTasks};
    }, this.filterTasks);
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const state = JSON.parse(stateString ?? 'null') || initialState;
    this.setState(state, this.filterTasks);
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
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state)).then();
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
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
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
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: globalStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
