import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TextInput, Button } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { ListItem } from 'react-native-elements';

const AddCargroup = ({route, navigation}) => {

    //error message
    const [errorText, setErrorText] = useState("");

    //theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //cargroup variables
    const [nameText, setNameText]  = useState("");
    const [locationText, setLocationText] = useState("");

    const onCreateClick = () => {
        console.log('onCreateClicked.called');
        //make new cargroup with api
    }

    const onChangeNameText = (text) => {
        setNameText(text);
    }
    const onChangeLocationText = (text) => {
        setLocationText(text);
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder='Name'
                value={nameText}
                onChangeText={onChangeNameText(nameText)}
            />
            <TextInput
                style={styles.text}
                placeholder='Location'
                value={locationText}
                onChangeText={onChangeLocationText(locationText)}
            />
            <Button
                style={styles.buttonstyle}
                title="Create Cargroup"
                onPress={onCreateClick}
                buttonstyle={styles.buttonstyle}/>
            <Text
                style={styles.text}
                value={errorText}
            />
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
        },
        buttonstyle: {
            margin: 'auto',
            backgroundColor: theme.HIGHLIGHT_COLOR
        }
      });
    
      return styles;
}

export default AddCargroup;