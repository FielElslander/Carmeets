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


    const onCreateClick = () => {
        //met api toevoegen na controle
        //checken of groep met bepaalde naam al bestaat via api


        //inputfields validation
        if (nameText != "" && locationText != ""){
            //post met nieuwe cargroup
            navigation.navigate('Cargroups');
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
                            <Text style={{color: 'white'}}>Create Cargroup</Text>
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
            backgroundColor: theme.HIGHLIGHT_COLOR,
        },
        innerContainer: {
            backgroundColor: theme.LIST_BG_COLOR, // Background color for the inner container
            margin: 16,
            padding: 16,
            width: '80%', // Adjust the percentage based on your preference
            height: '50%',
            alignSelf: 'center', // Center the inner container horizontally
            borderRadius: 10,
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
