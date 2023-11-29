import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

const CarGroupDetails = (props) => {

    const {
        id,
        name,
        Land,
        members
    } = props.route.params.carGroup;

    return (
        <View>
            <Text>{`${id} - ${name}`}</Text>
            <Text>{`from: ${Land}`}</Text>
            <Text>Members:</Text>
            <ScrollView>
                {members.map(member => (
                    <ListItem key={member.id} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{`${member.Id} - ${member.Name}`}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}

export default CarGroupDetails;