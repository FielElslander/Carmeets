import React from 'react';
import { StyleSheet, View, Image, Button, Text, ImageBackground } from 'react-native';

const Home = ({navigation}) => {
    const onNavigate = () => {
        console.log('Navigate To List');
        navigation.navigate('Meetlist');
    }


    return (
        <ImageBackground source={require('../../../assets/BackgroundCarMeetHomePage.jpg')} style={StyleSheet.background}>
        <View style={styles.container}>
            <Text style={styles.text}>CarsxCoffee</Text>
            <Button onPress={() => onNavigate()} title="let's meet!"></Button>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
     },
});

export default Home;