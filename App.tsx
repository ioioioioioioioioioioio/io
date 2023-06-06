import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import AccountListScreen from './screens/AccountListScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import EditCyclicScreen from './screens/EditCyclicScreen';
import EditScreen from './screens/EditScreen';
import EntryListScreen from './screens/EntryListScreen';
import FeaturesScreen, { Feature } from './screens/FeaturesScreen';
import FilteredEntryListScreen from './screens/FilteredEntryListScreen';
import InfoScreen from './screens/InfoScreen';
import PetScreen from './screens/PetScreen';

export type RootStackParamList = {
  FeaturesScreen: { features: Feature[] };
  PetScreen: undefined;
  InfoScreen: undefined;
  AddEntryScreen: undefined;
  AddAccountScreen: undefined;
  EditScreen: { id: number };
  EntryListScreen: undefined;
  EditCyclicScreen: { id: number };
  FilteredEntryListScreen: undefined;
  AccountListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const featureList: Feature[] = [
  { title: 'Pet Screen', screenName: 'PetScreen', props: {} },
  { title: 'Info Screen', screenName: 'InfoScreen', props: {} },
  { title: 'Add Entry', screenName: 'AddEntryScreen', props: {} },
  { title: 'Add Account', screenName: 'AddAccountScreen', props: {} },
  { title: 'Entry List', screenName: 'EntryListScreen', props: {} },
  { title: 'Filtered Entry List', screenName: 'FilteredEntryListScreen', props: {} },
  { title: 'Edit Entry', screenName: 'EditScreen', props: { id: 3 } },
  { title: 'Account List', screenName: 'AccountListScreen', props: {} },
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
          <Stack.Screen name="FilteredEntryListScreen" component={FilteredEntryListScreen} />
          <Stack.Screen name="AddEntryScreen" component={AddEntryScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="EditCyclicScreen" component={EditCyclicScreen} />
          <Stack.Screen name="AddAccountScreen" component={AddAccountScreen} />
          <Stack.Screen name="AccountListScreen" component={AccountListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
