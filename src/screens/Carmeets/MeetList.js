import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useUser } from  '../../constants/user';
import { useTheme } from '../../constants/theme.style';
import TitlePng from '../../../assets/TitlePNG.png';



const Meetlist = ({navigation}) => {

    //variables
    const [meetlist, setMeets] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    //theme
    const { theme } = useTheme();
    const styles = getStyles(theme);

    //user
    const { user } = useUser();

    const onMeetClick = (carMeet) => {
        console.log('onMeetClick.called');
        navigation.navigate('MeetDetail', {carMeet: carMeet});
    }

    useEffect(() => {
        //fetch('https://raw.githubusercontent.com/FielElslander/JsonTestData/main/Carmeets.json')
        fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/carmeets')
        .then(res => res.json())
        .then(data => {
            setMeets(data)
            setFilteredList(data)
        })
        .catch(err => {setMeets(null); setFilteredList(null);});
    }, []);

    const updatelist = (text) => {
        setFilterText(text)
        setFilteredList(meetlist.filter(meet => meet.Name.toLowerCase().includes(text.toLowerCase())));
    }

    const onNavigateCreateClick = () => {
        console.log('OnCreateClick');
        navigation.navigate('CreateCarMeet')
    }

    const onDeleteItem = async (id) => {
        console.log("onDeleteItem")
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/carmeets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log('Carmeet deleted successfully');
            } else {
                const responseData = await response.json();
                console.error('Error deleting carmeet:', responseData);
            }
        } catch (error) {
            console.error('Error during carmeet deletion:', error);
        }
    }

    const joinMeeting = async (id) => {
        console.log("JoinMeetingpressed");
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/carmeets/AddParticipant/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.id),
            });
    
            if (response.ok) {
                console.log('Participant added successfully to carmeet');
            } else {
                const responseData = await response.json();
                console.error('Error adding participant to carmeet:', responseData);
            }
        } catch (error) {
            console.error('Error during participant addition to carmeet:', error);
        }
    }

    const leaveMeeting = async (id) => {
        console.log("leaveMeetingPressed");
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/carmeets/DeleteParticipant/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.id),
            });
    
            if (response.ok) {
                console.log('Participant successfully left meet');
            } else {
                const responseData = await response.json();
                console.error('Error leaving carmeet:', responseData);
            }
        } catch (error) {
            console.error('Error during participant leaving carmeet:', error);
        }
    }

    if(user != null) {
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    <Image source={TitlePng} style={styles.backgroundImage} />
                    {/* Input field for filtering based on location? */}
                    <>
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}} />
                            <TextInput
                                placeholder="Search carmeets"
                                value={filterText}
                                style={styles.searchText}
                                onChangeText={updatelist}/>
                        </SafeAreaView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonstyle} onPress={onNavigateCreateClick}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Icon name="refresh" size={30} style={styles.iconRefresh} 
                            color={theme.TEXT_COLOR} />
                        </View>
                    </>
                    {/* List with meets (clickable) */}
                    {filteredList ? (
                        <ScrollView>
                        {filteredList.map(meet => (
                            <ListItem key={meet.id} containerStyle={styles.listItem} bottomDivider onPress={() => onMeetClick(meet)}>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${meet.id} - ${meet.name}`}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`${meet.date} - ${meet.location}`}</ListItem.Subtitle>
                                    {meet.participants && meet.participants.map(participant => participant.id).includes(user.id) ? (
                                        <TouchableOpacity style={styles.participateButton} onPress={() => leaveMeeting(meet.id)}>
                                            <Text style={styles.buttonText}>Leave meet..</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.participateButton}
                                            onPress={() => joinMeeting(meet.id)}>
                                                <Text style={styles.buttonText}>Participate!</Text>
                                        </TouchableOpacity>
                                    )}                                    
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    color={"red"}
                                    onPress={() => onDeleteItem(meet.id)}/>
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
    else {
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    <Image source={TitlePng} style={styles.backgroundImage} />
                    {/* Input field for filtering based on location? */}
                    <View>
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}} />
                            <TextInput
                                placeholder="Search carmeets"
                                style={styles.searchText}
                                value={filterText}
                                onChangeText={updatelist}/>
                        </SafeAreaView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonstyle} onPress={onNavigateCreateClick}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Icon name="refresh" size={30} style={styles.iconRefresh} 
                            color={theme.TEXT_COLOR} />
                        </View>
                    </View>
                    {filteredList ? (
                        <ScrollView>
                        {filteredList.map(meet => (
                            <ListItem key={meet.id} containerStyle={styles.listItem} bottomDivider onPress={() => onMeetClick(meet)}>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${meet.id} - ${meet.name}`}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`${meet.date} - ${meet.location}`}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    color={"red"}
                                    onPress={() => onDeleteItem(meet.id)}/>
                            </ListItem>
                        ))}
                    </ScrollView>
                    ): (
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
        backgroundImage: {
            width: '100%',
            height: 50,
            padding: '15%',
            paddingTop: '15%',
            position: 'relative',
        },
        text: {
            color: theme.TEXT_COLOR
        },
        listItem: {
            borderRadius: 5,
            backgroundColor: theme.LIST_BG_COLOR,
            color: theme.TEXT_COLOR,
            marginBottom: 5,
            shadowColor: "black",
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
        title: {
            fontWeight: 'bold',
            paddingTop: 20,
            fontSize: 64,
            margin: 'auto',
            color: theme.TEXT_COLOR,
        },
        searchText: {
            flex: 1,
            height: 40,
            borderRadius: 20,
            color: theme.TEXT_COLOR
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
            marginBottom: 10
        },
        participateButton: {
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

export default Meetlist;