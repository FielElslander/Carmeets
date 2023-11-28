import React from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';

const Profile = ({navigation}) => {

    const handleSettingsPress = () => {
        console.log('handleSettingsPressed');
        navigation.navigate("Settings");
    }

    return (
        <View>
            <Text>This is my profile</Text>
            <Button 
                title="Settings"
                onPress={handleSettingsPress}
                buttonstyle={{margin: 20}}
            />
        </View>
    )
}

export default Profile;