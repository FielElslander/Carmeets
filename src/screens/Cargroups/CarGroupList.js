import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, View, Image, Text, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { useUser } from '../../constants/user';
import { useTheme } from '../../constants/theme.style';
import { TouchableOpacity } from 'react-native-web';


const CarGroupList = ({navigation}) => {

    //variables
    const [groupList, setGroups] = useState([]);
    const [filterText, setFilterText] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    //theme
    const {theme} = useTheme();
    const styles = getStyles(theme);

    //user
    const {user} = useUser();


    //functions
    const onGroupClick = (carGroup) => {
        console.log('navigate to group details');
        navigation.navigate('CarGroupDetail', {carGroup: carGroup});
    }

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/FielElslander/JsonTestData/main/Cargroups.json')
        .then(res => res.json())
        .then(data => {
            setGroups(data)
            setFilteredList(data)
        });
    }, []);

    const updateList = (text) => {
        setFilterText(text)
        setFilteredList(groupList.filter(group => group.name.toLowerCase().includes(text.toLowerCase())));
    }

    const OnCreateClick = () => {
        console.log('OnCreateClick');
        navigation.navigate('CreateCarGroup')
    }
    const onDeleteItem = (id) => {
        console.log("onDeleteItem")
    }
    
    return (
        <SafeAreaView style={styles.containerParent}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Cargroups</Text>
                <>
                    <SafeAreaView style={styles.searchContainer}>
                        <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}} />
                        <TextInput
                            style={styles.searchText}
                            placeholder='Search cargroups'
                            value={filterText}
                            onChangeText={updateList} />
                    </SafeAreaView>
                    <TouchableOpacity style={styles.buttonstyle} onPress={OnCreateClick}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </>
                {/* List with meets (clickable) */}
                <ScrollView>
                    {filteredList.map(group => (
                        <ListItem key={group.id} containerStyle={styles.listItem} bottomDivider onPress={() => onGroupClick(group)}>
                            <ListItem.Content>
                                <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${group.id} - ${group.name}`}</ListItem.Title>
                                <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`${group.Land}`}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Icon
                                name="trash"
                                type="font-awesome"
                                color={"red"}
                                onPress={() => onDeleteItem(group.id)}/>
                        </ListItem>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    )
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
            color: theme.TEXT_COLOR,
            wordwrap: 'break-word'
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
        joinButton: {
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

export default CarGroupList;