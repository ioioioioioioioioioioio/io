import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import FeaturesScreen, { Feature } from './screens/FeaturesScreen';
import InfoScreen from './screens/InfoScreen';
import PetScreen from './screens/PetScreen';

export type RootStackParamList = {
  FeaturesScreen: { features: Feature[] };
  PetScreen: undefined;
  InfoScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const featureList: Feature[] = [
  { title: 'Pet Screen', screenName: 'PetScreen' },
  { title: 'Info Screen', screenName: 'InfoScreen' },
];

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="FeaturesScreen"
            component={FeaturesScreen}
            initialParams={{ features: featureList }}
          />
          <Stack.Screen name="InfoScreen" component={InfoScreen} />
          <Stack.Screen name="PetScreen" component={PetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
