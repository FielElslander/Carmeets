import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../constants/theme.style';
import { Icon } from 'react-native-elements';


const AddCargroup = ({navigation}) => {

    //errormessage
    const [errorText, setErrorText] = useState('');

    //theme
    const { theme } = useTheme();
    const styles = getStyles(theme);

    //inputfields
    const nameInputRef = useRef("");
    const locationInputRef = useRef("");

    const [nameText, setNameText]  = useState("");
    const [locationText, setLocationText] = useState("");


    const onCreateClick = async () => {
        const carGroup = {
            name: nameText,
            location: locationText,
        }
        //inputfields validation
        if (nameText != "" && locationText != ""){
            try {
                const response = await fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cargroups', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(carGroup),
                });
        
                if (response.ok) {
                  navigation.navigate('Cargroups');
                } else {
                  const responseData = await response.json();
                  setErrorText(responseData.message);
                }
              } catch (error) {
                console.error('Error during car group creation:', error);
                setErrorText('Failed to create car group');
              }
        }else{
            setErrorText("Fill in all required fields!");
        }
    };

    const onChangeNameText = (text) => {
        setNameText(text)
    }

    const onChangeLocation = (text) => {
        setLocationText(text)
    }

    const onNavigateBack = () => {
        navigation.goBack();
    }

    // Dezelfde ding voor location

    return (
        <SafeAreaView style={styles.containerParent}>
            <SafeAreaView style={styles.innerContainer}>
            <View style={styles.icon}>
                <Icon name="arrow-back" type='material' color='black' size={30} onPress={() => onNavigateBack()} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={nameInputRef}
                        value={nameText}                       
                        style={styles.inputText}
                        placeholder='Name'
                        onChangeText={text => onChangeNameText(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={locationInputRef}
                        value={locationText}
                        style={styles.inputText}
                        placeholder='Location'
                        onChangeText={text => onChangeLocation(text)}                        
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={onCreateClick}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Create Cargroup</Text>
                    </TouchableOpacity>
                </View>               
                <Text style={styles.errorText}>{errorText}</Text>
            </View>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        containerParent: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.BG_INPUTVIEWS_COLOR,
        },
        innerContainer: {
            backgroundColor: theme.LIST_BG_COLOR, // Background color for the inner container
            margin: 16,
            padding: 16,
            width: '80%', // Adjust the percentage based on your preference
            height: '50%',
            alignSelf: 'center', // Center the inner container horizontally
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 10,
                height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 5,
        },
        infoContainer: {
            width: '100%',
            height: '100%',
        },      
        icon: {
            alignSelf: 'flex-start',
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
        },
        errorText: {
            color: 'red',
            paddingTop: '25px',
            textAlign: 'center',
        },
        inputContainer: {
            backgroundColor: theme.PRIMARY_COLOR,
            borderRadius: 10,
            marginBottom: 16,
            width: '60%',
            height: '10%',
            alignSelf: 'center',
        },
        inputText: {
            flex:1,
            height: 40,
            borderRadius: 10,
            paddingHorizontal: '5%',
            color: theme.TEXT_COLOR
        }
    });

    return styles;
};

export default AddCargroup;
