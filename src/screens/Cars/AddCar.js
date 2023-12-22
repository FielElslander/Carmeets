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
                //patch add car particpant
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
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={horsepowerInputRef}
                            style={styles.inputText}
                            placeholder='horsepower'
                            value={HorsepowerText}
                            onChangeText={onChangeHorsepowerText}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={torqueInputRef}
                            style={styles.inputText}
                            placeholder='torque'
                            value={torqueText}
                            onChangeText={onChangeTorqueText}
                            keyboardType='numeric'
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