import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import FetchExample from './screens/HomeScreen';
import {Provider} from 'react-redux';
import store from './state/TransactionStore';
import DetailScreen from './screens/DetailScreen';

// Enable react-native-screens for improved performance
enableScreens();

// Define screen types for navigation
export type RootStackParamList = {
  Home: undefined;
  Detail: {itemId: string}; // Example parameter for Detail
};

const Stack = createStackNavigator<RootStackParamList>();

// App Component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true, // Optionally customize header visibility
          }}>
          <Stack.Screen name="Home" component={FetchExample} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
