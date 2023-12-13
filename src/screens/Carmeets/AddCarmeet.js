import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TextInput, Button } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { ListItem } from 'react-native-elements';

const AddCarmeet = ({route, navigation}) => {

    //error message
    const [errorText, setErrorText] = useState("");

    //theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //refs
    const dateInputRef = useRef("");
    const nameInputRef = useRef("");
    const locationInputRef = useRef("");
    const priceInputRef = useRef("");
    const parkingspotsInputRef = useRef("");
    const starttimeInputRef = useRef("");
    const endtimeInputRef = useRef("");

    //carmeet variables
    const [dateText, setDate] = useState("");    
    const [nameText, setName] = useState("");    
    const [locationText, setLocation] = useState("");    
    const [priceText, setPrice] = useState("");
    const [parkingspotsText, setParkingspots] = useState();
    const [startTimeText, setStartTime] = useState("");
    const [endTimeText, setEndTime] = useState("");

    const onCreateClick = () => {
        console.log('onMeetClick.called');
        //checken of carmeet al bestaat met die naam
        //met api toevoegen na controle

        //inputfields validation
        if (dateText != "" && nameText != "" && locationText != "" && priceText != "" && parkingspotsText != 0 && startTimeText != "" && endTimeText != ""){
            //post met nieuwe cargroup
            navigation.navigate("meetlist");
        } else{
            setErrorText("Fill in all required fields!");
        }
    }

    const onChangeDateText = (text) => {
        setDate(text);
    }
    const onChangeNameText = (text) => {
        setName(text);
    }
    const onChangeLocationText = (text) => {
        setLocation(text);
    }
    const onChangePriceText = (text) => {
        setPrice(text);
    }
    const onChangeParkingspotsText = (text) => {
        setParkingspots(text);
    }
    const onChangeStartTimeText = (text) => {
        setStartTime(text);
    }
    const onChangeEndTimeText = (text) => {
        setEndTime(text);
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                ref={dateInputRef}
                placeholder='YYYY-MM-DD'
                value={dateText}
                onChangeText={text => onChangeDateText(text)}
            />
            <TextInput
                ref={nameInputRef}
                style={styles.text}
                placeholder='Carmeet name'
                value={nameText}
                onChangeText={text => onChangeNameText(text)}
            />
            <TextInput
                ref={locationInputRef}
                style={styles.text}
                placeholder='Location'
                value={locationText}
                onChangeText={text => onChangeLocationText(text)}
            />

            <TextInput
                ref={priceInputRef}
                style={styles.text}
                placeholder='ex. 12 EUR'
                value={priceText}
                onChangeText={text => onChangePriceText(text)}
            />
            <TextInput
                ref={parkingspotsInputRef}
                style={styles.text}
                placeholder='Amount of parkingspots'
                value={parkingspotsText}
                onChangeText={text => onChangeParkingspotsText(text)}
            />
            <TextInput
                ref={starttimeInputRef}
                style={styles.text}
                placeholder='hh:mm'
                value={startTimeText}
                onChangeText={text => onChangeStartTimeText(text)}
            />
            <TextInput
                ref={endtimeInputRef}
                style={styles.text}
                placeholder='hh:mm'
                value={endTimeText}
                onChangeText={text => onChangeEndTimeText(text)}
            />
            <Button
                style={styles.buttonstyle}
                title="Create Carmeet"
                onPress={onCreateClick}
                buttonstyle={styles.buttonstyle}/>
            <Text
                style={styles.errorText}
            >{errorText}</Text>
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
        },
        errorText: {
            color: 'red'
        }
      });
    
      return styles;
}

export default AddCarmeet;