import React from 'react';
import { StyleSheet, Text, View }   from 'react-native';
import TextTranslation              from './Com/TextTranslation';
import Permissions                  from './Com/Locations';
import CounCode                     from './Com/CounCode';
import {createStackNavigator,  createAppContainer}       from 'react-navigation'


const RootStack = createStackNavigator({
        Home: {
            screen: Permissions
        },
        loadMe: {
             screen: CounCode
        },
    },
    {
    initialRouteName:'loadMe'
    }
)
const App = createAppContainer(RootStack);

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        left:40,
        top:80
    },
});
