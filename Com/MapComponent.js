import React,{ Component } from 'react';
import Proptypes from 'prop-types';
import {Modal, TextInput, StyleSheet, ScrollView, Button, View, Image, ListView, Text, TouchableHighlight, ActivityIndicator} from 'react-native';
import Permissions from 'react-native-permissions'
import MapView from 'react-native-maps'

export default class MapComponent extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            locationPermission:'unknown',
            position:'unknown',
            markervi:0,
            venues: [],
            placetosearch:"",
            region:{
                latitude:49,
                latitudeDelta: 1,
                longitude: -123,
                longitudeDelta: 1
            },
            isLoading: true,
            markers:[],
            lat:0,
            long:0,
            title:"",
            lat1:0,
            long1:0,
            title1:"",
            lat2:0,
            long2:0,
            title2:"",
            lat3:0,
            long3:0,
            title3:"",
            lat4:0,
            long4:0,
            title4:"",
            lat5:0,
            long5:0,
            title5:"",
            lat6:0,
            long6:0,
            title6:"",
            lat7:0,
            long7:0,
            title7:"",
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    onRegionChange(region) {
        // this.setState({
        //     region
        // });
    }

    fetchMarkerData() {
        fetch('https://api.foursquare.com/v2/venues/search?ll='+this.state.region.latitude+','+this.state.region.longitude+'&limit=7&query='+this.state.placetosearch+'&client_id=M2VPUKIPSAN51NXAWIJIUNZNSZVROYVBJRIMMCOSYGHXRNYO&client_secret=3SBW0GHP33SJQL4TGM3N5Q4MGDXM1EARYFRNKYNYKJ1KSRNK&v=20180101')
            .then((response) => response.json())
            .then((response) =>{
                let x = response
                console.log(x)
                this.setState({
                    isLoading: false,
                    lat: x.response.venues[0].location.labeledLatLngs[0].lat,
                    long: x.response.venues[0].location.labeledLatLngs[0].lng,
                    title:x.response.venues[0].name+' '+x.response.venues[0].location.address,
                    lat1: x.response.venues[1].location.labeledLatLngs[0].lat,
                    long1: x.response.venues[1].location.labeledLatLngs[0].lng,
                    title1: x.response.venues[1].name+' '+x.response.venues[1].location.address,
                    lat2: x.response.venues[2].location.labeledLatLngs[0].lat,
                    long2: x.response.venues[2].location.labeledLatLngs[0].lng,
                    title2: x.response.venues[2].name+' '+x.response.venues[2].location.address,
                    lat3: x.response.venues[3].location.labeledLatLngs[0].lat,
                    long3: x.response.venues[3].location.labeledLatLngs[0].lng,
                    title3: x.response.venues[3].name+' '+x.response.venues[3].location.address,
                    lat4: x.response.venues[4].location.labeledLatLngs[0].lat,
                    long4: x.response.venues[4].location.labeledLatLngs[0].lng,
                    title4: x.response.venues[4].name+' '+x.response.venues[4].location.address,
                    lat5: x.response.venues[5].location.labeledLatLngs[0].lat,
                    long5: x.response.venues[5].location.labeledLatLngs[0].lng,
                    title5: x.response.venues[5].name+' '+x.response.venues[5].location.address,
                    lat6: x.response.venues[6].location.labeledLatLngs[0].lat,
                    long6: x.response.venues[6].location.labeledLatLngs[0].lng,
                    title6: x.response.venues[6].name+' '+x.response.venues[6].location.address,
                    venues: x.response
                });
               })
            .catch((error) => {
                console.log("ERROR"+error);
            });
    }

    _requestPermission() {
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
                console.log("Response "+response)
            });
    }
    async componentDidMount(){

        const { navigation } = this.props;
        const implat = navigation.getParam('implat');
        const implong = navigation.getParam('implong');
        const search = navigation.getParam('search');
        console.log(implat);
        console.log(implong);

        await this.setState({
            markervi:1,
            placetosearch:search,
            region:{
                longitude: implong,
                latitude: implat,
                longitudeDelta: 0.05,
                latitudeDelta: 0.05}})
        this.fetchMarkerData()
    }


    render() {


        return (
            <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                style={styles.map}
            >
                <MapView.Marker coordinate={{
                    latitude: this.state.region.latitude,
                    longitude:this.state.region.longitude
                }}
                                title="YOUR CURRENT POSITION"
                                pinColor="#4283f4"
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat,
                    longitude: this.state.long
                }}
                                title={this.state.title}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat1,
                    longitude: this.state.long1
                }}
                                title={this.state.title1}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat2,
                    longitude: this.state.long2
                }}
                                title={this.state.title2}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat3,
                    longitude: this.state.long3
                }}
                                title={this.state.title3}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat4,
                    longitude: this.state.long4
                }}
                                title={this.state.title4}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat5,
                    longitude: this.state.long5
                }}
                                title={this.state.title5}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat6,
                    longitude: this.state.long6
                }}
                                title={this.state.title6}
                                opacity={this.state.markervi}
                />
                <MapView.Marker coordinate={{
                    latitude:this.state.lat7,
                    longitude: this.state.long7
                }}
                                title={this.state.title7}
                                opacity={this.state.markervi}
                />
            </MapView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ecf0f1'
    },
    paragraph: {
        margin:6,
        fontSize:18,
        textAlign:'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }

});