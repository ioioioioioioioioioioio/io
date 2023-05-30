import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import AddAccountScreen from './screens/AddAccountScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import EditScreen from './screens/EditScreen';
import EntryListScreen from './screens/EntryListScreen';
import FeaturesScreen, { Feature } from './screens/FeaturesScreen';
import InfoScreen from './screens/InfoScreen';
import PetScreen from './screens/PetScreen';
import EditCyclicScreen from './screens/EditCyclicScreen';

export type RootStackParamList = {
  FeaturesScreen: { features: Feature[] };
  PetScreen: undefined;
  InfoScreen: undefined;
  AddEntryScreen: undefined;
  AddAccountScreen: undefined;
  EditScreen: { id: number };
  EntryListScreen: undefined;
  EditCyclicScreen: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const featureList: Feature[] = [
  { title: 'Pet Screen', screenName: 'PetScreen', props: {} },
  { title: 'Info Screen', screenName: 'InfoScreen', props: {} },
  { title: 'Add Entry', screenName: 'AddEntryScreen', props: {} },
  { title: 'Add Account', screenName: 'AddAccountScreen', props: {} },
  { title: 'Entry List', screenName: 'EntryListScreen', props: {} },
  { title: 'Edit Entry', screenName: 'EditScreen', props: { id: 3 } },
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
          <Stack.Screen name="EntryListScreen" component={EntryListScreen} />
          <Stack.Screen name="AddEntryScreen" component={AddEntryScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="EditCyclicScreen" component={EditCyclicScreen} />
          <Stack.Screen name="AddAccountScreen" component={AddAccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
