import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useUser } from '../../constants/user';
import { useTheme } from '../../constants/theme.style';
import  TitlePNG  from '../../../assets/CarTitlePNG.png';

const CarList = ({navigation}) => {

    //states
    const [carList, setCars] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    //theme
    const {theme} = useTheme();
    const styles = getStyles(theme);

    //user
    const { user } = useUser();

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/FielElslander/JsonTestData/main/cars.json')
        .then(res => res.json())
        .then(data => {
            setCars(data);
            setFilteredList(data);
        });
    }, []);

    const updateList = (text) => {
        setFilterText(text);
        setFilteredList(carList.filter(car => car.Brand.toLowerCase().includes(text.toLowerCase()) || car.Model.toLowerCase().includes(text.toLowerCase())));
    };

    const onNavigateCreateClick = () => {
        console.log("onNavigateCreateClick")
        navigation.navigate('CreateCar')
    }

    const onDeleteItem = (id) => {
        console.log("onDeleteItem")
    }

    if (user != null) {
        return (        
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                    <Image source={TitlePNG} style={styles.backgroundImage} />
                    <>
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}}/>
                            <TextInput
                                placeholder='Search Cars'
                                style={styles.searchText}
                                value={filterText}
                                onChangeText={updateList}/>
                        </SafeAreaView>
                        <TouchableOpacity style={styles.buttonstyle} onPress={onNavigateCreateClick}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </>
                    <ScrollView>
                        {filteredList.map(car => (
                            <ListItem key={car.Id} containerStyle={styles.listItem} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${car.Id} - ${car.Brand} - ${car.Model}`}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`Year: ${car.Year}`}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Icon
                                    name="trash"
                                    color={"red"}
                                    type="font-awesome"
                                    onPress={() => onDeleteItem(car.Id)}
                                />
                            </ListItem>                    
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
        )
    } else {
        return (        
            <SafeAreaView style={styles.containerParent}>
                <SafeAreaView style={styles.container}>
                <Image source={TitlePNG} style={styles.backgroundImage} />
                        <SafeAreaView style={styles.searchContainer}>
                            <Icon name="search" size={20} color={theme.SEARCHICON_COLOR} style={{marginRight: 5}}/>
                            <TextInput
                                placeholder='Search Cars'
                                style={styles.searchText}
                                value={filterText}
                                onChangeText={updateList}/>
                        </SafeAreaView>
                    <ScrollView>
                        {filteredList.map(car => (
                            <ListItem key={car.Id} containerStyle={styles.listItem} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${car.Id} - ${car.Brand} - ${car.Model}`}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`Year: ${car.Year}`}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>                    
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

const getStyles = (theme) => {
    const styles = new StyleSheet.create({
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
            fontWeight: 'bold',
            paddingTop: 20,
            fontSize: 64,
            margin: 'auto',
            color: theme.TEXT_COLOR,
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
    });

    return styles;
}

export default CarList;