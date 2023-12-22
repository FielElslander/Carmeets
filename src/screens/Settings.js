import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/theme.style'

const Settings = () => {

    //dark - light theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Settings</Text>
            <TouchableOpacity onPress={toggleTheme} style={styles.buttonStyle}>
                <Text>Toggle Theme</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
            fontSize: 24,
            paddingBottom: '5%',
            color: theme.TEXT_COLOR
        },
        buttonStyle: {
            margin: 'auto',
            width: '50%',
            backgroundColor: theme.BUTTON_COLOR,
            borderRadius: 20,
            alignSelf: 'center',
            padding: '5%',
            alignItems: 'center',
            justifyContent: 'center',
        
        }
    });
    
      return styles;
}
export default Settings;