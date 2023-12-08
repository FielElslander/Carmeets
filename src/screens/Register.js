import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { userContext } from '../constants/user';

const Register = () => {

    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);
    const { registerUser } = useContext(userContext);

    //login states
    const [usernameText, setusernameText] = useState("")
    const [phonenumberText, setphonenumberText] = useState("")
    const [passwordText, setpasswordText] = useState("")
    
    //error message
    const [errorText, setErrorText] = useState("")

    const onChangeUserName = (text) => {
        setusernameText(text);
    }

    const onChangePhonenumber = (text) => {
        setphonenumberText(text);
    }

    const onChangePassword = (text) => {
        setpasswordText(text);
    }

    const handleRegisterPress = () => {
        console.log("Registerbuttonpressed");
        //api call doen via email
        //als hij iets returned -> errormessage -> "user already exist"
        //als hij niet returned -> nieuwe user aanmaken
        //registerUser(newuser)
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
                placeholder='Phonenumber'
                value={phonenumberText}
                onChangeText={onChangePhonenumber}
            />
                <TextInput
                style={styles.text}
                placeholder='Password'
                value={passwordText}
                onChangeText={onChangePassword}
            />
            <Button
                style={styles.buttonstyle}
                title="Register"
                onPress={handleRegisterPress}
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
export default Register;