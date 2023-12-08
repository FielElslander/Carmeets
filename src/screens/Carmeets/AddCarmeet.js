import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { ListItem } from 'react-native-elements';

const AddCarmeet = ({route, navigation}) => {

    //error message
    const [errorText, setErrorText] = useState("");

    //theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

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

    onChangeDateText = (text) => {
            setDate(text);
    }
    onChangeNameText = (text) => {
        setName(text);
    }
    onChangeLocationText = (text) => {
        setLocation(text);
    }
    onChangePriceText = (text) => {
        setPrice(text);
    }
    onChangeParkingspotsText = (text) => {
        setParkingspots(text);
    }
    onChangeStartTimeText = (text) => {
        setStartTime(text);
    }
    onChangeEndTimeText = (text) => {
        setEndTime(text);
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder='Date'
                value={dateText}
                onChangeText={onChangeDateText}
            />
            <TextInput
                style={styles.text}
                placeholder='Name'
                value={nameText}
                onChangeText={onChangeNameText}
            />
            <TextInput
                style={styles.text}
                placeholder='Location'
                value={locationText}
                onChangeText={onChangeLocationText}
            />
            <TextInput
                style={styles.text}
                placeholder='Price'
                value={priceText}
                onChangeText={onChangePriceText}
            />
            <TextInput
                style={styles.text}
                placeholder='Parkingspots'
                value={parkingspotsText}
                onChangeText={onChangeParkingspotsText}
            />
            <TextInput
                style={styles.text}
                placeholder='Starttime'
                value={startTimeText}
                onChangeText={onChangeStartTimeText}
            />
            <TextInput
                style={styles.text}
                placeholder='Endtime'
                value={endTimeText}
                onChangeText={onChangeEndTimeText}
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