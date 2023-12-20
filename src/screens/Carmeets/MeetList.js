import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useUser } from  '../../constants/user';
import { useTheme } from '../../constants/theme.style'



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
        fetch('https://raw.githubusercontent.com/FielElslander/JsonTestData/main/Carmeets.json')
        .then(res => res.json())
        .then(data => {
            setMeets(data)
            setFilteredList(data)
        });
    }, []);

    const updatelist = (text) => {
        setFilterText(text)
        setFilteredList(meetlist.filter(meet => meet.Name.toLowerCase().includes(text.toLowerCase())));
    }

    const onNavigateCreateClick = () => {
        console.log('OnCreateClick');
        navigation.navigate('CreateCarMeet')
    }

    const onDeleteItem = (id) => {
        console.log("onDeleteItem")
    }

    if(user != null) {
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    {/* TITLE */}
                    <Text style={styles.title}>Carmeets</Text>
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
                        <TouchableOpacity
                            style={styles.buttonstyle}
                            onPress={onNavigateCreateClick}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </>
                    {/* List with meets (clickable) */}
                    <ScrollView>
                        {filteredList.map(meet => (
                            <ListItem key={meet.Id} containerStyle={styles.listItem} bottomDivider onPress={() => onMeetClick(meet)}>
                                <ListItem.Content>
                                    <ListItem.Title>{`${meet.Id} - ${meet.Name}`}</ListItem.Title>
                                    <ListItem.Subtitle>{`${meet.Date} - ${meet.Location}`}</ListItem.Subtitle>
                                    <TouchableOpacity style={styles.participateButton}>
                                        <Text style={styles.buttonText}>Participate!</Text>
                                    </TouchableOpacity>
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    onPress={() => onDeleteItem(meet.Id)}/>
                            </ListItem>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    {/* TITLE */}
                    <Text style={styles.title}>Carmeets</Text>
                    {/* Input field for filtering based on location? */}
                    <>
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}} />
                            <TextInput
                                placeholder="Search carmeets"
                                style={styles.searchText}
                                value={filterText}
                                onChangeText={updatelist}/>
                        </SafeAreaView>
                        <TouchableOpacity
                            style={styles.buttonstyle}
                            onPress={onNavigateCreateClick}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </>
                    {/* List with meets (clickable) */}
                    <ScrollView>
                        {filteredList.map(meet => (
                            <ListItem key={meet.Id} containerStyle={styles.listItem} bottomDivider onPress={() => onMeetClick(meet)}>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: "white"}}>{`${meet.Id} - ${meet.Name}`}</ListItem.Title>
                                    <ListItem.Subtitle>{`${meet.Date} - ${meet.Location}`}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    onPress={() => onDeleteItem(meet.Id)}/>
                            </ListItem>
                        ))}
                    </ScrollView>
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
          marginHorizontal: 16
        },
        containerParent: {
            backgroundColor: theme.PRIMARY_COLOR,
            flex: 1
        },
        text: {
            color: theme.TEXT_COLOR
        },
        listItem: {
            borderRadius: 5,
            backgroundColor: theme.LIST_BG_COLOR,
            color: theme.TEXT_COLOR,
            marginBottom: 5
        },
        buttonstyle: {
            paddingTop: 5,
            paddingBottom: 5,
            marginBottom: 10,
            width: '100%',
            margin: 'auto',
            backgroundColor: theme.BUTTON_COLOR,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            color: 'white'
        },
        title: {
            fontWeight: '400',
            paddingTop: 20,
            fontSize: 64,
            margin: 'auto',
            color: theme.TEXT_COLOR,
            wordwrap: 'break-word'
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
        }
      });
    
      return styles;
}

export default Meetlist;