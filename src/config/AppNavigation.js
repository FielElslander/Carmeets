import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'

//-----------------------------------------------------------
import Home from '../screens/Home/Home'
import Meetlist from '../screens/Carmeets/MeetList'
import Profile from '../screens/Participant/Profile'
import MeetDetail from '../screens/Carmeets/MeetDetail';
import CarGroupDetails from '../screens/Cargroups/CarGroupDetails';
import CarGroupList from '../screens/Cargroups/CarGroupList';
import CarList from '../screens/Cars/CarList';
import Settings from '../screens/Settings';
import { RecyclerViewBackedScrollViewComponent } from 'react-native';
//-----------------------------------------------------------

const HomeStack = createNativeStackNavigator();
export const FeedNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{headerShown : false}} />
            <HomeStack.Screen name="Meetlist" component={Navigator} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function Navigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Meetlist" component={DetailNavigator} options={{
                tabBarLabel: 'Carmeets',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'list'
                    color={color} size={size}/>
                )
            }}>
            </Tab.Screen>
            <Tab.Screen name="CarGroups" component={CarGroupDetailsNavigator} options={{
                tabBarLabel: 'Cargroups',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons
                    name= 'groups'
                    color={color} size={size}/>
                )
            }}>
            </Tab.Screen>
            <Tab.Screen name="Cars" component={CarList} options={{
                tabBarLabel: 'Cars',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'car'
                    color={color} size={size}/>
                )
            }}>
            </Tab.Screen>
            <Tab.Screen name="Profile" component={RootNavigator} options={{
                tabBarLabel: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                    name= 'person'
                    color={color} size={size}/>
                )
            }}>
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const DetailStack = createNativeStackNavigator();

export const DetailNavigator = () => {
    return (
        <DetailStack.Navigator>
            <DetailStack.Screen name="Meetlist" component={Meetlist} options={{headerShown: false}}/>
            <DetailStack.Screen name="MeetDetail" component={MeetDetail} options={{headerShown: false}}/>
        </DetailStack.Navigator>
    )
}

const CarGroupDetailsStack = createNativeStackNavigator();
export const CarGroupDetailsNavigator = () => {
    return (
        <CarGroupDetailsStack.Navigator>
            <CarGroupDetailsStack.Screen name="Cargroups" component={CarGroupList} options={{headerShown: false}}/>
            <CarGroupDetailsStack.Screen name="CarGroupDetail" component={CarGroupDetails} options={{headerShown: false}}/>
        </CarGroupDetailsStack.Navigator>
    )
}

const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
                <RootStack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
            </RootStack.Group>
        </RootStack.Navigator>
    )
}
