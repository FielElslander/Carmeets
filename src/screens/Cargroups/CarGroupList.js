import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, View, Image, Text, TextInput, ScrollView } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { useUser } from '../../constants/user';


const CarGroupList = ({navigation}) => {

    //variables
    const [groupList, setGroups] = useState([]);
    const [filterText, setFilterText] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

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
        <View>
            {/* Input field for filtering based on location? */}
            <>
                <TextInput
                    style={styles.searchContainer}
                    placeholder='Search cargroups'
                    value={filterText}
                    onChangeText={updateList} />
                <Button title="+" onPress={OnCreateClick}/>
            </>
            {/* List with meets (clickable) */}
            <ScrollView>
                {filteredList.map(group => (
                    <ListItem key={group.id} bottomDivider onPress={() => onGroupClick(group)}>
                        <ListItem.Content>
                            <ListItem.Title>{`${group.id} - ${group.name}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${group.Land}`}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Icon
                            name="trash"
                            type="font-awesome"
                            onPress={() => onDeleteItem(group.id)}/>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10
    }
})

export default CarGroupList;