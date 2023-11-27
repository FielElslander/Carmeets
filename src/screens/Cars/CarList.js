import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TextInput, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

const CarList = () => {

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

    return (
        <View>
            {/* TITLE */}
            <Text>List of all registered cars</Text>
            {/* Input field for filtering based on location? */}
            <TextInput
                placeholder='Search Cars'
                value={filterText}
                onChangeText={updateList}/>
            {/* List with meets (clickable) */}
            <ScrollView>
                {filteredList.map(car => (
                    <ListItem key={car.Id} bottomDivider>
                        <ListItem.Title>{`${car.Id} - ${car.Brand} - ${car.Model}`}</ListItem.Title>
                        <ListItem.Subtitle>{`Year: ${car.Year}`}</ListItem.Subtitle>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

export default CarList;