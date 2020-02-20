import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Input, Button } from 'react-native-elements';

//REDUX
import { connect } from 'react-redux';


function ChatScreen(props) {

  const [sendInputText, setSendInputText] = useState('')

  const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Amy',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'bdjn'
  },
  ]

  return (
    <View style={ChatStyle.chatContainer}>
      <ScrollView>
        <View style={ChatStyle.msgContainer}>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.avatar_url } }}
                  title={l.subtitle}
                  subtitle={l.name}
                  containerStyle={{width: '95%', borderRadius: 30, marginTop: 10}}
                />
              ))
            }
        </View>
      </ScrollView>

      <View style={ChatStyle.userContainer}>
        <View style={ChatStyle.sendForm}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Input
            inputStyle={{color: "#fff"}}
            inputContainerStyle={{marginBottom: 20}}
            placeholder='Username'
            leftIcon={<Ionicons name='ios-log-in' size={25} color={'#d52c40'} />}
            leftIconContainerStyle={{marginRight:10}}
            onChangeText={(value) => setSendInputText(value)}
            value={sendInputText}
          />
          <Button iconRight={true} icon={<Ionicons name='ios-send' size={25} color={'#fff'} />} titleStyle={{ marginRight :10}} title="Send"/>
          </KeyboardAvoidingView>
        </View>
       
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return { test: state.addPoi }
}

export default connect(
  mapStateToProps, 
)(ChatScreen);



var ChatStyle = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  msgContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainer: {
  },
});
