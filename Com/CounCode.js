/**
 * Created by japjohal on 2018-11-14.
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import publicIP from 'react-native-public-ip';

export default class CounCode extends Component{

    constructor(props) {
        super(props);
        this.state = {
            IpAddress:"",
            countryCode:"",
            text:"car",
            languageSpoken:"",
            locationPermissions:'unknown',
            position:           'unknown',
            latitude:50.60254,
            longitude:16.7218757,


        }
        this.getTranslation = this.getTranslation.bind(this);

    }

    _requestPermission(){
        console.log(Permissions);
        // Permissions.request('location')
        //     .then(response =>{
        //         this.setState({
        //             locationPermissions:response
        //         })
        //         console.log("Response: "+response)
        //     })
    }

    async componentDidMount() {
        //logic of function: get IP, get IpAddress of that IP, get the official language of that IpAddress
        await publicIP()
            .then(Ip => {
                this.setState({IpAddress:Ip})
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });

        await fetch('https://api.ip2location.com/?ip=32.59.17.32&key=FA1D2839EE&package=WS1')
        // Getting the IpAddress you are in. Note limit of 5000 queries
            .then(resp => {
                console.log(resp._bodyText);
                this.setState({countryCode:resp._bodyText})
            })
            .catch(err => console.log(err))

        await fetch('https://restcountries.eu/rest/v2/alpha/'+this.state.countryCode)
        // Getting IpAddress information. We are getting the main language of the IpAddress you are in.
            .then(resp => resp.json())
            .then(resp => {
                this.setState({languageSpoken:resp.languages[0].iso639_1})
                console.log(this.state.languageSpoken)
                console.log(resp) // lots of info about country
            })
            .catch(err => console.log(err))

        await navigator.geolocation.getCurrentPosition(position =>{

            this.setState({
                latitude:position.coords.latitude,
                longitude: position.coords.longitude
            })

        }, (error) => alert(JSON.stringify(error)))
    }

    getTranslation(){
        fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181108T001143Z.262ed9e990d844ab.2dded43e52ffdb229c9242837dac893936062d30&lang=en-'+this.state.languageSpoken+'&text='+this.state.text, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }})
            .then(response => {
                return response.json()})
            .then((response) => {
                console.log(response);
                this.setState({text:response.text[0]})

            })
            .catch(err => console.log(err))
    }


    render(){
        return(
            <View>
                <Text>{this.state.text}, {this.state.longitude}, {this.state.latitude}</Text>
                <TextInput
                    style={{width:100, height:40, borderColor:'red', borderWidth:1}}
                    onChangeText={(text) => this.setState({text})}
                />
                <Button
                    title="Click me"
                    onPress={this.getTranslation}/>
            </View>
        )
    }
}

