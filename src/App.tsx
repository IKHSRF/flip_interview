import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {View, Text} from 'react-native';
import FetchExample from './screens/HomeScreen';
import {Provider} from 'react-redux';
import store from './state/TransactionStore';

// Enable react-native-screens for improved performance
enableScreens();

// Define screen types for navigation
type RootStackParamList = {
  Home: undefined;
  Detail: {itemId: string}; // Example parameter for Detail
};

const Stack = createStackNavigator<RootStackParamList>();

// Detail Screen Component
const DetailScreen: React.FC<{route: any}> = ({route}) => {
  const {itemId} = route.params; // Retrieve parameter passed to Detail
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Welcome to the Detail Screen!</Text>
      <Text>Item ID: {itemId}</Text>
    </View>
  );
};

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
