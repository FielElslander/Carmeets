import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput } from 'react-native';
import { useTheme } from '../constants/theme.style'
import { userContext } from '../constants/user'

const Login = () => {

    const { toggleTheme, theme } = useTheme();
    const styles = getStyles(theme);
    const { loginUser } = useContext(userContext);

    //login states
    const [emailText, setusernameText] = useState("")
    const [passwordText, setpasswordText] = useState("")

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
        //api call naar user met email
        //als hij niet bestaat -> error message
        //setErrorText("message");
        //wel bestaat
        //state aanpassen en user erin zwieren
        //loginUser(user);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder='Email'
                value={usernameText}
                onChangeText={onChangeUserName}
            />
            <TextInput
                style={styles.text}
                placeholder='Password'
                value={passwordText}
                onChangeText={onChangePassword}
            />
            <Button
                style={styles.buttonstyle}
                title="Login"
                onPress={handleLoginPress}
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
export default Login;