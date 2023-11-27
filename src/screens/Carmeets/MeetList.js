import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Button, ScrollView, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-web';



const Meetlist = ({navigation}) => {

    const [meetlist, setMeets] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    const onMeetClick = () => {
        console.log('onMeetClick.called');
        navigation.navigate('MeetDetail');
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

    return (
        <View>
            {/* TITLE */}
            <Text>Meetlist</Text>
            {/* Input field for filtering based on location? */}
            <TextInput
                placeholder="Search carmeets"
                value={filterText}
                onChangeText={updatelist}/>
            {/* List with meets (clickable) */}
            <ScrollView>
                {filteredList.map(meet => (
                    <ListItem key={meet.Id} bottomDivider onPress={() => onMeetClick()}>
                        <ListItem.Content>
                            <ListItem.Title>{`${meet.Id} - ${meet.Name}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${meet.Date} - ${meet.Location}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

export default Meetlist;