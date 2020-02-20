import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Input, Button } from 'react-native-elements';

//REDUX
import { connect } from 'react-redux';


function ChatScreen(props) {

  const [pinList, setPinList] = useState([]);
  const [isReload, setIsReloas] = useState(false)

  useEffect(() => {
    setPinList(props.getPinList);
    setIsReloas(false)
  }, [isReload]);

  return (
    <View style={ChatStyle.chatContainer}>
      <ScrollView>
        <View style={ChatStyle.msgContainer}>
            {
              pinList.map((l, i) => (
                <ListItem
                  key={i}
                  leftIcon={{ name: 'pin-drop' }}
                  title={l.desc}
                  subtitle={l.title}
                  containerStyle={{width: '100%'}}
                  bottomDivider={true}
                />
              ))
            }
        </View>
      </ScrollView>
      <Button loading={isReload} onPress={()=>setIsReloas(true)} icon={<Ionicons name='ios-sync' size={25} color={'#fff'} />}/>
    </View>
  );
}

function mapStateToProps(state) {
  return { getPinList: state.addPoi }
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
