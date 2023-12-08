import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

const MeetDetail = ({route, navigation}) => {

    const [displayedMeet, setDisplayedMeet] = useState(route.params.carMeet);
    const [carMeets, setCarMeets] = useState([])
    const [randomCarMeets, setRandomCarMeets] = useState([])

    const getRandomCarMeets = (carmeetList) => {
        const shuffledCarMeets = carmeetList.sort(() => 0.5 - Math.random());
        return shuffledCarMeets.splice(0,3);
    }

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/FielElslander/JsonTestData/main/Carmeets.json')
        .then(res => res.json())
        .then(data => {
            setCarMeets(data)
            const randomCarMeets = getRandomCarMeets(data);
            setRandomCarMeets(randomCarMeets)
        });
    }, [displayedMeet]);

    const onMeetClick = (carMeet) => {
        console.log('onMeetClick.called');
        setDisplayedMeet(carMeet);
    }

    return (
        <View>
            {/* Delete button to make them delete */}
            <Text>{`Carmeet ${displayedMeet.Id}: ${displayedMeet.Name} - ${Date}`}</Text>            
            <Text>{`Place: ${displayedMeet.Location} - (${displayedMeet.Land})`}</Text>            
            <Text>{`Price: ${displayedMeet.Income} - amount of spots: ${displayedMeet.Parkingspots}`}</Text>
            <ScrollView>
                {displayedMeet.Participants.map(participant => (
                    <ListItem key={participant.id} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{`${participant.Id} - ${participant.Name}`}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
            <Text>Some other meetings..</Text>
            <ScrollView horizontal>
                {randomCarMeets.map((randomCarmeet) => (
                    <ListItem key={randomCarmeet.Id} bottomDivider onPress={() => onMeetClick(randomCarmeet)}>
                        <ListItem.Content>
                            <ListItem.Title>{`${randomCarmeet.Name}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${randomCarmeet.Date} - ${randomCarmeet.Location}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

export default MeetDetail;