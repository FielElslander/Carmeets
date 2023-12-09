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
    const [parkingspotsText, setParkingspots] = useState(0);
    const [startTimeText, setStartTime] = useState("");
    const [endTimeText, setEndTime] = useState("");

    const onCreateClick = () => {
        console.log('onMeetClick.called');
        //make new carmeet with api
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
                placeholder='Date'
                value={dateText}
                onChangeText={text => onChangeDateText(text)}
            />
            <TextInput
                ref={nameInputRef}
                style={styles.text}
                placeholder='Name'
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
                placeholder='Price'
                value={priceText}
                onChangeText={text => onChangePriceText(text)}
            />
            <TextInput
                ref={parkingspotsInputRef}
                style={styles.text}
                placeholder='Parkingspots'
                value={parkingspotsText}
                onChangeText={text => onChangeParkingspotsText(text)}
            />
            <TextInput
                ref={starttimeInputRef}
                style={styles.text}
                placeholder='Starttime'
                value={startTimeText}
                onChangeText={text => onChangeStartTimeText(text)}
            />
            <TextInput
                ref={endtimeInputRef}
                style={styles.text}
                placeholder='Endtime'
                value={endTimeText}
                onChangeText={text => onChangeEndTimeText(text)}
            />
            <Button
                style={styles.buttonstyle}
                title="Create Carmeet"
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

export default AddCarmeet;