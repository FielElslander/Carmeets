import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useTheme } from '../../constants/theme.style'

const CarGroupDetails = ({route, navigation}) => {

    //theme
    const {theme } = useTheme();
    const styles = getStyles(theme);

    const {
        id,
        name,
        location,
        members
    } = route.params.carGroup;

    const onNavigateBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.containerParent}>
            <SafeAreaView style={styles.innerContainer}>
                <View style={styles.icon}>
                <Icon name="arrow-back" type='material' color='black' size={30} onPress={() => onNavigateBack()} />
                </View> 
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{`${name}`}</Text>
                </View>
                <Text style={styles.text}>{`Location: ${location}`}</Text>
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Members:</Text>
                <ScrollView style={styles.text}>
                    {members.map(member => (
                        <ListItem key={member.id} containerStyle={styles.ListItem} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{color: theme.TEXT_COLOR}}>{`${member.id} - ${member.name}`}</ListItem.Title>
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
            paddingHorizontal: '5%',
            color: theme.TEXT_COLOR,
        },
        text: {
            color: theme.TEXT_COLOR,
            paddingHorizontal: '5%',
        }
      });
    
      return styles;
}

export default CarGroupDetails;