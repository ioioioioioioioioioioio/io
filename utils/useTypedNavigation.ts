import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../App';

type UseNavigationType = StackNavigationProp<RootStackParamList>;

export default function useTypedNavigation() {
  return useNavigation<UseNavigationType>();
}
