import React from 'react';
import {Text, View} from 'react-native';
import {TaksType} from '../types/TaksType.ts';

export default (props: TaksType) => {
  return (
    <View>
      <Text>{props.desc}</Text>
      <Text>{props.estimateAt.toString()}</Text>
      <Text>{props.doneAt?.toString()}</Text>
    </View>
  );
};
