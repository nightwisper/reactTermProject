import React from 'react';
import { StyleSheet, Text, View }   from 'react-native';
import TextTranslation              from './Com/TextTranslation';
import Permissions                  from './Com/Locations';
import CounCode                     from './Com/CounCode';
import Map                          from './Com/MapComponent'
import {createStackNavigator,  createAppContainer}       from 'react-navigation'


const RootStack = createStackNavigator({
        Home: {
            screen: Map
        },
        loadMe: {
             screen: CounCode
        },
        settings:{
            screen:TextTranslation
        }
    },
    {
    initialRouteName:'loadMe'
    }
)
const App = createAppContainer(RootStack);

export default App;


