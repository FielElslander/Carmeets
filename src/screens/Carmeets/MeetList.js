import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Button, ScrollView, TextInput } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useUser } from  '../../constants/user';



const Meetlist = ({navigation}) => {

    //variables
    const [meetlist, setMeets] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

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

    return (
        <View>
            {/* TITLE */}
            {/* Input field for filtering based on location? */}
            <>
                <TextInput
                    placeholder="Search carmeets"
                    value={filterText}
                    onChangeText={updatelist}/>
                <Button
                    title="+"
                    onPress={onNavigateCreateClick}/>
            </>
            {/* List with meets (clickable) */}
            <ScrollView>
                {filteredList.map(meet => (
                    <ListItem key={meet.Id} bottomDivider onPress={() => onMeetClick(meet)}>
                        <ListItem.Content>
                            <ListItem.Title>{`${meet.Id} - ${meet.Name}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${meet.Date} - ${meet.Location}`}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Icon
                            name="trash"
                            type="font-awesome"
                            onPress={() => onDeleteItem(meet.Id)}/>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

export default Meetlist;