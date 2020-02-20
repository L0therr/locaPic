import React, { useState, useEffect } from 'react';
//map
import MapView, { Marker } from 'react-native-maps';
//location
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';


function MapScreen(props) {

  const [userLocation, setUserLocation] = useState({});
  const [poiMode, setPoiMode] = useState(false);
  const [btnStyle, setBtnStyle] = useState({})
  const [gettingUserPos, setGettingUserPos] = useState(false);
  const [poiList, setPoiList] = useState([]);

  //modal
  const [modalVis, setModalVis] = useState(false);
  const [modalData, setModalData] = useState({});
  const [titleText, setTitleText] = useState('');
  const [descText, setDescText] = useState('');
  

   useEffect(() => {
    setGettingUserPos(true);
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Location.watchPositionAsync({distanceInterval: 1},
          (location) => {
            setUserLocation({lat: location.coords.latitude, lon: location.coords.longitude});
            setGettingUserPos(false)
          }
        );
      }
    }
    askPermissions();
  }, []);

  var handlePressMap = async (e) => {
    var getLat = e.nativeEvent.coordinate.latitude;
    var getLon = e.nativeEvent.coordinate.longitude;
    setModalData({lat: getLat, lon: getLon});
    setModalVis(true);
  }

  var modalQuit = (req) => {
    if(req === 'exit') {
      setGettingUserPos(true);
      setModalVis(false);
      setPoiMode(false);
      setDescText('');
      setTitleText('');
      setModalData({});
      setGettingUserPos(false);
    } else if (req === 'add') {
      if(titleText != '' || descText != '') {
        setModalVis(false);
        setPoiMode(false);
        setGettingUserPos(true);
        setPoiList([...poiList, {lat: modalData.lat, lon: modalData.lon, title: titleText, desc: descText}]);
        props.addPoi({lat: modalData.lat, lon: modalData.lon, title: titleText, desc: descText});
        setDescText('');
        setTitleText('');
        setModalData({});
        setGettingUserPos(false);
      }
    }
  }
  
  if(userLocation.lat === undefined && userLocation.lon === undefined) {
    userLocation.lat =  0;
    userLocation.lon = 0;
  }

var markersToDisplay = poiList.map((marker, i) => {
  return <Marker pinColor={'orange'} key={i} title={marker.title} description={marker.desc} coordinate={{latitude: marker.lat, longitude: marker.lon}} draggable/>
})
  
  return (
    <View style={MapStyle.container}>

      <Overlay isVisible={modalVis} borderRadius={10} height={250} overlayStyle={MapStyle.modal}>
        <View style={{width: '100%', height: '100%', justifyContent:'space-between'}}>
          <Text>{`Nouveau point d'interêt ${props.currentUsername} ?`}</Text>
          <Input
              placeholder="Titre du un point d'interêt"
              onChangeText={(value) => setTitleText(value)}
              value={titleText}
          />
          <Input
              placeholder="Description du un point d'interêt"
              onChangeText={(value) => setDescText(value)}
              value={descText}
          />
          <View style={{width: "100%", flexDirection: 'row', justifyContent:'space-between'}}>
          <Button title="Ajouter un point d'interêt" onPress={()=>{modalQuit('add')}} />
          <Button title="Annuler" type="clear" onPress={()=>{modalQuit('exit')}} />
          </View>
        </View>
      </Overlay>

      <MapView style={MapStyle.mapStyle} mapType='hybrid'
        initialRegion={{latitude: 48.866667, longitude: 2.333333, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
        loadingEnabled={true} onPress={(e)=>{if (poiMode) {handlePressMap(e);}}}
      >
      <Marker key={props.currentUsername} title={`Vous (${props.currentUsername})`} coordinate={{latitude: userLocation.lat, longitude: userLocation.lon}}/>
        {markersToDisplay}
      </MapView>
        <Button loading={gettingUserPos} disabled={poiMode} onPress={()=>{setPoiMode(!poiMode);}} iconRight={true} icon={<Ionicons name='ios-pin' size={25} color={'#fff'} />} titleStyle={{ marginRight :10}} title="Ajouter un point d'interêt"/>
    </View>
  );
}

function mapPropsToState(dispatch) {
  return {
      addPoi: function(poi) {
        dispatch( {type: 'addNewPoi', toAdd: poi } ) 
    }
  }
}

function mapStateToProps(state) {
  return { currentUsername: state.addUserName }
}

export default connect(
  mapStateToProps, 
  mapPropsToState,
)(MapScreen);

var MapStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    flex:1,
  },
  modal: {
    justifyContent: 'space-between',
    alignContent:'center',
    padding: 25,
    alignItems: 'center'
  }
});