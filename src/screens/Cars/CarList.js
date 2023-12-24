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
        fetch('http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/cars')
        .then(res => res.json())
        .then(data => {
            setCars(data);
            setFilteredList(data);
        })
        .catch(error => {setCars(null); setFilteredList(null);});
    }, []);

    const updateList = (text) => {
        setFilterText(text);
        setFilteredList(carList.filter(car => car.Brand.toLowerCase().includes(text.toLowerCase()) || car.Model.toLowerCase().includes(text.toLowerCase())));
    };

    const onNavigateCreateClick = () => {
        console.log("onNavigateCreateClick")
        navigation.navigate('CreateCar')
    }

    const onDeleteItem = async (id) => {
        console.log("onDeleteItem")
        try {
            const response = await fetch(`http://carsxcoffeeapi-6dd54f16adfd.herokuapp.com/participants/DeleteCar/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            });
    
            if (response.ok) {
                console.log('Car successfully deleted');
            } else {
                const responseData = await response.json();
                console.error('Error deleting car:', responseData);
            }
        } catch (error) {
            console.error('Error during car deletion:', error);
        }
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
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonstyle} onPress={onNavigateCreateClick}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <Icon name="refresh" size={30} style={styles.iconRefresh} color={theme.TEXT_COLOR} />
                        </View>
                        {filteredList ? (
                            <ScrollView>
                                {filteredList.map(car => (
                                    <ListItem key={car.id} containerStyle={styles.listItem} bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${car.id} - ${car.brand} - ${car.model}`}</ListItem.Title>
                                            <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`Year: ${car.productionYear}`}</ListItem.Subtitle>
                                        </ListItem.Content>
                                        {car.ownerId === user.id && (
                                            <Icon
                                                name="trash"
                                                color={"red"}
                                                type="font-awesome"
                                                onPress={() => onDeleteItem(car.id)}
                                            />
                                        )}
                                    </ListItem>                    
                                ))}
                            </ScrollView>
                        ) : (
                            <Text>No data available, check internet connection..</Text>
                        )}
                    </>
                </SafeAreaView>
            </SafeAreaView>
        );
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
                        <View style={styles.buttonContainer}>
                            <Icon name="refresh" size={30} style={styles.iconRefresh} 
                            color={theme.TEXT_COLOR}/>
                        </View>
                        {filteredList ? (
                            <ScrollView>
                                {filteredList.map(car => (
                                    <ListItem key={car.id} containerStyle={styles.listItem} bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${car.id} - ${car.brand} - ${car.model}`}</ListItem.Title>
                                            <ListItem.Subtitle style={{color: theme.TEXT_COLOR}}>{`Year: ${car.productionYear}`}</ListItem.Subtitle>
                                        </ListItem.Content>
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

export default CarList;