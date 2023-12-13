import React from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { useUser } from '../../constants/user';

const Profile = ({navigation}) => {

    //dark - light theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //user
    const { user, logout } = useUser();

    const handleSettingsPress = () => {
        console.log('handleSettingsPressed');
        navigation.navigate("Settings");
    }

    const handleLoginPress = () => {
        console.log('handleLoginPressed');
        navigation.navigate("Login");
    }

    const handleRegisterPress = () => {
        console.log('handleRegisterPressed');
        navigation.navigate("Register");
    }

    const handleLogoutPress = () => {
        console.log('handleLogoutPressed');
        logout();
    }

    if(user == null){
        return (

            <View>
                <Text>This is my profile</Text>
                <Button
                    title="Login"
                    onPress={handleLoginPress}
                    buttonstyle={styles.buttonstyle}/>
                <Button
                    title="Register"
                    onPress={handleRegisterPress}
                    buttonstyle={styles.buttonstyle}/>
                <Button 
                    title="Settings"
                    onPress={handleSettingsPress}
                    buttonstyle={styles.buttonstyle}
                />
            </View>
        )
    }
    else{
        return (

            <View>
                <Text>This is my profile</Text>
                <Button 
                    title="Settings"
                    onPress={handleSettingsPress}
                    buttonstyle={styles.buttonstyle}
                />
                <Button
                    title="Logout"
                    onPress={handleLogoutPress}
                    buttonstyle={styles.buttonstyle}
                />
            </View>
        )
    }  
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
        },
        buttonstyle: {
            margin: 'auto',
            backgroundColor: theme.HIGHLIGHT_COLOR
        }
    });
    
      return styles;
}
export default Profile;