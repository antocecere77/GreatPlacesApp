import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapScreen = props => {

    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.421
    };

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    }; 

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

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default MapScreen;