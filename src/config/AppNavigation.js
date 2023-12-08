import React from 'react';
import { StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'

//-----------------------------------------------------------
import Meetlist from '../screens/Carmeets/MeetList'
import Profile from '../screens/Participant/Profile'
import MeetDetail from '../screens/Carmeets/MeetDetail';
import CarGroupDetails from '../screens/Cargroups/CarGroupDetails';
import CarGroupList from '../screens/Cargroups/CarGroupList';
import CarList from '../screens/Cars/CarList';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Register from '../screens/Register';
//-----------------------------------------------------------

// theme
import { useTheme } from '../constants/theme.style'

// tab navigation (main navigation)
const Tab = createBottomTabNavigator();
export default function Navigator(){
    const {theme } = useTheme();
    const styles = getStyles(theme);
    return(
        <Tab.Navigator screenOptions={{tabBarStyle: styles.container, tabBarActiveTintColor: theme.HIGHLIGHT_COLOR}} initialRouteName='Meetlist'>
            <Tab.Screen name="Meetlist" component={DetailNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Carmeets',
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'list'
                    color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="CarGroups" component={CarGroupDetailsNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Cargroups',
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons
                    name= 'groups'
                    color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="Cars" component={CarList} options={{
                headerShown: false,
                tabBarLabel: 'Cars',
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'car'
                    color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="Profile" component={RootNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'person'
                    color={color} size={size}/>
                )
            }}/>
        </Tab.Navigator>
    )
}

// CarmeetList --> Details
const DetailStack = createNativeStackNavigator();
export const DetailNavigator = () => {
    return (
        <DetailStack.Navigator>
            <DetailStack.Screen name="Meetlist" component={Meetlist}/>
            <DetailStack.Screen name="MeetDetail" component={MeetDetail} options={({ route }) => ({ title: route.params.carMeet.Name})}/>
        </DetailStack.Navigator>
    )
}

// Cargroupslist --> Details
const CarGroupDetailsStack = createNativeStackNavigator();
export const CarGroupDetailsNavigator = () => {
    return (
        <CarGroupDetailsStack.Navigator>
            <CarGroupDetailsStack.Screen name="Cargroups" component={CarGroupList}/>
            <CarGroupDetailsStack.Screen name="CarGroupDetail" component={CarGroupDetails}/>
        </CarGroupDetailsStack.Navigator>
    )
}

// Profile --> Button for settings
const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
    return (
        <Navigator></Navigator>,
        <RootStack.Navigator>
            <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen name="Profile" component={Profile}/>
                <RootStack.Screen name="Settings" component={Settings}/>
                <RootStack.Screen name="Login" component={Login}/>
                <RootStack.Screen name="Register" component={Register}/>
            </RootStack.Group>
        </RootStack.Navigator>
    );
}

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.PRIMARY_COLOR
        }
    });

    return styles
}