import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { useUser } from '../constants/user';

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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder='Email'
                value={emailText}
                onChangeText={onChangeUserName}
            />
            <TextInput
                style={styles.text}
                placeholder='Password'
                value={passwordText}
                secureTextEntry="true"
                onChangeText={onChangePassword}
            />
            <Button
                style={styles.buttonstyle}
                title="Login"
                onPress={handleLoginPress}
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
export default Login;