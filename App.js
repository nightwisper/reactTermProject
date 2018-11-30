import React from 'react';
import Ionicons from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import TextTranslation from './Com/TextTranslation';
import Permissions from './Com/Locations';
import CounCode from './Com/CounCode';
import Map from './Com/MapComponent'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'


const RootStack = createBottomTabNavigator({
    Home: CounCode,
    Map: Map,
    Settings: TextTranslation
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            TabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    },
    {
        initialRouteName: 'Home'
    }
)
const App = createAppContainer(RootStack);

export default App;


