import { AppRegistry } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import onboarding from './onboarding'
//import SignIn from './screens/SignIn';  // SignIn Screen
 

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen 
          name="Onboarding" 
          component={onboarding} 
          options={{ headerShown: false }}  // Optional to hide header for Onboarding
        />
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

 