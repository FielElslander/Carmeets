import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TextInput, ScrollView, Button } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const CarList = ({navigation}) => {

    const [carList, setCars] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

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

    return (
        <View>
            {/* Input field for filtering based on location? */}
            <>
                <TextInput
                    placeholder='Search Cars'
                    value={filterText}
                    onChangeText={updateList}/>
                <Button
                    title="+"
                    onPress={onNavigateCreateClick}/>
            </>
            {/* List with meets (clickable) */}
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
}

export default CarList;