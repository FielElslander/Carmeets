import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, View, Image, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { useUser } from '../../constants/user';
import { useTheme } from '../../constants/theme.style';
import groupListTitle from '../../../assets/CargroupPNG.png';


const CarGroupList = ({navigation}) => {

    //variables
    const [groupList, setGroups] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    //theme
    const {theme} = useTheme();
    const styles = getStyles(theme);

    //user
    const {user} = useUser();

    /*useEffect(() => {
        fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cargroups')
        .then(res => res.json())
        .then(data => {
            setGroups(data);
            setFilteredList(data);
        })
        .catch(err => {setGroups(null); setFilteredList(null);})
    }, []);*/

    const fetchGroups = async () => {
        try{
            const response = await fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cargroups')
            const data = await response.json();
            setGroups(data);
            setFilteredList(data);
        } catch (error) {
            console.error("Error fetching groups: ", error);
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [refreshing]);

    const updateList = (text) => {
        setFilterText(text)
        setFilteredList(groupList.filter(group => group.name.toLowerCase().includes(text.toLowerCase())));
    }

    //functions
    const onGroupClick = (carGroup) => {
        console.log('navigate to group details');
        navigation.navigate('CarGroupDetail', {carGroup: carGroup});
    }
    const OnCreateClick = () => {
        console.log('OnCreateClick');
        navigation.navigate('CreateCarGroup')
    }
    const onDeleteItem = async (id) => {
        console.log("onDeleteItem")
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cargroups/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log('cargroup deleted successfully');
            } else {
                const responseData = await response.json();
                console.error('Error deleting cargroup:', responseData);
            }
        } catch (error) {
            console.error('Error during cargroup deletion:', error);
        }
    }
    const onJoinClick = async (id) => {
        console.log('joingrouppressed');
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cargroups/AddMember/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.id),
            });
    
            if (response.ok) {
                console.log('Participant added successfully to cargroup');
            } else {
                const responseData = await response.json();
                console.error('Error adding participant to cargroup:', responseData);
            }
        } catch (error) {
            console.error('Error during participant addition to cargroup:', error);
        }
    }

    const onLeaveGroupClick = async (id) => {
        console.log('leaveGroupPressed');
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cargroups/DeleteMember/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.id),
            });
    
            if (response.ok) {
                console.log('Participant successfully left group');
            } else {
                const responseData = await response.json();
                console.error('Error leaving cargroup:', responseData);
            }
        } catch (error) {
            console.error('Error during participant leaving cargroup:', error);
        }
    }
    
    if(user != null) {
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                <Image source={groupListTitle} style={styles.backgroundImage} />
                    <>
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}} />
                            <TextInput
                                style={styles.searchText}
                                placeholder='Search cargroups'
                                value={filterText}
                                onChangeText={updateList} />
                        </SafeAreaView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonstyle} onPress={OnCreateClick}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Icon name="refresh" size={30} style={styles.iconRefresh} 
                            color={theme.TEXT_COLOR} onPress={() => setRefreshing(true)}/>
                        </View>
                    </>
                    {/* List with meets (clickable) */}
                    {filteredList ? (
                        <ScrollView>
                        {filteredList.map(group => (
                            <ListItem key={group.id} containerStyle={styles.listItem} bottomDivider onPress={() => onGroupClick(group)}>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${group.id} - ${group.name}`}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`${group.location}`}</ListItem.Subtitle>
                                    {group.members && group.members.map(member => member.id).includes(user.id) ? (
                                        <TouchableOpacity style={styles.joinButton} onPress={() => onLeaveGroupClick(group.id)}>
                                            <Text style={styles.buttonText}>Leave group..</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.joinButton} onPress={() => onJoinClick(group.id)}>
                                            <Text style={styles.buttonText}>Join group!</Text>
                                        </TouchableOpacity>
                                    )}
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    color={"red"}
                                    onPress={() => onDeleteItem(group.id)}/>
                            </ListItem>
                        ))}
                    </ScrollView>
                    ) : (
                        <Text>No data available, check internet connection..</Text>
                    )}                    
                </SafeAreaView>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                <Image source={groupListTitle} style={styles.backgroundImage} />  
                    <>
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}} />
                            <TextInput
                                style={styles.searchText}
                                placeholder='Search cargroups'
                                value={filterText}
                                onChangeText={updateList} />
                        </SafeAreaView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonstyle} onPress={OnCreateClick}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Icon name="refresh" size={30} style={styles.iconRefresh} 
                            color={theme.TEXT_COLOR} onPress={() => setRefreshing(true)} />
                        </View>
                    </>
                    {filteredList ? (
                        <ScrollView>
                        {filteredList.map(group => (
                            <ListItem key={group.id} containerStyle={styles.listItem} bottomDivider onPress={() => onGroupClick(group)}>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${group.id} - ${group.name}`}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`${group.location}`}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    color={"red"}
                                    onPress={() => onDeleteItem(group.id)}/>
                            </ListItem>
                        ))}
                    </ScrollView>
                    ) : (
                        <Text>No data available, check internet connection..</Text>
                    )}
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.PRIMARY_COLOR,
            flex: 1,
            marginHorizontal: '5%'
        },
        containerParent: {
              backgroundColor: theme.PRIMARY_COLOR,
              flex: 1
        },
        searchText: {
            flex: 1,
            height: 40,
            borderRadius: 20,
            color: theme.TEXT_COLOR
        },
        backgroundImage: {
            width: '100%',
            height: 50,
            padding: '15%',
            paddingTop: '15%',
            position: 'relative',
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.BORDER_COLOR,
            borderRadius: 20,
            height: 40,
            padding: 5,
            color: theme.TEXT_COLOR,
            backgroundColor: theme.PRIMARY_COLOR,
            marginBottom: 10
        },
        listItem: {
            borderRadius: 5,
            backgroundColor: theme.LIST_BG_COLOR,
            color: theme.TEXT_COLOR,
            marginBottom: 5,
            shadowColor: "black",
        },
        title: {
            fontWeight: '400',
            paddingTop: 20,
            fontSize: 64,
            margin: 'auto',
            fontWeight: 'bold',
            color: theme.TEXT_COLOR,
        },
        buttonstyle: {
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 10,
            width: '85%',
            backgroundColor: theme.BUTTON_COLOR,
            borderRadius: 20,
            alignSelf: 'left',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            color: 'white'
        },
        joinButton: {
            paddingTop: 5,
            paddingBottom: 5,
            minWidth: 100,
            backgroundColor: theme.BUTTON_COLOR,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        iconRefresh : {
            justifyContent: 'flex-end',
            marginLeft: 10,
        }
    });
    return styles;
}

export default CarGroupList;