import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeaturesScreen, { Feature } from './screens/FeaturesScreen';
import PetScreen from './screens/PetScreen';

export type RootStackParamList = {
  FeaturesScreen: { features: Feature[] };
  PetScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const featureList: Feature[] = [
  { title: 'Pet Screen', screenName: 'PetScreen' },
  { title: 'Pet Screen', screenName: 'PetScreen' },
  { title: 'Pet Screen', screenName: 'PetScreen' },
  { title: 'Pet Screen', screenName: 'PetScreen' },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FeaturesScreen"
          component={FeaturesScreen}
          initialParams={{ features: featureList }}
        />
        <Stack.Screen name="PetScreen" component={PetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
