import React from 'react';
import { StyleSheet, Text, View }   from 'react-native';
import TextTranslation              from './Com/TextTranslation';
import Permissions                  from './Com/Locations';
import CounCode                     from './Com/CounCode';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <CounCode/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
