import React from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../constants/theme.style';
import { useUser } from '../../constants/user';
import profileTitlePNG from '../../../assets/ProfileTitlePNG.png';

const Profile = ({navigation}) => {

    //dark - light theme
    const { theme } = useTheme();
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

            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    <Image source={profileTitlePNG} style={styles.backgroundImage} />
                    <TouchableOpacity
                        onPress={handleLoginPress}
                        style={styles.buttonstyle}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleRegisterPress}
                        style={styles.buttonstyle}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={handleSettingsPress}
                        style={styles.buttonstyle}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Settings</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        );
    }
    else{
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    <Image source={profileTitlePNG} style={styles.backgroundImage} />
                    <TouchableOpacity 
                        onPress={handleSettingsPress}
                        style={styles.buttonstyle}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogoutPress}
                        style={styles.buttonstyle}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        );
    }  
};


const getStyles = (theme) => {
    const styles = StyleSheet.create({
        containerParent: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.PRIMARY_COLOR
        },
        container: {
            flex: 1,
            height: '50%',
            backgroundColor: theme.PRIMARY_COLOR,
            marginHorizontal: '5%'
        },
        buttonstyle: {
            width: '50%',
            marginTop: 10,
            padding: 20,
            backgroundColor: theme.HIGHLIGHT_COLOR,
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        divider: {
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginBottom: 16,
            color: theme.PRIMARY_COLOR
        },
        title: {
            fontSize: 64,
            alignSelf: 'center',
            color: theme.TEXT_COLOR,
            fontWeight: 'bold',
        }
    });
    
      return styles;
}
export default Profile;