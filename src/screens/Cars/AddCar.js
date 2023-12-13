import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TextInput, Button } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { ListItem } from 'react-native-elements';
import { useUser } from '../../constants/user';

const AddCar = ({route, navigation}) => {

    //error message
    const [errorText, setErrorText] = useState("");

    //theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //user
    const { user }  = useUser();

    //refs
    const brandInputRef = useRef("");
    const modelInputRef = useRef("");
    const yearInputRef = useRef("");
    const horsepowerInputRef = useRef("");
    const torqueInputRef = useRef("");

    //cargroup variables
    const [BrandText, setBrandText]  = useState("");
    const [ModelText, setModelText] = useState("");
    const [YearText, setYearText] = useState();
    const [HorsepowerText, setHorsepowerText] = useState();
    const [torqueText, setTorqueText] = useState();

    const onCreateClick = () => {
        console.log('onCreateClicked.called');
        //get participant based on email
        //post maken van car
        //patch voor user
        setErrorText("");

        if(BrandText != "" && ModelText != "" && YearText != 0 && HorsepowerText != 0 && torqueText != 0){
            if (typeof YearText == "string"){
                setErrorText("Year must be a number.");
            }
            if (typeof HorsepowerText == "string"){
                setErrorText("Horsepower must be a number.");
            }
            if (typeof torqueText == "string"){
                setErrorText("Torque must be a number.");
            }
            if(!typeof YearText == "string" && !typeof HorsepowerText == "string" && !typeof torqueText == "string"){
                 //post van car
                //patch van participant
                console.log(navigation);
                navigation.navigate('cars');
            }
        } else {
            setErrorText("Fill in all required fields");
        }
    }

    const onChangeBrandText = (text) => {
        setBrandText(text);
    }
    const onChangeModelText = (text) => {
        setModelText(text);
    }
    const onChangeYearText = (text) => {
        setYearText(text);
    }
    const onChangeHorsepowerText = (text) => {
        setHorsepowerText(text);
    }
    const onChangeTorqueText = (text) => {
        setTorqueText(text);
    }



    return (
        <View style={styles.container}>
            <TextInput
                ref={brandInputRef}
                style={styles.text}
                placeholder='Brand'
                value={BrandText}
                onChangeText={onChangeBrandText}
            />
            <TextInput
                ref={modelInputRef}
                style={styles.text}
                placeholder='Model'
                value={ModelText}
                onChangeText={onChangeModelText}
            />
            <TextInput
                ref={yearInputRef}
                style={styles.text}
                placeholder='Year'
                value={YearText}
                onChangeText={onChangeYearText}
                type='number'
            />
            <TextInput
                ref={horsepowerInputRef}
                style={styles.text}
                placeholder='horsepower'
                value={HorsepowerText}
                onChangeText={onChangeHorsepowerText}
                keyboardType='numeric'
            />
            <TextInput
                ref={torqueInputRef}
                style={styles.text}
                placeholder='torque'
                value={torqueText}
                onChangeText={onChangeTorqueText}
                keyboardType='numeric'
            />
            <Button
                style={styles.buttonstyle}
                title="Create Car"
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

export default AddCar;