import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TextInput, ScrollView, Button } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useUser } from '../../constants/user';

const CarList = ({navigation}) => {

    //states
    const [carList, setCars] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

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
            <View>
                <>
                    <TextInput
                        placeholder='Search Cars'
                        value={filterText}
                        onChangeText={updateList}/>
                    <Button
                        title="+"
                        onPress={onNavigateCreateClick}/>
                </>
                <ScrollView>
                    {filteredList.map(car => (
                        <ListItem key={car.Id} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{`${car.Id} - ${car.Brand} - ${car.Model}`}</ListItem.Title>
                                <ListItem.Subtitle>{`Year: ${car.Year}`}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Icon
                                name="trash"
                                type="font-awesome"
                                onPress={() => onDeleteItem(car.Id)}
                            />
                        </ListItem>                    
                    ))}
                </ScrollView>
            </View>
        )
    } else {
        return (        
            <View>
                <>
                    <TextInput
                        placeholder='Search Cars'
                        value={filterText}
                        onChangeText={updateList}/>
                </>
                <ScrollView>
                    {filteredList.map(car => (
                        <ListItem key={car.Id} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{`${car.Id} - ${car.Brand} - ${car.Model}`}</ListItem.Title>
                                <ListItem.Subtitle>{`Year: ${car.Year}`}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>                    
                    ))}
                </ScrollView>
            </View>
        )
    }
}

export default CarList;