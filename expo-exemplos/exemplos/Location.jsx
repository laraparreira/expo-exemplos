import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

export default function ExemploLocation() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            // if (Platform.OS === 'android' && !Device.isDevice) {
            //     setErrorMsg(
            //         'Oops, Isso só vai funcionar no seu smartphone'
            //     );
            //     return;
            // }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização foi negada');
                return;
            }

            // Peganod a localização a cada 1 segundo
            setInterval(async () => {
                let _location = await Location.getCurrentPositionAsync({});
                setLocation(_location);
            }, 1000);

        })();
    }, []);


    if ( errorMsg ) {
        return (
            <View style={styles.container}>
                <Text style={[styles.paragraph, { fontWeight: 'bold', color: '#ff0000' }]}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Latitude: {location?.coords.latitude}</Text>
            <Text style={styles.paragraph}>Longitude: {location?.coords.longitude}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
