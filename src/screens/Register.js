import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { useUser } from '../constants/user';

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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder='Name'
                value={usernameText}
                onChangeText={onChangeUserName}
            />
            <TextInput
                style={styles.text}
                placeholder='email'
                value={emailText}
                onChangeText={onChangeEmail}
            />
                <TextInput
                style={styles.text}
                placeholder='Password'
                secureTextEntry="true"
                value={passwordText}
                onChangeText={onChangePassword}
            />
            <Button
                style={styles.buttonstyle}
                title="Register"
                onPress={handleRegisterPress}
                buttonstyle={styles.buttonstyle}/>
            <Text
                style={styles.errortext}
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
        errortext: {
            color: "red"
        }
      });
    
      return styles;
}
export default Register;