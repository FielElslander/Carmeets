import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Button, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { useUser } from '../constants/user';
import { Icon } from 'react-native-elements';

const Login = ({navigation}) => {

    //themes
    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);

    //login states
    const [emailText, setusernameText] = useState("")
    const [passwordText, setpasswordText] = useState("")

    //user
    const {LoginOrRegister } = useUser();

    //error state
    const [errorText, setErrorText] = useState("")

    const onChangeUserName = (text) => {
        setusernameText(text);
    }

    const onChangePassword = (text) => {
        setpasswordText(text);
    }

    const handleLoginPress = () => {
        console.log("loginbuttonpressed");
        const User = {
            email: emailText,
            password: passwordText
        }
        if (emailText != "" && passwordText != "") {
            if(emailText.indexOf("@") !== -1 && emailText.indexOf(".") !== -1) {   
                //api call get by email
                //user in login/register steken
                //bij error ne error tonen
                LoginOrRegister(User);
                setErrorText("");
                navigation.navigate('Profile');
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
                            placeholder='Email'
                            value={emailText}
                            onChangeText={onChangeUserName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Password'
                            value={passwordText}
                            secureTextEntry="true"
                            onChangeText={onChangePassword}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={handleLoginPress}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>{errorText}</Text>
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
export default Login;