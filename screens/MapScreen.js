import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import Colors from '../costants/Colors';

const MapScreen = props => {

    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly = props.navigation.getParam('readOnly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const mapRegion = {
        latitude: initialLocation? initialLocation.lat: 37.78,
        longitude: initialLocation? initialLocation.lng: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        if(readOnly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    }; 

    const savePickedLocationHandler = useCallback(() => {   
        if(!selectedLocation) {
            //Could show an alert
            return;
        }
        props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation});
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler});
    }, [savePickedLocationHandler]);

    let markerCoodinates;
    if(selectedLocation) {
        markerCoodinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
        {markerCoodinates && <Marker title='Picked Location' coordinate={markerCoodinates}></Marker>} 
    </MapView>;
};

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');  
    const readOnly = navData.navigation.getParam('readOnly');
    if(readOnly) {
        return {};
    }  
    return {
        headerRight: (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;