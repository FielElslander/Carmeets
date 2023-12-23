import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { useUser } from '../constants/user';
import { Icon } from 'react-native-elements';

const Register = ({navigation}) => {

    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //user
    const { LoginOrRegister } = useUser();

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

    const handleRegisterPress = () => {
        console.log("Registerbuttonpressed");
        //get by email -> alsj iets terug krijgt -> error user bestaat al
        //als dat nie zo is doe je post
        const User = {
            name: usernameText,
            email: emailText,
            password: passwordText
        }
        if (usernameText != "" && emailText != "" && passwordText != "") {
            if(emailText.indexOf("@") !== -1 && emailText.indexOf(".") !== -1) {   
                /*fetch('http://localhost:8080/participant/Login?email=emailText&password=passwordText)
                //post request
                    .then(res => res.json())
                    .then(data => {
                LoginOrRegister(data);*/
                LoginOrRegister(User);
                setErrorText("");
                navigation.navigate('Profile');
                //hier post doen
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