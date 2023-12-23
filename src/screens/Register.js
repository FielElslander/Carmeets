import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { useUser } from '../constants/user';
import { Icon } from 'react-native-elements';

const Register = ({navigation}) => {

    const {theme } = useTheme();
    const styles = getStyles(theme);

    //user
    const { LoginOrRegister, user } = useUser();

    //login states
    const [usernameText, setusernameText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [passwordText, setpasswordText] = useState("")
    
    //error message
    const [errorText, setErrorText] = useState("")

    const onChangeUserName = (text) => {
        setusernameText(text);
    }

    const onChangeEmail = (text) => {
        setEmailText(text);
    }

    const onChangePassword = (text) => {
        setpasswordText(text);
    }

    const handleRegisterPress = async () => {
        console.log("Registerbuttonpressed");
        //get by email -> alsj iets terug krijgt -> error user bestaat al
        //als dat nie zo is doe je post
        const gebruiker = {
            name: usernameText,
            email: emailText,
            password: passwordText
        }
        if (usernameText != "" && emailText != "" && passwordText != "") {
            if(emailText.indexOf("@") !== -1 && emailText.indexOf(".") !== -1) {   
                //api call post
                try{
                    const response = await fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/participants', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json',},
                        body: JSON.stringify(gebruiker)
                    });

                    if(response.ok) {
                        navigation.navigate('Profile');
                        LoginOrRegister(gebruiker);
                        setErrorText("");
                        console.log();
                    } else {
                        const responseData = await response.json();
                        setErrorText(responseData.message);
                    }
                } catch (err) {
                    console.error(err);
                }            
            } else{
                setErrorText("Email not valid.");
            }
        }
        else{
            setErrorText("Fill in all required fields!")
        }
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
                            placeholder='Name'
                            value={usernameText}
                            onChangeText={onChangeUserName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='email'
                            value={emailText}
                            onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Password'
                            secureTextEntry="true"
                            value={passwordText}
                            onChangeText={onChangePassword}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={handleRegisterPress}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Register</Text>
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
            margin: 16,
            padding: 16,
            width: '80%', 
            height: '50%',
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
        buttonStyle: {
            margin: 'auto',
            width: '50%',
            backgroundColor: theme.BUTTON_COLOR,
            borderRadius: 20,
            alignSelf: 'center',
            padding: '5%',
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
            height: '10%',
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
export default Register;