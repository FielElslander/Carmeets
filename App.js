import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  Navigator  from './src/config/AppNavigation';
import { ThemeProvider } from './src/constants/theme.style';
import { UserProvider } from './src/constants/user';
export default function App() {
  return (
    <ThemeProvider>        
      <UserProvider>
          <NavigationContainer>
            <Navigator></Navigator>
          </NavigationContainer>          
      </UserProvider>
    </ThemeProvider>
  );
}