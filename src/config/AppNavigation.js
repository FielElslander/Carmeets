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
import AddCargroup from '../screens/Cargroups/AddCargroup';
import AddCar from '../screens/Cars/AddCar';
import AddCarmeet from '../screens/Carmeets/AddCarmeet';
//-----------------------------------------------------------

// theme
import { useTheme } from '../constants/theme.style'

// tab navigation (main navigation)
const Tab = createBottomTabNavigator();
export default function Navigator(){
    const {theme } = useTheme();
    const styles = getStyles(theme);
    return(
        <Tab.Navigator screenOptions={{tabBarStyle: styles.container, tabBarActiveTintColor: theme.HIGHLIGHT_COLOR, tabBarLabelPosition: 'below-icon'}}>
            <Tab.Screen name="Meetlist" component={CarmeetNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Carmeets',
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'list'
                    color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="CarGroups" component={CargroupNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Cargroups',
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons
                    name= 'groups'
                    color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="Cars" component={CarNavigator} options={{
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
// Carmeetlist --> craete carmeet
const CarmeetNavStack = createNativeStackNavigator();
export const CarmeetNavigator = () => {
    return (
        <CarmeetNavStack.Navigator>
            <CarmeetNavStack.Screen name="Meetlist" component={Meetlist} options={{headerShown:  false}}/>
            <CarmeetNavStack.Screen name="MeetDetail" component={MeetDetail} options={{headerShown: false}}/>
            <CarmeetNavStack.Screen name="CreateCarMeet" component={AddCarmeet} options={{headerShown: false}} />
        </CarmeetNavStack.Navigator>
    )
}

// Cargroupslist --> Details
// Cargroupslist --> createCargroup
const CargroupNavStack = createNativeStackNavigator();
export const CargroupNavigator = () => {
    return (
        <CargroupNavStack.Navigator>
            <CargroupNavStack.Screen name="Cargroups" component={CarGroupList} options={{headerShown: false}}/>
            <CargroupNavStack.Screen name="CarGroupDetail" component={CarGroupDetails} options={{headerShown: false}}/>
            <CargroupNavStack.Screen name="CreateCarGroup" component={AddCargroup} options={{headerShown: false}} />
        </CargroupNavStack.Navigator>
    )
}

// Profile --> Settings
const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
                <RootStack.Screen name="Settings" component={Settings}/>
                <RootStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <RootStack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </RootStack.Group>
        </RootStack.Navigator>
    );
}

//carlist --> addCars
const CarNavStack = createNativeStackNavigator();
export const CarNavigator = () => {
    return (
        <CarNavStack.Navigator>
            <CarNavStack.Screen name="cars" component={CarList} options={{headerShown: false}} />
            <CarNavStack.Screen name="CreateCar" component={AddCar} options={{headerShown: false}} />
        </CarNavStack.Navigator>
    )
}

//cargrouplist --> addCarGroup

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.TAB_BAR_COLOR,
        }
    });

    return styles
}