import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useTheme } from '../../constants/theme.style'

const CarGroupDetails = (props) => {

    const {theme } = useTheme();
    const styles = getStyles(theme);

    const {
        id,
        name,
        Land,
        members
    } = props.route.params.carGroup;

    return (
        <View style={styles.container}>
            {/* delete button toevoegen */}
            <Text style={styles.text}>{`${id} - ${name}`}</Text>
            <Text style={styles.text}>{`from: ${Land}`}</Text>
            <Text style={styles.text}>Members:</Text>
            <ScrollView style={styles.text}>
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

const getStyles = (theme) => {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          paddingTop: 30,
          backgroundColor: theme.PRIMARY_COLOR
        },
        text: {
            color: theme.TEXT_COLOR,
            backgroundColor: theme.PRIMARY_COLOR
        }
      });
    
      return styles;
}

export default CarGroupDetails;