import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet} from 'react-native';

import Colors from '../costants/Colors';

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('');

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const savePlaceHandler = () => {
        
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>title</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={titleChangeHandler} 
                    value={titleValue}/>
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler}></Button>
            </View>
        </ScrollView>
    );
        
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;