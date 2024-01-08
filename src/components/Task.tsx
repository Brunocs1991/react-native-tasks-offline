import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TypeTask} from '../core/types/TypeTask.ts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDateFormated} from '../core/utils/commonFunctions.ts';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import globalStyles from '../core/styles/globalStyles.ts';

interface TaskProps extends TypeTask {
  onToogleTask: (taskId: number) => void;
  onDelete: (id: number) => void;
}

export default (props: TaskProps) => {
  const doneOrNotStyle = props.doneAt !== undefined ? styles.textCheckd : {};
  const date = getDateFormated(props.doneAt ? props.doneAt : props.estimateAt);
  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon
          name={'trash'}
          size={20}
          color={'#FFF'}
          style={styles.excludeIcon}
        />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };
  const getRightContent = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.onDelete?.(props.id)}>
        <Icon name={'trash'} size={30} color={'#fff'} />
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}
        onSwipeableOpen={direction =>
          direction === 'left' && props.onDelete?.(props.id)
        }>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => props.onToogleTask(props.id)}>
            <View style={styles.checkContainer}>
              {getCheckView(props.doneAt)}
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
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
    backgroundColor: 'rgb(255,255,255)',
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
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'rgb(255,0,0)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'rgb(255,0,0)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeText: {
    fontFamily: globalStyles.fontFamily,
    color: 'rgb(255,255,255)',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
