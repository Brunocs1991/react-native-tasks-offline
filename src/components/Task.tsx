import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {TypeTask} from '../core/types/TypeTask.ts';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../core/styles/globalStyles.ts';
import {getDateFormated} from '../core/utils/commonFunctions.ts';

interface TaskProps extends TypeTask {
  toogleTask: (taskId: number) => void; // Substitua `number` pelo tipo real do ID
}
export default (props: TaskProps) => {
  const doneOrNotStyle = props.doneAt !== undefined ? styles.textCheckd : {};
  const date = getDateFormated(props.doneAt ? props.doneAt : props.estimateAt);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.toogleTask(props.id)}>
        <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

function getCheckView(doneAt: Date | undefined) {
  if (doneAt !== undefined) {
    return (
      <View style={styles.done}>
        <Icon name={'check'} size={20} color={'#FFF'} />
      </View>
    );
  } else {
    return <View style={styles.pendding} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCheckd: {
    textDecorationLine: 'line-through',
  },
  pendding: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4d7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
});
