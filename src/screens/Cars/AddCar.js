import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements'
import { useTheme } from '../../constants/theme.style'
import { useUser } from '../../constants/user';

const AddCar = ({navigation}) => {

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
    const [YearText, setYearText] = useState("");
    const [HorsepowerText, setHorsepowerText] = useState("");
    const [torqueText, setTorqueText] = useState("");

    const onCreateClick = async () => {
        console.log('onCreateClicked.called');
        setErrorText("");
        const car = {
            brand: BrandText,
            model: ModelText,
            productionYear: parseInt(YearText),
            horsepower: parseInt(HorsepowerText),
            torque: parseInt(torqueText),
            ownerId: user.id
        }

        console.log(car);
        console.log(BrandText);
        console.log(ModelText);
        console.log(YearText);
        console.log(HorsepowerText);
        console.log(torqueText);

        if(BrandText != "" && ModelText != "" && YearText != 0 && HorsepowerText != 0 && torqueText != 0){
            console.log("Passed first");
            if(!isNaN(YearText) && !isNaN(HorsepowerText) && !isNaN(torqueText)){
                console.log("Passed second");
                try {
                    console.log("json string: " + JSON.stringify(car))
                    const response = await fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/participants/AddCar/' + user.id, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(car),
                    });
            
                    if (response.ok) {
                      navigation.navigate('cars');
                    } else {
                      var responseData = await response.json();
                      setErrorText(responseData.message);
                    }
                  } catch (error) {
                    console.error('Error during car creation:', error);
                    setErrorText('Failed to create car');
                  }
            }
            else {
                setErrorText("Year, HP or torque must be numbers!");
            }
        } else {
            console.log("error");
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
                            ref={brandInputRef}
                            style={styles.inputText}
                            placeholder='Brand'
                            value={BrandText}
                            onChangeText={onChangeBrandText}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={modelInputRef}
                            style={styles.inputText}
                            placeholder='Model'
                            value={ModelText}
                            onChangeText={onChangeModelText}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={yearInputRef}
                            style={styles.inputText}
                            placeholder='Year'
                            value={YearText}
                            onChangeText={onChangeYearText}
                            type='number'
                            inputMode='numeric'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={horsepowerInputRef}
                            style={styles.inputText}
                            placeholder='horsepower'
                            value={HorsepowerText}
                            onChangeText={onChangeHorsepowerText}
                            inputMode='numeric'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={torqueInputRef}
                            style={styles.inputText}
                            placeholder='torque'
                            value={torqueText}
                            onChangeText={onChangeTorqueText}
                            inputMode='numeric'
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonstyle}
                            onPress={onCreateClick}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Create car</Text>  
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
            backgroundColor: theme.BG_INPUTVIEWS_COLOR
        },
        innerContainer: {
            backgroundColor: theme.LIST_BG_COLOR,
            marginTop: '5%',
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
            height: '100%'
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
            color: theme.TEXT_COLOR,
        }
      });
    
      return styles;
}

export default AddCar;