/**
 * Created by japjohal on 2018-11-14.
 */
import React, { Component } from 'react';
import { 
    Alert, 
    Button,
    Dimensions,
    Plataform, 
    StyleSheet, 
    Text, 
    TextInput, 
    View   
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import publicIP from 'react-native-public-ip';

export default class CounCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IpAddress: "",
            countryCode: "",
            text: "",
            translation: "",
            languageSpoken: "",
            locationPermissions: 'unknown',
            position: 'unknown',
            latitude: 50.60254,
            longitude: 16.7218757,
            country: "",
            countryName: "",
            population: "",
            nativeName: "",
            region: "",
            topLevelDomain: "",
            currency: ""
        }

        this.getTranslation = this.getTranslation.bind(this);

    }

    _requestPermission() {
        if(Plataform.os === 'ios'){
            console.log(Permissions);
        } else {
            Permissions.request('location')
                .then(response =>{
                    this.setState({
                        locationPermissions:response
                    })
                    console.log("Response: "+response)
                })
        }
    }

    async componentDidMount() {
        //logic of function: get IP, get IpAddress of that IP, get the official language of that IpAddress
        await publicIP()
            .then(Ip => {
                this.setState({ IpAddress: Ip })
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });


        await fetch(`https://api.ip2location.com/?ip=${encodeURIComponent('81.219.18.37')}&key=FA1D2839EE&package=WS1`)

            // Getting the IpAddress you are in. Note limit of 5000 queries
            .then(resp => {
                console.log(resp._bodyText);
                this.setState({ countryCode: resp._bodyText })
            })
            .catch(err => console.log(err))

        await fetch('https://restcountries.eu/rest/v2/alpha/' + this.state.countryCode)
            // Getting IpAddress information. We are getting the main language of the IpAddress you are in.
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    languageSpoken: resp.languages[0].iso639_1,
                    country: resp.languages[0].name,
                    countryName: resp.name,
                    population: resp.population,
                    nativeName: resp.nativeName,
                    region: resp.subregion,
                    topLevelDomain: resp.topLevelDomain,
                    currency: resp.currencies[0].name
                })

            })
            .catch(err => console.log(err))

        await navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                // For testing we are using other country locations
                // latitude:position.coords.latitude,
                // longitude: position.coords.longitude
                longitude: 21.0122,
                latitude: 52.2297
            })

        }, (error) => alert(JSON.stringify(error)))
    }

    getTranslation(text) {

        // Fetches the translation
        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181108T001143Z.262ed9e990d844ab.2dded43e52ffdb229c9242837dac893936062d30&lang=en-${encodeURIComponent(this.state.languageSpoken)}&text=${encodeURIComponent(text)}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then((response) => {
                this.setState({ translation: response.text[0] })

            })
            .catch(err => console.log(err))
        
        // Fetch the locations around you.
        fetch(`https://api.foursquare.com/v2/venues/search?ll=${this.state.latitude},${this.state.longitude}&limit=3&query=${this.state.text}&client_id=M2VPUKIPSAN51NXAWIJIUNZNSZVROYVBJRIMMCOSYGHXRNYO&client_secret=3SBW0GHP33SJQL4TGM3N5Q4MGDXM1EARYFRNKYNYKJ1KSRNK&v=20180101`)
            .then(resp => {
                let body = resp._bodyText
                for (let i in JSON.parse(body).response.venues) {
                    console.log(JSON.parse(body).response.venues[i].name)
                    console.log(JSON.parse(body).response.venues[i].location.address)
                }
            })
            .catch(err => console.log(err))
    }



    render() {
        return (

            <View style={styles.container}>
                <SearchBar
                    round
                    searchIcon={{size:24}}
                    lightTheme
                    placeholder="Type here..."
                    containerStyle={{
                        width:Dimensions.get("window").width
                    }}
                    multiline={false}
                    returnKeyType="search"
                    onSubmitEditing={(e) => {
                        this.setState({text:e.nativeEvent.text});
                        this.getTranslation(e.nativeEvent.text);
                    }}
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    
                    <Text style={{ fontSize: 15, top: 10 }}>Enter Text:</Text>
                    <TextInput
                        style={{ width: 210, height: 30, borderBottomColor: 'black', borderBottomWidth: 1, left: 15 }}
                        onChangeText={(text) => this.setState({ text })}
                    />

                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 15, top: 10 }}>Translated to {this.state.country}:</Text>
                    <Text style={{ fontSize: 15, top: 10, width: 210 }}> {this.state.translation}</Text>
                </View>

                <View style={{ top: 20, left: 120, bottomMargin: 40, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button
                        title="Translate"
                        onPress={this.getTranslation} />

                    <Button
                        title="Maps"
                        onPress={() => {
                            if (this.state.translation === "") {
                                Alert.alert(
                                    'Missing Translation', 
                                    'Sorry but a translation is required in order to search through the maps.\
                                    How are you supposed to tell the locals what you\'re looking for.')
                            } else {
                                this.props.navigation.navigate('Map', {
                                    implat: this.state.latitude,
                                    implong: this.state.longitude,
                                    search: this.state.translation
                                })
                            }
                        }

                        } />
                    <Button
                        title="settings"
                        onPress={()=> this.props.navigation.navigate("settings")}
                    />

                </View>

                <View style={{ top: 50 }}>
                    <Text style={{ top: 30, left: -5, fontSize: 20 }}> Country Information:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 50 }}><Text>Country:</Text><Text>                 {this.state.countryName}</Text></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 70 }}><Text >Population:</Text><Text>            {this.state.population}</Text></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 90 }}><Text>Native Name:</Text><Text>         {this.state.nativeName}</Text></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 110 }}><Text>Region:</Text><Text>                   {this.state.region}</Text></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 130 }}><Text>Domain Name:</Text><Text>       {this.state.topLevelDomain}</Text></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', top: 150 }}><Text>Currency:</Text><Text>               {this.state.currency}</Text></View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        left: 0,
        top: 17
    },
});

