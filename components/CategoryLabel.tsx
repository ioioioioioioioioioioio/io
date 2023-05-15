import { AntDesign } from '@expo/vector-icons';
import React, { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import useTheme, { ColorTheme } from '../colors/Colors';

type ListElemProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  color?: string;
};

export default function CategoryLabel({ style, textStyle, title, color }: ListElemProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  return title !== undefined ? (
    <View style={[styles.container, style, { backgroundColor: color ?? theme.backgroundPrimary }]}>
      <AntDesign name="tag" size={12} color="black" />
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  ) : null;
}

const useStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    text: {
      fontSize: 11,
      fontWeight: 'bold',
      color: theme.backgroundPrimary,
    },

    container: {
      flexDirection: 'row',
      backgroundColor: theme.containerPrimary,
      alignItems: 'center',
      padding: 2,
      paddingHorizontal: 5,
      borderRadius: 2,
      marginHorizontal: 5,
    },
  });
