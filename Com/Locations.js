/**
 * Created by japjohal on 2018-11-13.
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Permissions                                from 'react-native-permissions';

export default class Locations extends Component{

    constructor(props){
        super(props);
        this.state= {
            locationPermissions: '',
            position:           'unknown',
            region:{
                latitude:50.60254,
                latitudeDelta:0.1,
                longitude:16.7218757,
                longitudeDelta:0.1,
            },
            coords:{},
            photoPermission:""
        }
    }

    _requestPermission(){
        console.log(Permissions);
        // Permissions.request('location',{type:"always"})
        //     .then(response =>{
        //         this.setState({
        //             locationPermissions:response
        //         })
        //         console.log("Response: "+response)
        //     })
    }
    componentDidMount() {
        console.log("Start");
        this._requestPermission();
        console.log("Check position");

        navigator.geolocation.getCurrentPosition(position =>{

            let coordinates = position.coords.latitude + ", " +position.coords.longitude
            let regionn = {
                "latitude"      : position.coords.latitude,
                "latitudeDelta" : 0.005,
                "longitude"     : position.coords.longitude,
                "longitudeDelta": 0.004
            }
            console.log(regionn);
            this.setState({
                position:coordinates,
                region:regionn,
                coords:{
                    longitude:position.coords.longitude,
                    latitude:position.coords.latitude
                }
            })

        }, (error) => alert(JSON.stringify(error)))


    }

    render(){
        return(
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}
