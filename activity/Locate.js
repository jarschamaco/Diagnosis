import React, {Component} from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";

import Geolocation from '@react-native-community/geolocation';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Locate Permission',
        message:
          'Locate permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the locate');
    } else {
      console.log('Locate permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class Locate extends Component {

  constructor(){
    super();
    this.state = {
      x: '', y: '',  places: '',
      mapStyle: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]
    }
  }
  
  getPlace(){
    const url = this.getUrlwithParam(this.state.x, this.state.y, 500, 'food', 'AIzaSyCumAnIRSYBY8yjMRbeKgj48I4sM9sBXgs');
    fetch(url).then((data) => data.json())
    .then((res)=> {
      const arrayMarket=[];
      res.resuls.map((element, i) => {
        arrayMarket.push(
          <Marker
          key={i}
          coordinate={{
            latitude: this.state.x,
            longitude: this.state.y
          }}>

          </Marker>
        )
      })
    })
  }

  getUrlwithParam(lat, long, radius, type, api){
    const url=  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&type=${type}`;
    const key = `&keyword=cruise&key=${api}`;
    return `${url}${location}${typeData}${key}`;
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Diagnostico',
    headerTransparent: false,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#0F4C81',
    },
    headerRight: 
    <View style={{flexDirection: 'row'}}>
      <Icon
        reverse
        name='address-card'
        type='font-awesome'
        color='#0F4C81'
        onPress={()=>{ navigation.navigate('Contact'); }}  />
    </View>  
  });
  
  handleBackPress = () => {
    this.props.navigation.goBack();
  }

  Map(){
    
    Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      this.setState({x: latitude, y: longitude})
      },
      (error) =>{
        if(error.message.concat('No location provider available')){
          alert('Verifique que este encendida su ubicación'), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        }

      }
    )
    var ban=0;
    this.state.x ? ban=1: ban=0;
    if (ban===1){
      return (<MapView style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        customMapStyle={this.state.mapStyle}
        Region={{
          latitude: this.props.x!=null ? this.props.x: 37.78825,
          longitude: this.props.y!=null ? this.props.y: -122.4324,
          latitudeDelta: 0.015*5,
          longitudeDelta: 0.0121*5,
        }}/> )
    }else {
      return null;
    }
  }

  componentDidMount(){
    requestCameraPermission();
  }

  render() {
    const { region, destination } = this.state;
    return (
      <View style={styles.container}>
        {this.Map()}
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
  mapStyle: {
    
    ...StyleSheet.absoluteFillObject,
    
  },
});
