import React, {Component} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import globalStyles from '../core/styles/globalStyles.ts';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {getDateFormated} from '../core/utils/commonFunctions.ts';
import {TypeSaveTask} from '../core/types/TypeSaveTask.ts';

interface AddTaskProps {
  onCancel: () => void;
  onSave: (newTask: TypeSaveTask) => void;
  isVisible: boolean;
}

interface AddTaskState {
  desc: string;
  date: Date;
  showDatePicker: boolean;
}

const initialState: AddTaskState = {
  desc: '',
  date: new Date(),
  showDatePicker: false,
};

export default class AddTask extends Component<AddTaskProps, AddTaskState> {
  state = {
    ...initialState,
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType={'slide'}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder={'Informe a Descrição...'}
            onChangeText={desc => this.setState({desc})}
            value={this.state.desc}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  save = () => {
    const newTask: TypeSaveTask = {
      desc: this.state.desc,
      date: this.state.date,
    };
    this.props.onSave?.(newTask);
    this.setState({...initialState});
  };
  getDatePicker = () => {
    let datePicker = (
      <RNDateTimePicker
        value={this.state.date}
        onChange={(_, date) =>
          this.setState({date: date!, showDatePicker: false})
        }
        mode={'date'}
      />
    );
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>
              {getDateFormated(this.state.date, 'dddd, D [de] MMMM [de] YYYY')}
            </Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: globalStyles.fontFamily,
    backgroundColor: globalStyles.colors.today,
    color: globalStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: globalStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: globalStyles.colors.today,
  },
  date: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
