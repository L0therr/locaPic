import React from 'react';
//map

import { Text, View, StyleSheet } from 'react-native';
import {connect} from 'react-redux';


function MapScreen(props) {
  return (
    <View style={MapStyle.mapContainer}>
      <Text style={{color:'white'}}>{props.currentUsername}</Text>
    </View>
  );
}

function mapStateToProps(state) {
  console.log(state.addUserName)
  return { currentUsername: state.addUserName }
}

export default connect(
  mapStateToProps, 
  null
)(MapScreen);

var MapStyle = StyleSheet.create({
  mapContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#1e1e1e',
  },
});