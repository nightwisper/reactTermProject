/**
 * Created by japjohal on 2018-11-07.
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class TextTranslation extends Component{

    constructor(props){
        super(props);
        this.state={
            text:"jap",
            locationPermissions:'unknown',
            position:           'unknown',
            region:{
                latitude:50.60254,
                latitudeDelta:0.1,
                longitude:16.7218757,
                longitudeDelta:0.1,
            },
            coords:{}
        };
        this.getTranslation = this.getTranslation.bind(this);
    }


    // componentDidMount() {
    //     return fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181108T001143Z.262ed9e990d844ab.2dded43e52ffdb229c9242837dac893936062d30&lang=en-es&text=hello', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }})
    //         .then(response => response.json())
    //         .then((response) => {
    //         console.log(response.text[0]);
    //         this.setState({text:response.text[0]})
    //
    //     })
    //         .catch(err => console.log(err))
    // }

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

    getTranslation(){
        fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181108T001143Z.262ed9e990d844ab.2dded43e52ffdb229c9242837dac893936062d30&lang=en-es&text='+this.state.text, {
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
        let text;
        if(this.state.text==""){
            text = <Text>Hello</Text>
        }else{
            text = <Text>{this.state.text}</Text>
        }

        return(
            <View>
                <Text>{text}</Text>
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

