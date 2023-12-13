import React from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import { useTheme } from '../constants/theme.style'

const Settings = () => {

    //dark - light theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>
            <Button onPress={toggleTheme} title="Toggle Theme"/>   
        </View>
    )
}

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          paddingTop: 30,
          backgroundColor: theme.PRIMARY_COLOR
        },
        text: {
            color: theme.TEXT_COLOR
        }
      });
    
      return styles;
}
export default Settings;