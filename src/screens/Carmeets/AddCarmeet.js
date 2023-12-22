import React, {useState, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { Icon } from 'react-native-elements';

const AddCarmeet = ({navigation}) => {

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

    const onNavigateBack = () => {
        navigation.goBack();
    }


    return (
        <SafeAreaView style={styles.containerParent}>
            <SafeAreaView style={styles.innerContainer}>
                <View style={styles.icon}>
                    <Icon name="arrow-back" type='material' color='black' size={30} onPress={() => onNavigateBack()} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            ref={dateInputRef}
                            placeholder='YYYY-MM-DD'
                            value={dateText}
                            onChangeText={text => onChangeDateText(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={nameInputRef}
                            style={styles.inputText}
                            placeholder='Carmeet name'
                            value={nameText}
                            onChangeText={text => onChangeNameText(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={locationInputRef}
                            style={styles.inputText}
                            placeholder='Location'
                            value={locationText}
                            onChangeText={text => onChangeLocationText(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={priceInputRef}
                            style={styles.inputText}
                            placeholder='ex. 12 EUR'
                            value={priceText}
                            onChangeText={text => onChangePriceText(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={parkingspotsInputRef}
                            style={styles.inputText}
                            placeholder='parkingspots'
                            value={parkingspotsText}
                            onChangeText={text => onChangeParkingspotsText(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={starttimeInputRef}
                            style={styles.inputText}
                            placeholder='Starttime - hh:mm'
                            value={startTimeText}
                            onChangeText={text => onChangeStartTimeText(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={endtimeInputRef}
                            style={styles.inputText}
                            placeholder='Endtime - hh:mm'
                            value={endTimeText}
                            onChangeText={text => onChangeEndTimeText(text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonstyle}
                            onPress={onCreateClick}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Create carmeet</Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                    style={styles.errorText}
                    >{errorText}</Text>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        containerParent: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.BG_INPUTVIEWS_COLOR,
        },
        innerContainer: {
            backgroundColor: theme.LIST_BG_COLOR,
            margin: '5%',
            padding: '5%',
            width: '80%',
            height: '80%',
            alignSelf: 'center',
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
        buttonstyle: {
            margin: 'auto',
            width: '50%',
            backgroundColor: theme.BUTTON_COLOR,
            borderRadius: 20,
            padding: '5%',
            alignSelf: 'center',
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
            height: '5%',
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
}

export default AddCarmeet;