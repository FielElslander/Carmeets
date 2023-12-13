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
            <Text style={styles.errorText}>{errorText}</Text>
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
        errorText: {
            color: 'red'
        }
    });

    return styles;
};

export default AddCargroup;
