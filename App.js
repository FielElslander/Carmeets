import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  RootNavigator  from './src/config/AppNavigation';
import { ThemeProvider } from './src/constants/theme.style';
import { userProvider } from './src/constants/user';
export default function App() {
  return (
    <userProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator></RootNavigator>
        </NavigationContainer>
      </ThemeProvider>
    </userProvider>
  );
}