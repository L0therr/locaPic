import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button, Overlay } from 'react-native-elements';


function HomeScreen({ navigation, addUserNameToStore }) {
    const [inputText, setInputText] = useState('');
    const [modalIsVisible, setModalIsVisible] = useState(true);

    var handlePress = () => {
        if (inputText === "") {
            setModalIsVisible(!modalIsVisible)
        } else {
            addUserNameToStore(inputText)
            navigation.navigate('AppNav')
        }
    }
    
  return (
    <ImageBackground
    source={require("../assets/home.jpg")} style={HomeStyle.homeContainer} >

        <View style={HomeStyle.formContainer}>
            <Input
                placeholder='Username'
                leftIcon={<Ionicons name='ios-log-in' size={25} color={'#d52c40'} />}
                leftIconContainerStyle={{marginRight:10}}
                onChangeText={(value) => setInputText(value)}
                value={inputText}
            />
            <Button
                style={HomeScreen.button}
                title="Go to Map"
                icon={<Ionicons name='ios-rocket' size={25} color={'#d52c40'} />}
                titleStyle={{marginLeft:10}}
                onPress={() => handlePress()}
            />
        </View>
    </ImageBackground>
  );
}


function sendToStore(dispatch) {
    return {
        addUserNameToStore: function(input) { 
          dispatch( {type: 'addNewUsername', toAdd: input } ) 
      }
    }
}

export default connect(
    null, 
    sendToStore,
)(HomeScreen);


var HomeStyle = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    formContainer: {
        height: 100,
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
