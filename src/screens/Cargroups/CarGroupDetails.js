import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const CarGroupDetails = (props) => {

    const {
        id,
        name,
        land,
        members
    } = props.route.params.carGroup;

    return (
        <View>
            {/* TITLE */}
            <Text>Details...</Text>
            {/* Input field for filtering based on location? */}
            {/* List with meets (clickable) */}
        </View>
    )
}

export default CarGroupDetails;