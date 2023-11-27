import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FeedNavigator } from './src/config/AppNavigation';
import { RootNavigator } from './src/config/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <FeedNavigator></FeedNavigator>
      <StatusBar/>
    </NavigationContainer>
  );
}