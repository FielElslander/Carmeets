import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { useTheme } from '../../constants/theme.style'
import { ListItem } from 'react-native-elements';

const AddCar = ({route, navigation}) => {

    //error message
    const [errorText, setErrorText] = useState("");

    //theme
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //refs
    const brandInputRef = useRef("");
    const modelInputRef = useRef("");
    const yearInputRef = useRef("");
    const horsepowerInputRef = useRef("");
    const torqueInputRef = useRef("");

    //cargroup variables
    const [BrandText, setBrandText]  = useState("");
    const [ModelText, setModelText] = useState("");
    const [YearText, setYearText] = useState(0);
    const [HorsepowerText, setHorsepowerText] = useState(0);
    const [torqueText, setTorqueText] = useState(0);

    const onCreateClick = () => {
        console.log('onCreateClicked.called');

        //owner opvragen -> user die geregistered is
        //make new car with api
    }

    onChangeBrandText = (text) => {
        setBrandText(text);
    }
    onChangeModelText = (text) => {
        setModelText(text);
    }
    onChangeYearText = (text) => {
        setYearText(text);
    }
    onChangeHorsepowerText = (text) => {
        setHorsepowerText(text);
    }
    onChangeTorqueText = (text) => {
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
                value={locationText}
                onChangeText={onChangeLocationText}
            />
            <TextInput
                ref={yearInputRef}
                style={styles.text}
                placeholder='Year'
                value={locationText}
                onChangeText={onChangeLocationText}
            />
            <TextInput
                ref={horsepowerInputRef}
                style={styles.text}
                placeholder='horsepower'
                value={HorsepowerText}
                onChangeText={onChangeHorsepowerText}
            />
            <TextInput
                ref={torqueInputRef}
                style={styles.text}
                placeholder='torque'
                value={torqueText}
                onChangeText={onChangeTorqueText}
            />
            <Button
                style={styles.buttonstyle}
                title="Create Car"
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

export default AddCar;