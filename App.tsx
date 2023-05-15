import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import AddEntryScreen from './screens/AddEntryScreen';
import EditScreen from './screens/EditScreen';
import FeaturesScreen, { Feature } from './screens/FeaturesScreen';
import InfoScreen from './screens/InfoScreen';
import PetScreen from './screens/PetScreen';

export type RootStackParamList = {
  FeaturesScreen: { features: Feature[] };
  PetScreen: undefined;
  InfoScreen: undefined;
  AddEntryScreen: undefined;
  EditScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const featureList: Feature[] = [
  { title: 'Pet Screen', screenName: 'PetScreen' },
  { title: 'Info Screen', screenName: 'InfoScreen' },
  { title: 'Add Entry', screenName: 'AddEntryScreen' },
  { title: 'Edit Entry', screenName: 'EditScreen' },
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
          <Stack.Screen name="AddEntryScreen" component={AddEntryScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
