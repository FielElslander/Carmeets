import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, View, Image, Text, TextInput, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';


const CarGroupList = ({navigation}) => {

    const [groupList, setGroups] = useState([]);
    const [filterText, setFilterText] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const onGroupClick = () => {
        console.log('navigate to group details');
        navigation.navigate('CarGroupDetail');
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

    return (
        <View>
            {/* TITLE */}
            <Text>ListCarGroups</Text>
            {/* Input field for filtering based on location? */}
            <TextInput
                placeholder='Search cargroups'
                value={filterText}
                onChangeText={updateList} />
            {/* List with meets (clickable) */}
            <ScrollView>
                {filteredList.map(group => (
                    <ListItem key={group.id} bottomDivider onPress={() => onGroupClick()}>
                        <ListItem.Content>
                            <ListItem.Title>{`${group.Id} - ${group.Name}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${group.Land}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

export default CarGroupList;