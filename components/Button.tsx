import { PropsWithChildren } from 'react';
import React, { Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';

type ListElemProps = PropsWithChildren<{
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}>;

export default function ListElem({ style, onPress, children }: ListElemProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
