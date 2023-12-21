import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import CarmeetPng from '../../../assets/classic-tuned-drift-sport-car-png.png'
import { useTheme } from '../../constants/theme.style';

const MeetDetail = ({route, navigation}) => {

    const [displayedMeet, setDisplayedMeet] = useState(route.params.carMeet);
    const [carMeets, setCarMeets] = useState([])
    const [randomCarMeets, setRandomCarMeets] = useState([])

    //theme
    const { theme } = useTheme();
    const styles = getStyles(theme);

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

    const onNavigateBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.containerParent}>
            <Image source={CarmeetPng} style={styles.backgroundImage} />
            <SafeAreaView style={styles.innerContainer}>
                <View style={styles.icon}>
                <Icon name="arrow-back" type='material' color='black' size={30} onPress={() => onNavigateBack()} />
                </View>   
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{`${displayedMeet.Name}`}</Text>
                    </View>                    
                    <Text style={styles.text}>{`Date: ${displayedMeet.Date}`}</Text>
                    <Text style={styles.text}>{`Parkingspots: ${displayedMeet.Parkingspots}`}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>{`Place: ${displayedMeet.Location} - (${displayedMeet.Land})`}</Text>
                        <Text style={styles.text}>{`Price: ${displayedMeet.Income}`}</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.sectionTitle}>List of all participants</Text>
                    <ScrollView>
                        {displayedMeet.Participants.map(participant => (
                            <ListItem key={participant.id} containerStyle={styles.listItem} bottomDivider>
                                <ListItem.Content>
                                <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${participant.Id} - ${participant.Name}`}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>
                    <View style={styles.divider} />
                    <Text style={styles.sectionTitle}>Some other meetings</Text>
                    <ScrollView horizontal>
                        {randomCarMeets.map((randomCarmeet) => (
                            <ListItem key={randomCarmeet.Id} containerStyle={styles.listItem} bottomDivider onPress={() => onMeetClick(randomCarmeet)}>
                                <ListItem.Content>
                                <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${randomCarmeet.Name}`}</ListItem.Title>
                                <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`${randomCarmeet.Date} - ${randomCarmeet.Location}`}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const getStyles = (theme) => {
    const styles = StyleSheet.create({
          containerParent: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.PRIMARY_COLOR,
          },
          backgroundImage: {
            width: '100%', // Take up the full width
            height: 150, // Adjust the height as needed
            resizeMode: 'cover', // Maintain aspect ratio and cover the entire space
            position: 'absolute', // Position the image absolutely
            top: -50, // Overlap the top part of the innerContainer
            left: 0, // Align the image to the left
          },
          innerContainer: {
            backgroundColor: theme.LIST_BG_COLOR, // Background color for the inner container
            margin: 16,
            padding: 16,
            height: '80%',
            width: '80%', // Adjust the percentage based on your preference
            alignSelf: 'center', // Center the inner container horizontally
            borderRadius: 10,
          },
          titleContainer: {
            alignItems: 'center',
            marginBottom: 16,
          },
          title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.TEXT_COLOR
          },
          infoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
            color: theme.TEXT_COLOR
          },
          text: {
            paddingHorizontal: 15,
            color: theme.TEXT_COLOR
          },
          icon: {
            alignSelf: 'flex-start',
            color: theme.TEXT_COLOR
          },
          divider: {
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginBottom: 16,
            color: theme.PRIMARY_COLOR
          },
          sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            paddingHorizontal: 15,
            color: theme.TEXT_COLOR,
          },
          listItem: {
            borderRadius: 5,
            backgroundColor: theme.PRIMARY_COLOR,
            color: theme.TEXT_COLOR,
            marginBottom: 5,
            marginHorizontal: 15
        },
    });

    return styles
}

export default MeetDetail;