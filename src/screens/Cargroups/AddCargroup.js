import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useTheme } from '../../constants/theme.style';
import { ListItem } from 'react-native-elements';

const AddCargroup = ({ route, navigation }) => {
    const [errorText, setErrorText] = useState('');
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    const nameInputRef = useRef("");
    const locationInputRef = useRef("");

     const [nameText, setNameText]  = useState("");
    const [locationText, setLocationText] = useState("");


    const onCreateClick = () => {
        const name = nameInputRef.current.value;
        const location = locationInputRef.current.value;

        // Perform validation or API calls here
        // For demonstration purposes, just console log the inputs
        console.log('Name:', name);
        console.log('Location:', location);
    };

    const onChangeNameText = (text) => {
        setNameText(text)
    }

    const onChangeLocation = (text) => {
        setLocationText(text)
    }

    // Dezelfde ding voor location

    return (
        <View style={styles.container}>
            <TextInput
                ref={nameInputRef}
                value={nameText}                       
                style={styles.text}
                placeholder='Name'
                onChangeText={text => onChangeNameText(text)}
            />
            <TextInput
                ref={locationInputRef}
                value={locationText}
                style={styles.text}
                placeholder='Location'
                onChangeText={text => onChangeLocation(text)}                        
            />
            <Button
                style={styles.buttonStyle}
                title='Create Cargroup'
                onPress={onCreateClick}
                buttonStyle={styles.buttonStyle}
            />
            <Text style={styles.text}>{errorText}</Text>
        </View>
    );
};

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            paddingTop: 30,
            backgroundColor: theme.PRIMARY_COLOR,
        },
        text: {
            color: theme.TEXT_COLOR,
        },
        buttonStyle: {
            margin: 'auto',
            backgroundColor: theme.HIGHLIGHT_COLOR,
        },
    });

    return styles;
};

export default AddCargroup;
