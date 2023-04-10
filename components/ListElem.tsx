import React, { StyleSheet, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';

type ListElemProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onPress?: () => void;
};

export default function ListElem({ style, textStyle, title, onPress }: ListElemProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  container: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 10,
  },
});
